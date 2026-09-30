const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'super-secret-jwt-key';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Data Storage
const usersDb = new Map(); // username -> { passwordHash, avatar }
const activeUsers = new Map(); // socket.id -> { username, room, avatar }
const chatHistory = new Map(); // roomName -> Array

const rooms = ['General', 'Tech', 'Random'];
rooms.forEach((r) => chatHistory.set(r, []));

// ---------------- REST AUTH API ----------------

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    if (usersDb.has(username)) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;
    
    usersDb.set(username, { passwordHash, avatar });

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });
    return res.status(201).json({ token, username, avatar });
  } catch (err) {
    return res.status(500).json({ error: 'Registration failed.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = usersDb.get(username);
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, username, avatar: user.avatar });
  } catch (err) {
    return res.status(500).json({ error: 'Login failed.' });
  }
});

// ---------------- SOCKET.IO MIDDLEWARE & EVENTS ----------------

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication required'));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error('Invalid token'));
    const user = usersDb.get(decoded.username);
    socket.user = { 
      username: decoded.username, 
      avatar: user ? user.avatar : `https://api.dicebear.com/7.x/bottts/svg?seed=${decoded.username}` 
    };
    next();
  });
});

io.on('connection', (socket) => {
  const { username } = socket.user;

  activeUsers.set(socket.id, {
    username,
    room: null,
    avatar: socket.user.avatar
  });

  socket.on('updateAvatar', (avatarUrl) => {
    const user = usersDb.get(username);
    if (user) user.avatar = avatarUrl;
    const active = activeUsers.get(socket.id);
    if (active) active.avatar = avatarUrl;
    socket.emit('avatarUpdated', avatarUrl);
  });

  socket.on('joinRoom', (roomName) => {
    const active = activeUsers.get(socket.id);
    if (active.room) {
      socket.leave(active.room);
      io.to(active.room).emit('notification', `${username} left the room.`);
    }

    socket.join(roomName);
    active.room = roomName;

    if (!chatHistory.has(roomName)) {
      chatHistory.set(roomName, []);
    }

    socket.emit('roomHistory', chatHistory.get(roomName));
    socket.to(roomName).emit('notification', `${username} joined ${roomName}!`);
    broadcastRoomUsers(roomName);
  });

  socket.on('roomMessage', ({ room, message, media }) => {
    const msgObj = {
      id: Date.now().toString(),
      sender: username,
      avatar: activeUsers.get(socket.id)?.avatar,
      message,
      media: media || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const history = chatHistory.get(room) || [];
    history.push(msgObj);
    if (history.length > 50) history.shift();

    io.to(room).emit('chatMessage', msgObj);
  });

  socket.on('privateMessage', ({ recipientUsername, message }) => {
    let recipientSocketId = null;
    for (let [sId, u] of activeUsers.entries()) {
      if (u.username === recipientUsername) {
        recipientSocketId = sId;
        break;
      }
    }

    const msgObj = {
      sender: username,
      recipient: recipientUsername,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('privateMessage', msgObj);
      socket.emit('privateMessage', msgObj);
    } else {
      socket.emit('notification', `User ${recipientUsername} is offline.`);
    }
  });

  socket.on('disconnect', () => {
    const active = activeUsers.get(socket.id);
    if (active && active.room) {
      io.to(active.room).emit('notification', `${username} disconnected.`);
      activeUsers.delete(socket.id);
      broadcastRoomUsers(active.room);
    } else {
      activeUsers.delete(socket.id);
    }
  });
});

function broadcastRoomUsers(room) {
  const usersInRoom = [];
  for (let [_, data] of activeUsers.entries()) {
    if (data.room === room) {
      usersInRoom.push({ username: data.username, avatar: data.avatar });
    }
  }
  io.to(room).emit('roomUsers', usersInRoom);
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});