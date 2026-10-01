//Code written by Claude.ai; Related Minified file minified at https://www.toptal.com/developers/javascript-minifier

// Tic-Tac-Toe — load with <script src="tictactoe.js"></script>. Builds its own UI.
(() => {
  const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let board, turn, over, vsAI = false;

  const style = document.createElement('style');
  style.textContent = `
    .ttt{font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px}
    .ttt-board{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:min(80vw,320px)}
    .ttt-cell{aspect-ratio:1;font:bold 3rem Georgia,serif;border:2px solid #1d2a3a;border-radius:10px;
      background:transparent;cursor:pointer}
    .ttt-cell:focus-visible{outline:3px solid #f2c230}
    .ttt-cell.win{background:#f2c230}
    .ttt-controls{display:flex;gap:10px}
    .ttt-controls button{font:inherit;padding:8px 14px;border-radius:8px;border:2px solid #1d2a3a;
      background:transparent;cursor:pointer}
    .ttt-controls button.on{background:#1d2a3a;color:#fff}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.className = 'ttt';
  root.innerHTML = `
    <div class="ttt-status" aria-live="polite"></div>
    <div class="ttt-board"></div>
    <div class="ttt-controls">
      <button data-mode="2" class="on">2 players</button>
      <button data-mode="1">Vs computer</button>
      <button data-reset>New game</button>
    </div>`;
  document.body.appendChild(root);
  const statusEl = root.querySelector('.ttt-status');
  const boardEl = root.querySelector('.ttt-board');

  root.querySelectorAll('[data-mode]').forEach(btn => {
    btn.onclick = () => {
      vsAI = btn.dataset.mode === '1';
      root.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b === btn));
      reset();
    };
  });
  root.querySelector('[data-reset]').onclick = reset;

  function winnerOf(b) {
    for (const l of LINES) if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return l;
    return null;
  }

  function reset() {
    board = Array(9).fill('');
    turn = 'X'; over = false;
    boardEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const b = document.createElement('button');
      b.className = 'ttt-cell';
      b.setAttribute('aria-label', `Square ${i + 1}`);
      b.onclick = () => { if (!over && !(vsAI && turn === 'O')) move(i); };
      boardEl.appendChild(b);
    }
    statusEl.textContent = "X's turn";
  }

  function move(i) {
    if (board[i] || over) return;
    board[i] = turn;
    boardEl.children[i].textContent = turn;
    const line = winnerOf(board);
    if (line) {
      over = true;
      line.forEach(k => boardEl.children[k].classList.add('win'));
      statusEl.textContent = `${turn} wins!`;
      return;
    }
    if (board.every(Boolean)) { over = true; statusEl.textContent = 'Draw.'; return; }
    turn = turn === 'X' ? 'O' : 'X';
    statusEl.textContent = `${turn}'s turn`;
    if (vsAI && turn === 'O') setTimeout(() => { if (!over) move(bestMove()); }, 350);
  }

  // Minimax: computer plays O and cannot be beaten.
  function minimax(b, player) {
    const line = winnerOf(b);
    if (line) return b[line[0]] === 'O' ? 1 : -1;
    if (b.every(Boolean)) return 0;
    let best = player === 'O' ? -2 : 2;
    for (let i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = player;
      const s = minimax(b, player === 'O' ? 'X' : 'O');
      b[i] = '';
      best = player === 'O' ? Math.max(best, s) : Math.min(best, s);
    }
    return best;
  }

  function bestMove() {
    let best = -2, pick = 0;
    for (let i = 0; i < 9; i++) {
      if (board[i]) continue;
      board[i] = 'O';
      const s = minimax(board, 'X');
      board[i] = '';
      if (s > best) { best = s; pick = i; }
    }
    return pick;
  }

  reset();
})();
