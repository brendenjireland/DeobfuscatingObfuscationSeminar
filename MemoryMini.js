(()=>{let e=["\uD83C\uDF4E","\uD83D\uDE80","\uD83C\uDFB2","\uD83D\uDC22","\uD83C\uDF35","\uD83C\uDFB8","\uD83C\uDF55","⚓"],t,n,r,o,a,i=document.createElement("style");i.textContent=`
    .mem{font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px}
    .mem-board{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:min(90vw,360px)}
    .mem-card{aspect-ratio:1;font-size:2rem;border:2px solid #1d2a3a;border-radius:10px;
      background:#1f4e8c;color:transparent;cursor:pointer}
    .mem-card:focus-visible{outline:3px solid #f2c230}
    .mem-card.open{background:#e9e4d6;color:inherit}
    .mem-card.done{background:#bfe3c8;color:inherit;cursor:default}
    .mem button.mem-new{font:inherit;padding:8px 14px;border-radius:8px;border:2px solid #1d2a3a;
      background:transparent;cursor:pointer}
  `,document.head.appendChild(i);let l=document.createElement("div");l.className="mem",l.innerHTML=`
    <div class="mem-status" aria-live="polite"></div>
    <div class="mem-board"></div>
    <button class="mem-new">New game</button>`,document.body.appendChild(l);let d=l.querySelector(".mem-status"),s=l.querySelector(".mem-board");function c(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}function m(){t=c([...e,...e]),n=null,r=!1,o=0,a=0,s.innerHTML="",t.forEach((e,t)=>{let n=document.createElement("button");n.className="mem-card",n.textContent=e,n.setAttribute("aria-label",`Card ${t+1}`),n.onclick=()=>u(t),s.appendChild(n)}),p()}function p(){d.textContent=a===e.length?`You matched them all in ${o} moves!`:`Moves: ${o}   Pairs found: ${a}/${e.length}`}function u(e){let i=s.children[e];if(r||i.classList.contains("open")||i.classList.contains("done"))return;if(i.classList.add("open"),null===n){n=e;return}o++;let l=n,d=e;n=null,t[l]===t[d]?([l,d].forEach(e=>{s.children[e].classList.remove("open"),s.children[e].classList.add("done")}),a++,p()):(r=!0,p(),setTimeout(()=>{s.children[l].classList.remove("open"),s.children[d].classList.remove("open"),r=!1},800))}l.querySelector(".mem-new").onclick=m,m()})();