// Das Element auf dem gemalt werden wird
const pic = document.getElementById("pic"); 
const ctx = pic.getContext("2d");
const mid = 60, amp = mid;

// Synthetisierung der CPC-Farbpalette
const colors = [];
const x = 255/2.0;
for (let g=0;g<3;g++) {
  for (let r=0;r<3;r++) {
    for (let b=0;b<3;b++) {
      let col = `rgb(${x*r},${x*g},${x*b})`;
      colors.push(col);
    }
  }
}

// Malen des Farbzwischenspeichers
function draw(c, h) {
  for (let i=0; i<c.length;i++) {
    let y = h*i; // + r + r * Math.sin(ii);
    ctx.fillStyle = colors[c[i]];
    ctx.fillRect(0,y,1024,y+h);
  }
}     

// Malung eines Barren
function bar(target, cols, c, f) {
  let t = [], x = 0, y;
  let push = (t,x,y) => { 
    t.push(x); t.push(x); t.push(y); t.push(x); 
  };
  for (y of cols) {
    push(t,x,y);
    x = y;
  }
  push(t,x,y);
  y = parseInt(mid + f * amp * Math.sin(c.x));
  c.x += c.y;
  for (let x of t) {
    target[y++] = x;
  }
}

// Initialisierung der Barrenschwingungen
const nummer_der_barren = 9, ay = 0.0464, dx = 1.5 / nummer_der_barren;
let ax = 1, barren = [];
for (let i=0;i<nummer_der_barren;i++) {
  barren.push({
    x: ax, y: ay
  });
  ax += dx;
}

// Herstellung der Barrenfärbung
const cols = [
  [3,6,15,24,25,24,15,6,3],
  [9,18,19,22,25,22,19,18,9], 
  [1,2,11,14,20,14,11,2,1]
];
const cm = cols.length;

// Rendierung eins Bildschirms
function frame() {
  // Hintergründiges Muster malen
  const coltab = [];
  for (let i=0;i<200;i++) coltab[i] = 0 + i % 2;
  // Die Barren im Hintergrund einzeichnen
  for (let i=0;i<barren.length;i++) {
    bar(coltab, cols[i % cm], barren[i], 1.0);
  }
  // Malung delegieren
  draw(coltab, 1);
}

// Starten der Animation
window.setInterval(function() {
  frame()
}, 25);
