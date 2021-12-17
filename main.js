// Das Element auf dem gemalt werden wird
var pic = document.getElementById("pic"); 
var ctx = pic.getContext("2d");

// Synthetisierung der CPC-Farbpalette
let colors = [];
let x = 255/2.0;
for (let g=0;g<3;g++) {
  for (let r=0;r<3;r++) {
    for (let b=0;b<3;b++) {
      col = `rgb(${x*r},${x*g},${x*b})`;
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

const mid = 60, amp = mid;

// Malung eines Barren
function bar(target, cols, c, f) {
  var t = [], x = 0;
  for (var y of cols) {
    //t.push(x);
    //t.push(x);t.push(x);
    //t.push(x); t.push(x); t.push(y);
    t.push(x); t.push(x); t.push(y); t.push(x);
    x = y;
  }
  t.push(x); t.push(x); t.push(0); t.push(x);
  cols = t;
  y = parseInt(mid + f * amp * Math.sin(c.x));
  c.x += c.y;
  for (var x of cols) {
    target[y++] = x;
  }
}

// Initialisierung der Barrenschwingungen
const nummer_der_barren = 9, ay = 0.0464, dx = 1.5 / nummer_der_barren;
var ax = 1, bars = [];
for (i=0;i<nummer_der_barren;i++) {
  bars.push({
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
  for (i=0;i<200;i++) coltab[i] = 0 + i % 2;
  // Die Barren im Hintergrund einzeichnen
  for (i=0;i<bars.length;i++) {
    bar(coltab, cols[i % cm], bars[i], 1.0);
  }
  // Malung delegieren
  draw(coltab, 1);
}

// Starten der Animation
window.setInterval(function() {
  frame()
}, 25);
