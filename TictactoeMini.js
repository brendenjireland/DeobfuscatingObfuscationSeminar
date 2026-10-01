(()=>{let t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],e,r,n,o=!1,l=document.createElement("style");l.textContent=`
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
  `,document.head.appendChild(l);let a=document.createElement("div");a.className="ttt",a.innerHTML=`
    <div class="ttt-status" aria-live="polite"></div>
    <div class="ttt-board"></div>
    <div class="ttt-controls">
      <button data-mode="2" class="on">2 players</button>
      <button data-mode="1">Vs computer</button>
      <button data-reset>New game</button>
    </div>`,document.body.appendChild(a);let i=a.querySelector(".ttt-status"),d=a.querySelector(".ttt-board");function c(e){for(let r of t)if(e[r[0]]&&e[r[0]]===e[r[1]]&&e[r[0]]===e[r[2]])return r;return null}function s(){e=Array(9).fill(""),r="X",n=!1,d.innerHTML="";for(let t=0;t<9;t++){let l=document.createElement("button");l.className="ttt-cell",l.setAttribute("aria-label",`Square ${t+1}`),l.onclick=()=>{n||o&&"O"===r||u(t)},d.appendChild(l)}i.textContent="X's turn"}function u(t){if(e[t]||n)return;e[t]=r,d.children[t].textContent=r;let l=c(e);if(l){n=!0,l.forEach(t=>d.children[t].classList.add("win")),i.textContent=`${r} wins!`;return}if(e.every(Boolean)){n=!0,i.textContent="Draw.";return}r="X"===r?"O":"X",i.textContent=`${r}'s turn`,o&&"O"===r&&setTimeout(()=>{n||u(p())},350)}function f(t,e){let r=c(t);if(r)return"O"===t[r[0]]?1:-1;if(t.every(Boolean))return 0;let n="O"===e?-2:2;for(let o=0;o<9;o++){if(t[o])continue;t[o]=e;let l=f(t,"O"===e?"X":"O");t[o]="",n="O"===e?Math.max(n,l):Math.min(n,l)}return n}function p(){let t=-2,r=0;for(let n=0;n<9;n++){if(e[n])continue;e[n]="O";let o=f(e,"X");e[n]="",o>t&&(t=o,r=n)}return r}a.querySelectorAll("[data-mode]").forEach(t=>{t.onclick=()=>{o="1"===t.dataset.mode,a.querySelectorAll("[data-mode]").forEach(e=>e.classList.toggle("on",e===t)),s()}}),a.querySelector("[data-reset]").onclick=s,s()})();