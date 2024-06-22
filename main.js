// Das Element auf dem gemalt werden wird
const bild = document.getElementById("pic"); 
const kontext = bild.getContext("2d");
const mitte = 60, ablenkung = mitte;
const zufall = Math.random();

// Synthetisierung der CPC-Farbpalette
const farben = [];
const x = 255/2.0;
for (let g=0;g<3;g++) {
  for (let r=0;r<3;r++) {
    for (let b=0;b<3;b++) {
      let farbe = `rgb(${x*r},${x*g},${x*b})`;
      farben.push(farbe);
    }
  }
}

// Malen des Farbzwischenspeichers
function male_zwischenspeicher(c, h) {
  for (let i=0; i<c.length;i++) {
    let y = h*i; 
    kontext.fillStyle = farben[c[i]];
    kontext.fillRect(0,y,1024,y+h);
  }
}     

// Malung eines Barren
function male_barren(zielbereich, farben, barren, f) {
  let t = [], x = 0, y;
  let push = (t,x,y) => { 
    t.push(x); t.push(x); t.push(y); t.push(x); 
  };
  for (y of farben) {
    push(t,x,y);
    x = y;
  }
  push(t,x,y);
  y = parseInt(mitte + f * ablenkung * Math.sin(barren.x));
  barren.x += barren.y;
  for (let x of t) {
    zielbereich[y++] = x;
  }
}

// Initialisierung der Barrenschwingungen
const cpc_halbe = 0.0464 / 2;
const nummer_der_barren = 5 + 3*zufall, 
  schwingtempo = 0.05 + 0.02*zufall; 
  dx = 0.4 + 0.3*zufall; 
let ax = 1, schwingende_barren = [];
for (let i=0;i<nummer_der_barren;i++) {
  schwingende_barren.push({
    x: ax, y: schwingtempo
  });
  ax += dx;
}

// Herstellung der Barrenfärbung
const farbige_balken = [
  [3,6,15,24,15,6,3],
  [9,18,19,22,19,18,9], 
  [1,2,11,14,20,14,11,2,1]
];
const cm = farbige_balken.length;

// Rendierung eins Bildschirms
function rendierung(ymax) {
  // Hintergründiges Muster malen
  const farbtabelle = [];
  for (let i=0;i<ymax;i++) farbtabelle[i] = 0 + i % 2;
  // Die Barren im Hintergrund einzeichnen
  for (let i=0;i<schwingende_barren.length;i++) {
    male_barren(farbtabelle, farbige_balken[i % cm], schwingende_barren[i], 1.0);
  }
  // Malung delegieren
  male_zwischenspeicher(farbtabelle, 1);
}

// Starten der Animation
window.setInterval(function() {
  rendierung(200);
}, 25);
