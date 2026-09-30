let currentUser = null;
let currentGameId = null;
let pollInterval = null;

async function register() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: u, password: p })
  });
  const data = await res.json();
  document.getElementById('auth-msg').innerText = data.message || data.error;
}

async function login() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: u, password: p })
  });
  const data = await res.json();

  if (res.ok) {
    currentUser = u;
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('lobby-screen').classList.remove('hidden');
    document.getElementById('user-display').innerText = currentUser;
  } else {
    document.getElementById('auth-msg').innerText = data.error;
  }
}

async function startGame() {
  const res = await fetch('/api/game/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: currentUser })
  });
  const data = await res.json();

  if (res.ok) {
    currentGameId = data.gameId;
    document.getElementById('lobby-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Poll server for real-time game updates
    pollInterval = setInterval(fetchGameState, 1000);
  } else {
    document.getElementById('lobby-msg').innerText = data.error;
  }
}

async function fetchGameState() {
  if (!currentGameId) return;
  const res = await fetch(`/api/game/${currentGameId}`);
  const game = await res.json();

  renderBoard(game);
}

function renderBoard(game) {
  document.getElementById('turn-display').innerText = game.currentTurn || 'Waiting for opponent...';
  document.getElementById('p1-hp').innerText = game.bases.player1.hp;
  document.getElementById('p2-hp').innerText = game.bases.player2.hp;

  if (game.status === 'FINISHED') {
    document.getElementById('status-display').innerText = `🏆 Game Over! Winner: ${game.winner}`;
    clearInterval(pollInterval);
  } else if (game.status === 'WAITING') {
    document.getElementById('status-display').innerText = 'Waiting for second player to join...';
  } else {
    document.getElementById('status-display').innerText = 'Game in progress.';
  }

  const grid = document.getElementById('grid-board');
  grid.innerHTML = '';

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';

      // Check Obstacles
      if (game.obstacles.some((o) => o.x === x && o.y === y)) {
        cell.classList.add('obstacle');
        cell.innerText = '🪨';
      }

      // Check Bases
      if (game.bases.player1.x === x && game.bases.player1.y === y) cell.classList.add('p1-base');
      if (game.bases.player2.x === x && game.bases.player2.y === y) cell.classList.add('p2-base');

      // Check Players
      if (game.positions.player1.x === x && game.positions.player1.y === y) {
        cell.innerText = '🔵'; // Player 1
      } else if (game.positions.player2 && game.positions.player2.x === x && game.positions.player2.y === y) {
        cell.innerText = '🔴'; // Player 2
      }

      grid.appendChild(cell);
    }
  }
}

async function makeAction(action, direction = null) {
  if (!currentGameId) return;
  const res = await fetch(`/api/game/${currentGameId}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: currentUser, action, direction })
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.error);
  } else {
    fetchGameState();
  }
}