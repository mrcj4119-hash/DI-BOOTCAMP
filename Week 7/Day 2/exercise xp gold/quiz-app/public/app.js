let questions = [], currentIdx = 0, score = 0, timer, timeLeft = 15, token = null;

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message);
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok) {
    token = data.token;
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('config-section').classList.remove('hidden');
  } else { alert(data.message); }
}

async function startQuiz() {
  const diff = document.getElementById('difficulty').value;
  const res = await fetch(`/api/quiz/questions?difficulty=${diff}`);
  questions = await res.json();
  
  if (questions.length === 0) return alert('No questions found');
  
  document.getElementById('config-section').classList.add('hidden');
  document.getElementById('quiz-section').classList.remove('hidden');
  currentIdx = 0; score = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById('time').innerText = timeLeft;
  document.getElementById('feedback').innerText = '';
  
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentIdx];
  document.getElementById('question-text').innerText = q.question;
  const optsDiv = document.getElementById('options-box');
  optsDiv.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt.option_text;
    btn.onclick = () => submitAnswer(q.id, opt.option_text);
    optsDiv.appendChild(btn);
  });
}

async function submitAnswer(id, selectedOption) {
  clearInterval(timer);
  const res = await fetch('/api/quiz/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, selectedOption })
  });
  const data = await res.json();

  const feedback = document.getElementById('feedback');
  if (data.isCorrect) {
    score += 10;
    feedback.innerText = 'Correct!';
    feedback.style.color = 'green';
  } else {
    feedback.innerText = `Wrong! Correct answer: ${data.correctAnswer}`;
    feedback.style.color = 'red';
  }

  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  currentIdx++;
  if (currentIdx < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

async function endQuiz() {
  document.getElementById('quiz-section').classList.add('hidden');
  document.getElementById('result-section').classList.remove('hidden');
  document.getElementById('final-score').innerText = score;

  if (token) {
    await fetch('/api/users/score', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ score })
    });
  }
  loadLeaderboard();
}

async function loadLeaderboard() {
  const res = await fetch('/api/users/leaderboard');
  const leaderboard = await res.json();
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  leaderboard.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.username}: ${item.score} pts`;
    list.appendChild(li);
  });
}

function restart() {
  document.getElementById('result-section').classList.add('hidden');
  document.getElementById('config-section').classList.remove('hidden');
}