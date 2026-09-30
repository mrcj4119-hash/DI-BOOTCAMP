let socket = null;
let currentToken = null;
let currentUsername = null;
let currentRoom = 'General';
let activePMUser = null;

async function handleRegister() {
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value.trim();
  const errorEl = document.getElementById('auth-error');

  errorEl.innerText = '';

  if (!username || !password) {
    errorEl.innerText = 'Please enter both username and password.';
    return;
  }

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (res.ok) {
      initSession(data);
    } else {
      errorEl.innerText = data.error || 'Registration failed.';
    }
  } catch (err) {
    errorEl.innerText = 'Server error. Is the server running?';
  }
}

async function handleLogin() {
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value.trim();
  const errorEl = document.getElementById('auth-error');

  errorEl.innerText = '';

  if (!username || !password) {
    errorEl.innerText = 'Please enter both username and password.';
    return;
  }

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (res.ok) {
      initSession(data);
    } else {
      errorEl.innerText = data.error || 'Login failed.';
    }
  } catch (err) {
    errorEl.innerText = 'Server error. Is the server running?';
  }
}

function initSession(data) {
  currentToken = data.token;
  currentUsername = data.username;

  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('chat-container').classList.remove('hidden');
  document.getElementById('user-display-name').innerText = currentUsername;
  document.getElementById('user-avatar').src = data.avatar;

  // Initialize socket ONLY after getting token
  socket = io({ auth: { token: currentToken } });

  setupSocketListeners();
  selectRoom('General');
}

function setupSocketListeners() {
  socket.on('roomHistory', (messages) => {
    const display = document.getElementById('messages-display');
    display.innerHTML = '';
    messages.forEach(appendMessage);
  });

  socket.on('chatMessage', (msgObj) => {
    appendMessage(msgObj);
  });

  socket.on('notification', (text) => {
    const display = document.getElementById('messages-display');
    const div = document.createElement('div');
    div.className = 'notification';
    div.innerText = text;
    display.appendChild(div);
    display.scrollTop = display.scrollHeight;
  });

  socket.on('roomUsers', (users) => {
    document.getElementById('user-count').innerText = users.length;
    const list = document.getElementById('active-users-list');
    list.innerHTML = '';
    users.forEach((u) => {
      const li = document.createElement('li');
      li.innerText = u.username + (u.username === currentUsername ? ' (You)' : '');
      if (u.username !== currentUsername) {
        li.onclick = () => openPM(u.username);
      }
      list.appendChild(li);
    });
  });

  socket.on('privateMessage', (msgObj) => {
    if (!activePMUser) openPM(msgObj.sender === currentUsername ? msgObj.recipient : msgObj.sender);
    const pmDisplay = document.getElementById('pm-messages');
    const div = document.createElement('div');
    div.innerHTML = `<strong>${msgObj.sender}:</strong> ${msgObj.message}`;
    pmDisplay.appendChild(div);
    pmDisplay.scrollTop = pmDisplay.scrollHeight;
  });

  socket.on('avatarUpdated', (newUrl) => {
    document.getElementById('user-avatar').src = newUrl;
  });
}

function selectRoom(roomName) {
  currentRoom = roomName;
  document.getElementById('current-room-title').innerText = `# ${roomName}`;
  document.querySelectorAll('#rooms-list li').forEach((el) => {
    el.classList.toggle('active', el.innerText.includes(roomName));
  });
  socket.emit('joinRoom', roomName);
}

function sendMessage(e) {
  e.preventDefault();
  const input = document.getElementById('message-input');
  const text = input.value.trim();
  if (!text) return;

  const isImage = text.match(/\.(jpeg|jpg|gif|png)$/i) != null;

  socket.emit('roomMessage', {
    room: currentRoom,
    message: isImage ? '' : text,
    media: isImage ? text : null
  });

  input.value = '';
}

function appendMessage(msg) {
  const display = document.getElementById('messages-display');
  const div = document.createElement('div');
  div.className = 'msg-item';

  let mediaHtml = msg.media ? `<img src="${msg.media}" class="msg-media" />` : '';

  div.innerHTML = `
    <img src="${msg.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'}" />
    <div class="msg-content">
      <div class="msg-meta"><strong>${msg.sender}</strong> ${msg.timestamp}</div>
      <div>${msg.message}</div>
      ${mediaHtml}
    </div>
  `;
  display.appendChild(div);
  display.scrollTop = display.scrollHeight;
}

function openPM(targetUsername) {
  activePMUser = targetUsername;
  document.getElementById('pm-target').innerText = targetUsername;
  document.getElementById('pm-drawer').classList.remove('hidden');
}

function closePM() {
  activePMUser = null;
  document.getElementById('pm-drawer').classList.add('hidden');
}

function sendPrivateMessage(e) {
  e.preventDefault();
  const input = document.getElementById('pm-input');
  const text = input.value.trim();
  if (!text || !activePMUser) return;

  socket.emit('privateMessage', { recipientUsername: activePMUser, message: text });
  input.value = '';
}

function changeAvatar() {
  const newSeed = prompt('Enter a keyword for your new avatar:');
  if (newSeed) {
    const newUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newSeed)}`;
    socket.emit('updateAvatar', newUrl);
  }
}

function switchTheme(themeClass) {
  document.body.className = themeClass;
}

function addEmoji(emoji) {
  document.getElementById('message-input').value += emoji;
}