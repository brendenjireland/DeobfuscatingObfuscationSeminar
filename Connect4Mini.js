(()=>{let e={1:"#e8452c",2:"#f2c230"},t={1:"Red",2:"Yellow"},r,l,o,n=!1,a=!1,i=document.createElement("style");i.textContent=`
    .c4{font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px}
    .c4-status{font-size:1.1rem;min-height:1.5em}
    .c4-dot{display:inline-block;width:16px;height:16px;border-radius:50%;margin-right:6px;vertical-align:middle}
    .c4-board{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;background:#1f4e8c;
      padding:10px;border-radius:14px;width:min(94vw,520px);box-sizing:border-box}
    .c4-col{display:flex;flex-direction:column;gap:6px;cursor:pointer}
    .c4-col:focus-visible{outline:3px solid #f2c230;outline-offset:2px}
    .c4-cell{aspect-ratio:1;border-radius:50%;background:#e9e4d6}
    .c4-cell.win{box-shadow:0 0 0 4px #1d2a3a}
    .c4-controls{display:flex;gap:10px}
    .c4-controls button{font:inherit;padding:8px 14px;border-radius:8px;border:2px solid #1d2a3a;
      background:transparent;cursor:pointer}
    .c4-controls button.on{background:#1d2a3a;color:#fff}
  `,document.head.appendChild(i);let c=document.createElement("div");c.className="c4",c.innerHTML=`
    <div class="c4-status" aria-live="polite"></div>
    <div class="c4-board"></div>
    <div class="c4-controls">
      <button data-mode="2" class="on">2 players</button>
      <button data-mode="1">Vs computer</button>
      <button data-reset>New game</button>
    </div>`,document.body.appendChild(c);let d=c.querySelector(".c4-status"),s=c.querySelector(".c4-board");function u(){r=Array.from({length:6},()=>Array(7).fill(0)),l=1,o=!1,a=!1,s.innerHTML="";for(let e=0;e<7;e++){let t=document.createElement("div");t.className="c4-col",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",`Drop in column ${e+1}`),t.onclick=()=>_(e),t.onkeydown=t=>{("Enter"===t.key||" "===t.key)&&(t.preventDefault(),_(e))};for(let n=0;n<6;n++){let i=document.createElement("div");i.className="c4-cell",i.id=`c4-${n}-${e}`,t.appendChild(i)}s.appendChild(t)}f()}function f(r){d.innerHTML=r||`<span class="c4-dot" style="background:${e[l]}"></span>${t[l]}'s turn`}c.querySelectorAll("[data-mode]").forEach(e=>{e.onclick=()=>{n="1"===e.dataset.mode,c.querySelectorAll("[data-mode]").forEach(t=>t.classList.toggle("on",t===e)),u()}}),c.querySelector("[data-reset]").onclick=u;let p=e=>{for(let t=5;t>=0;t--)if(!r[t][e])return t;return -1};function b(e){let t=[[0,1],[1,0],[1,1],[1,-1]];for(let l=0;l<6;l++)for(let o=0;o<7;o++)if(r[l][o]===e)for(let[n,a]of t){let i=[];for(let c=0;c<4;c++){let d=l+n*c,s=o+a*c;if(d<0||d>=6||s<0||s>=7||r[d][s]!==e)break;i.push([d,s])}if(4===i.length)return i}return null}function _(e){o||a||$(e)}function $(i){let c=p(i);if(c<0)return;r[c][i]=l,document.getElementById(`c4-${c}-${i}`).style.background=e[l];let d=b(l);if(d){o=!0,d.forEach(([e,t])=>document.getElementById(`c4-${e}-${t}`).classList.add("win")),f(`<span class="c4-dot" style="background:${e[l]}"></span>${t[l]} wins!`);return}if(r[0].every(Boolean)){o=!0,f("Draw — the board is full.");return}l=3-l,f(),n&&2===l&&(a=!0,setTimeout(()=>{a=!1,o||$(m())},450))}function g(e,t){let l=p(e);if(l<0)return!1;r[l][e]=t;let o=!!b(t);return r[l][e]=0,o}function m(){let e=[...Array(7).keys()].filter(e=>p(e)>=0);for(let t of e)if(g(t,2))return t;for(let l of e)if(g(l,1))return l;let o=e.filter(e=>{let t=p(e);r[t][e]=2;let l=t>0&&g(e,1);return r[t][e]=0,!l}),n=o.length?o:e;return n.sort((e,t)=>Math.abs(3-e)-Math.abs(3-t)+(Math.random()-.5)*2),n[0]}u()})();