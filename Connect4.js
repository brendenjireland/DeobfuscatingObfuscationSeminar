//Code written by Claude.ai; Related Minified file minified at https://www.toptal.com/developers/javascript-minifier
 
// Connect 4 — drop this file into a page with <script src="connect4.js"></script>.
// It builds its own board, styles and controls, so no other markup is needed.
(() => {
  const ROWS = 6, COLS = 7;
  const COLORS = { 1: '#e8452c', 2: '#f2c230' };
  const NAMES = { 1: 'Red', 2: 'Yellow' };

  let grid, turn, over, vsAI = false, aiPending = false;

  // ---------- UI setup ----------
  const style = document.createElement('style');
  style.textContent = `
    .c4{font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px}
    .c4-status{font-size:1.1rem;min-height:1.5em}
    .c4-dot{display:inline-block;width:16px;height:16px;border-radius:50%;margin-right:6px;vertical-align:middle}
    .c4-board{display:grid;grid-template-columns:repeat(${COLS},1fr);gap:6px;background:#1f4e8c;
      padding:10px;border-radius:14px;width:min(94vw,520px);box-sizing:border-box}
    .c4-col{display:flex;flex-direction:column;gap:6px;cursor:pointer}
    .c4-col:focus-visible{outline:3px solid #f2c230;outline-offset:2px}
    .c4-cell{aspect-ratio:1;border-radius:50%;background:#e9e4d6}
    .c4-cell.win{box-shadow:0 0 0 4px #1d2a3a}
    .c4-controls{display:flex;gap:10px}
    .c4-controls button{font:inherit;padding:8px 14px;border-radius:8px;border:2px solid #1d2a3a;
      background:transparent;cursor:pointer}
    .c4-controls button.on{background:#1d2a3a;color:#fff}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.className = 'c4';
  root.innerHTML = `
    <div class="c4-status" aria-live="polite"></div>
    <div class="c4-board"></div>
    <div class="c4-controls">
      <button data-mode="2" class="on">2 players</button>
      <button data-mode="1">Vs computer</button>
      <button data-reset>New game</button>
    </div>`;
  document.body.appendChild(root);

  const statusEl = root.querySelector('.c4-status');
  const boardEl = root.querySelector('.c4-board');

  root.querySelectorAll('[data-mode]').forEach(btn => {
    btn.onclick = () => {
      vsAI = btn.dataset.mode === '1';
      root.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b === btn));
      reset();
    };
  });
  root.querySelector('[data-reset]').onclick = reset;

  // ---------- Game logic ----------
  function reset() {
    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    turn = 1; over = false; aiPending = false;
    boardEl.innerHTML = '';
    for (let c = 0; c < COLS; c++) {
      const col = document.createElement('div');
      col.className = 'c4-col';
      col.tabIndex = 0;
      col.setAttribute('role', 'button');
      col.setAttribute('aria-label', `Drop in column ${c + 1}`);
      col.onclick = () => humanMove(c);
      col.onkeydown = e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); humanMove(c); }
      };
      for (let r = 0; r < ROWS; r++) {
        const cell = document.createElement('div');
        cell.className = 'c4-cell';
        cell.id = `c4-${r}-${c}`;
        col.appendChild(cell);
      }
      boardEl.appendChild(col);
    }
    setStatus();
  }

  function setStatus(msg) {
    statusEl.innerHTML = msg ||
      `<span class="c4-dot" style="background:${COLORS[turn]}"></span>${NAMES[turn]}'s turn`;
  }

  const lowestEmptyRow = c => {
    for (let r = ROWS - 1; r >= 0; r--) if (!grid[r][c]) return r;
    return -1;
  };

  // Returns the four winning cells for player p, or null.
  function findWin(p) {
    const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] !== p) continue;
        for (const [dr, dc] of dirs) {
          const cells = [];
          for (let k = 0; k < 4; k++) {
            const rr = r + dr * k, cc = c + dc * k;
            if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS || grid[rr][cc] !== p) break;
            cells.push([rr, cc]);
          }
          if (cells.length === 4) return cells;
        }
      }
    }
    return null;
  }

  function humanMove(c) {
    if (over || aiPending) return;
    place(c);
  }

  function place(c) {
    const r = lowestEmptyRow(c);
    if (r < 0) return;
    grid[r][c] = turn;
    document.getElementById(`c4-${r}-${c}`).style.background = COLORS[turn];

    const win = findWin(turn);
    if (win) {
      over = true;
      win.forEach(([a, b]) => document.getElementById(`c4-${a}-${b}`).classList.add('win'));
      setStatus(`<span class="c4-dot" style="background:${COLORS[turn]}"></span>${NAMES[turn]} wins!`);
      return;
    }
    if (grid[0].every(Boolean)) { over = true; setStatus('Draw — the board is full.'); return; }

    turn = 3 - turn;
    setStatus();
    if (vsAI && turn === 2) {
      aiPending = true;
      setTimeout(() => { aiPending = false; if (!over) place(aiMove()); }, 450);
    }
  }

  // ---------- Simple AI ----------
  function wouldWin(c, p) {
    const r = lowestEmptyRow(c);
    if (r < 0) return false;
    grid[r][c] = p;
    const w = !!findWin(p);
    grid[r][c] = 0;
    return w;
  }

  function aiMove() {
    const valid = [...Array(COLS).keys()].filter(c => lowestEmptyRow(c) >= 0);
    for (const c of valid) if (wouldWin(c, 2)) return c;   // win now
    for (const c of valid) if (wouldWin(c, 1)) return c;   // block opponent
    // avoid moves that let the opponent win on top of them
    const safe = valid.filter(c => {
      const r = lowestEmptyRow(c);
      grid[r][c] = 2;
      const bad = r > 0 && wouldWin(c, 1);
      grid[r][c] = 0;
      return !bad;
    });
    const pool = safe.length ? safe : valid;
    // prefer center columns, with some randomness
    pool.sort((a, b) => Math.abs(3 - a) - Math.abs(3 - b) + (Math.random() - 0.5) * 2);
    return pool[0];
  }

  reset();
})();