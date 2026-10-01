(()=>{let e,t,n,a,r,o=0,l,i,d=document.createElement("style");d.textContent=`
    .snk{font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px}
    .snk canvas{border:3px solid #1d2a3a;border-radius:8px;max-width:94vw;height:auto;background:#e9e4d6}
    .snk-pad{display:grid;grid-template-columns:repeat(3,48px);gap:6px}
    .snk-pad button,.snk button.snk-new{font:inherit;border:2px solid #1d2a3a;border-radius:8px;
      background:transparent;cursor:pointer;height:44px}
    .snk-pad .up{grid-column:2}
    .snk-pad .left{grid-column:1;grid-row:2}
    .snk-pad .down{grid-column:2;grid-row:2}
    .snk-pad .right{grid-column:3;grid-row:2}
  `,document.head.appendChild(d);let s=document.createElement("div");s.className="snk",s.innerHTML=`
    <div class="snk-score" aria-live="polite"></div>
    <canvas width="400" height="400"></canvas>
    <div class="snk-pad">
      <button class="up" aria-label="Up">↑</button>
      <button class="left" aria-label="Left">←</button>
      <button class="down" aria-label="Down">↓</button>
      <button class="right" aria-label="Right">→</button>
    </div>
    <button class="snk-new">New game</button>`,document.body.appendChild(s);let c=s.querySelector("canvas").getContext("2d"),$=s.querySelector(".snk-score"),u={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]},p={ArrowUp:"up",w:"up",ArrowDown:"down",s:"down",ArrowLeft:"left",a:"left",ArrowRight:"right",d:"right"};function _(e){let a=u[e];(a[0]!==-t[0]||a[1]!==-t[1])&&(n=a)}function f(){do a=[Math.floor(20*Math.random()),Math.floor(20*Math.random())];while(e.some(([e,t])=>e===a[0]&&t===a[1]))}function g(){clearInterval(l),e=[[10,10],[9,10],[8,10]],t=n=u.right,r=0,i=!1,f(),b(),w(),l=setInterval(h,110)}function b(){$.textContent=i?`Game over — score ${r}. Press Space or New game.`:`Score ${r}   Best ${o}`}function h(){t=n;let d=[e[0][0]+t[0],e[0][1]+t[1]],s=d[0]<0||d[0]>=20||d[1]<0||d[1]>=20,c=e.some(([e,t])=>e===d[0]&&t===d[1]);if(s||c){i=!0,clearInterval(l),o=Math.max(o,r),b();return}e.unshift(d),d[0]===a[0]&&d[1]===a[1]?(o=Math.max(o,++r),f()):e.pop(),b(),w()}function w(){c.clearRect(0,0,400,400),c.fillStyle="#e8452c",c.beginPath(),c.arc(20*a[0]+10,20*a[1]+10,8,0,2*Math.PI),c.fill(),e.forEach(([e,t],n)=>{c.fillStyle=0===n?"#1d2a3a":"#2f7d4f",c.fillRect(20*e+1,20*t+1,18,18)})}s.querySelectorAll(".snk-pad button").forEach(e=>{e.onclick=()=>_(e.className)}),s.querySelector(".snk-new").onclick=g,document.addEventListener("keydown",e=>{let t=p[e.key];t?(e.preventDefault(),_(t)):" "===e.key&&i&&(e.preventDefault(),g())}),g()})();