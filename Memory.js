//Code written by Claude.ai; Related Minified file minified at https://www.toptal.com/developers/javascript-minifier

// Memory Match — load with <script src="memory.js"></script>. Builds its own UI.
(() => {
  const SYMBOLS = ['🍎', '🚀', '🎲', '🐢', '🌵', '🎸', '🍕', '⚓'];
  let cards, first, lock, moves, matched;

  const style = document.createElement('style');
  style.textContent = `
    .mem{font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px}
    .mem-board{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:min(90vw,360px)}
    .mem-card{aspect-ratio:1;font-size:2rem;border:2px solid #1d2a3a;border-radius:10px;
      background:#1f4e8c;color:transparent;cursor:pointer}
    .mem-card:focus-visible{outline:3px solid #f2c230}
    .mem-card.open{background:#e9e4d6;color:inherit}
    .mem-card.done{background:#bfe3c8;color:inherit;cursor:default}
    .mem button.mem-new{font:inherit;padding:8px 14px;border-radius:8px;border:2px solid #1d2a3a;
      background:transparent;cursor:pointer}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.className = 'mem';
  root.innerHTML = `
    <div class="mem-status" aria-live="polite"></div>
    <div class="mem-board"></div>
    <button class="mem-new">New game</button>`;
  document.body.appendChild(root);
  const statusEl = root.querySelector('.mem-status');
  const boardEl = root.querySelector('.mem-board');
  root.querySelector('.mem-new').onclick = reset;

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function reset() {
    cards = shuffle([...SYMBOLS, ...SYMBOLS]);
    first = null; lock = false; moves = 0; matched = 0;
    boardEl.innerHTML = '';
    cards.forEach((sym, i) => {
      const b = document.createElement('button');
      b.className = 'mem-card';
      b.textContent = sym;
      b.setAttribute('aria-label', `Card ${i + 1}`);
      b.onclick = () => flip(i);
      boardEl.appendChild(b);
    });
    updateStatus();
  }

  function updateStatus() {
    statusEl.textContent = matched === SYMBOLS.length
      ? `You matched them all in ${moves} moves!`
      : `Moves: ${moves}   Pairs found: ${matched}/${SYMBOLS.length}`;
  }

  function flip(i) {
    const el = boardEl.children[i];
    if (lock || el.classList.contains('open') || el.classList.contains('done')) return;
    el.classList.add('open');
    if (first === null) { first = i; return; }

    moves++;
    const a = first, b = i;
    first = null;
    if (cards[a] === cards[b]) {
      [a, b].forEach(k => {
        boardEl.children[k].classList.remove('open');
        boardEl.children[k].classList.add('done');
      });
      matched++;
      updateStatus();
    } else {
      lock = true;
      updateStatus();
      setTimeout(() => {
        boardEl.children[a].classList.remove('open');
        boardEl.children[b].classList.remove('open');
        lock = false;
      }, 800);
    }
  }

  reset();
})();
