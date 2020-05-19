
var pic = document.getElementById("pic"); 
var ctx = pic.getContext("2d");

// create CPC color palette
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

// draw color buffer
function draw(c, h) {
  for (let i=0; i<c.length;i++) {
    let y = h*i; // + r + r * Math.sin(ii);
    ctx.fillStyle = colors[c[i]];
    ctx.fillRect(0,y,100,y+h);
  }
}

// draw bar
var mid = 80, amp = 80;
function bar(target, cols, c, f) {
  var t = [], x = 0;
  for (var y of cols) {
    t.push(x); t.push(x); t.push(y); t.push(x);
    x = y;
  }
  cols = t;
  y = parseInt(mid + f * amp * Math.sin(c.x));
  c.x += c.y;
  for (var x of cols) {
    target[y++] = x;
  }
}

// init
var red = { x:-1, y: 0.1 };
var green = { x:-0.7, y: 0.11 };
var blue = { x:0.4, y: 0.0815 };

// draw
var ir=-1, ib=0.5;
function frame() {
  coltab = [];
  for (i=0;i<200;i++) coltab[i] = i % 2;
  bar(coltab, [3,6,15,24,25,24,15,6,3,0], red, 0.8);
  bar(coltab, [9,18,19,22,25,22,19,18,9,0], green, 0.9);
  bar(coltab, [1,2,11,14,20,14,11,2,1], blue, 1.0);
  draw(coltab, 1);
}

window.setInterval(function() {
  frame()
}, 25);
