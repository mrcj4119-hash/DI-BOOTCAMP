const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Database
const users = new Map(); // username -> password
const games = new Map(); // gameId -> gameState

// Helper: Generate static obstacles on the 10x10 grid
function generateObstacles() {
  return [
    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 },
    { x: 7, y: 7 }, { x: 7, y: 6 }, { x: 6, y: 7 },
    { x: 4, y: 5 }, { x: 5, y: 4 }
  ];
}

// ---------------- REST API ROUTES ----------------

// 1. User Registration
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }
  if (users.has(username)) {
    return res.status(400).json({ error: 'Username already exists.' });
  }
  users.set(username, password);
  res.status(201).json({ message: 'User registered successfully.' });
});

// 2. User Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!users.has(username) || users.get(username) !== password) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  res.json({ message: 'Login successful.', username });
});

// 3. Start or Join a Game Session
app.post('/api/game/start', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required.' });

  // Find an existing game waiting for Player 2
  for (let [gameId, game] of games.entries()) {
    if (game.status === 'WAITING' && game.player1 !== username) {
      game.player2 = username;
      game.status = 'IN_PROGRESS';
      return res.json({ message: 'Joined game successfully.', gameId, game });
    }
  }

  // Otherwise, create a new game as Player 1
  const gameId = 'game_' + Date.now();
  const newGame = {
    id: gameId,
    gridSize: 10,
    player1: username,
    player2: null,
    currentTurn: username,
    status: 'WAITING',
    winner: null,
    positions: {
      player1: { x: 0, y: 0 },
      player2: { x: 9, y: 9 }
    },
    bases: {
      player1: { x: 0, y: 0, hp: 100 },
      player2: { x: 9, y: 9, hp: 100 }
    },
    obstacles: generateObstacles()
  };

  games.set(gameId, newGame);
  res.status(201).json({ message: 'Game created. Waiting for Player 2...', gameId, game: newGame });
});

// 4. Fetch Current Game State
app.get('/api/game/:gameId', (req, res) => {
  const game = games.get(req.params.gameId);
  if (!game) return res.status(404).json({ error: 'Game not found.' });
  res.json(game);
});

// 5. Make a Move or Attack Action
app.post('/api/game/:gameId/action', (req, res) => {
  const game = games.get(req.params.gameId);
  const { username, action, direction } = req.body; // action: 'MOVE' or 'ATTACK'

  if (!game) return res.status(404).json({ error: 'Game not found.' });
  if (game.status !== 'IN_PROGRESS') return res.status(400).json({ error: 'Game is not active.' });
  if (game.currentTurn !== username) return res.status(400).json({ error: 'Not your turn.' });

  const isP1 = username === game.player1;
  const playerKey = isP1 ? 'player1' : 'player2';
  const opponentKey = isP1 ? 'player2' : 'player1';

  const currentPos = game.positions[playerKey];
  const oppBase = game.bases[opponentKey];

  if (action === 'MOVE') {
    let target = { ...currentPos };
    if (direction === 'UP') target.y -= 1;
    else if (direction === 'DOWN') target.y += 1;
    else if (direction === 'LEFT') target.x -= 1;
    else if (direction === 'RIGHT') target.x += 1;
    else return res.status(400).json({ error: 'Invalid direction.' });

    // Grid Bounds Check
    if (target.x < 0 || target.x >= 10 || target.y < 0 || target.y >= 10) {
      return res.status(400).json({ error: 'Cannot move outside grid bounds.' });
    }

    // Obstacle Check
    const isObstacle = game.obstacles.some((obs) => obs.x === target.x && obs.y === target.y);
    if (isObstacle) return res.status(400).json({ error: 'Cannot move through obstacles.' });

    // Opponent Collision Check
    const oppPos = game.positions[opponentKey];
    if (target.x === oppPos.x && target.y === oppPos.y) {
      return res.status(400).json({ error: 'Square occupied by opponent.' });
    }

    // Apply Move
    game.positions[playerKey] = target;

    // Check Win Condition: Reached Opponent Base
    if (target.x === oppBase.x && target.y === oppBase.y) {
      game.status = 'FINISHED';
      game.winner = username;
      return res.json({ message: `${username} reached the opponent base and won!`, game });
    }
  } else if (action === 'ATTACK') {
    // Attack Condition: Must be adjacent to opponent base
    const dx = Math.abs(currentPos.x - oppBase.x);
    const dy = Math.abs(currentPos.y - oppBase.y);
    const isAdjacent = (dx === 1 && dy === 0) || (dx === 0 && dy === 1);

    if (!isAdjacent) {
      return res.status(400).json({ error: 'You must be adjacent to the opponent base to attack.' });
    }

    oppBase.hp -= 50; // Deals 50 damage per attack
    if (oppBase.hp <= 0) {
      oppBase.hp = 0;
      game.status = 'FINISHED';
      game.winner = username;
      return res.json({ message: `${username} destroyed the opponent base and won!`, game });
    }
  } else {
    return res.status(400).json({ error: 'Invalid action.' });
  }

  // Switch Turn
  game.currentTurn = game[opponentKey];
  res.json({ message: 'Action completed.', game });
});

app.listen(PORT, () => console.log(`Game Server running at http://localhost:${PORT}`));