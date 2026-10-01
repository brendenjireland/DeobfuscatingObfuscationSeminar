//Code written by Claude.ai; Related Minified file minified at https://www.toptal.com/developers/javascript-minifier

// Snake — load with <script src="snake.js"></script>. Builds its own UI.
// Controls: arrow keys or WASD, or the on-screen buttons. Space restarts after game over.
(() => {
  const N = 20, CELL = 20, TICK = 110;
  let snake, dir, nextDir, food, score, best = 0, timer, over;

  const style = document.createElement('style');
  style.textContent = `
    .snk{font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px}
    .snk canvas{border:3px solid #1d2a3a;border-radius:8px;max-width:94vw;height:auto;background:#e9e4d6}
    .snk-pad{display:grid;grid-template-columns:repeat(3,48px);gap:6px}
    .snk-pad button,.snk button.snk-new{font:inherit;border:2px solid #1d2a3a;border-radius:8px;
      background:transparent;cursor:pointer;height:44px}
    .snk-pad .up{grid-column:2}
    .snk-pad .left{grid-column:1;grid-row:2}
    .snk-pad .down{grid-column:2;grid-row:2}
    .snk-pad .right{grid-column:3;grid-row:2}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.className = 'snk';
  root.innerHTML = `
    <div class="snk-score" aria-live="polite"></div>
    <canvas width="${N * CELL}" height="${N * CELL}"></canvas>
    <div class="snk-pad">
      <button class="up" aria-label="Up">↑</button>
      <button class="left" aria-label="Left">←</button>
      <button class="down" aria-label="Down">↓</button>
      <button class="right" aria-label="Right">→</button>
    </div>
    <button class="snk-new">New game</button>`;
  document.body.appendChild(root);
  const ctx = root.querySelector('canvas').getContext('2d');
  const scoreEl = root.querySelector('.snk-score');

  const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const KEYS = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down',
                 ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' };

  function turn(name) {
    const d = DIRS[name];
    // Disallow reversing straight into yourself.
    if (d[0] === -dir[0] && d[1] === -dir[1]) return;
    nextDir = d;
  }

  root.querySelectorAll('.snk-pad button').forEach(b => {
    b.onclick = () => turn(b.className);
  });
  root.querySelector('.snk-new').onclick = start;
  document.addEventListener('keydown', e => {
    const name = KEYS[e.key];
    if (name) { e.preventDefault(); turn(name); }
    else if (e.key === ' ' && over) { e.preventDefault(); start(); }
  });

  function placeFood() {
    do {
      food = [Math.floor(Math.random() * N), Math.floor(Math.random() * N)];
    } while (snake.some(([x, y]) => x === food[0] && y === food[1]));
  }

  function start() {
    clearInterval(timer);
    snake = [[10, 10], [9, 10], [8, 10]];
    dir = nextDir = DIRS.right;
    score = 0; over = false;
    placeFood();
    updateScore();
    draw();
    timer = setInterval(step, TICK);
  }

  function updateScore() {
    scoreEl.textContent = over
      ? `Game over — score ${score}. Press Space or New game.`
      : `Score ${score}   Best ${best}`;
  }

  function step() {
    dir = nextDir;
    const head = [snake[0][0] + dir[0], snake[0][1] + dir[1]];
    const hitWall = head[0] < 0 || head[0] >= N || head[1] < 0 || head[1] >= N;
    const hitSelf = snake.some(([x, y]) => x === head[0] && y === head[1]);
    if (hitWall || hitSelf) {
      over = true;
      clearInterval(timer);
      best = Math.max(best, score);
      updateScore();
      return;
    }
    snake.unshift(head);
    if (head[0] === food[0] && head[1] === food[1]) {
      score++;
      best = Math.max(best, score);
      placeFood();
    } else {
      snake.pop();
    }
    updateScore();
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, N * CELL, N * CELL);
    ctx.fillStyle = '#e8452c';
    ctx.beginPath();
    ctx.arc(food[0] * CELL + CELL / 2, food[1] * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    snake.forEach(([x, y], i) => {
      ctx.fillStyle = i === 0 ? '#1d2a3a' : '#2f7d4f';
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    });
  }

  start();
})();
