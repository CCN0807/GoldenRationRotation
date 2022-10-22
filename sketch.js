/* eslint-disable no-undef, no-unused-vars */
let fibs = [1, 1];
let scale = 1;
let minScale;
let maxScale;
const color = "#ffffff";
const fibLen = 27;
var r = 3;
let pos = 0.01;
let p = 0;
var phi;
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
let clockwise;
let easing = 0.1;
var cnv;

class Blog {}

function initfib() {
  var acc = 0;
  for (let i = 0; i < fibLen; i++) {
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
  }
  phi = fibs[fibLen - 1] / fibs[fibLen - 2];
}
function mouseWheel(event) {
  //print(event.delta);
  pos -= event.delta;
}
function turnLeft() {
  pos += 180;
  pos -= pos % 180;
}
function turnRight() {
  pos -= 180;
  pos -= pos % 180;
}

function centerCanvas() {
  var x = (windowWidth - CANVAS_WIDTH) / 2;
  var y = (windowHeight - CANVAS_HEIGHT) / 2;
  cnv.position(x, y);
}

function setup() {
  CANVAS_HEIGHT = windowHeight * 0.9;
  CANVAS_WIDTH = windowWidth * 0.9;

  cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  cnv.style("display", "block");
  centerCanvas();

  angleMode(DEGREES);
  initfib();

  minScale = fibs[fibLen - 5] / fibs[fibLen - 1];
  maxScale = fibs[fibLen - 1] / fibs[fibLen - 5];
}

function windowResized() {
  CANVAS_HEIGHT = windowHeight * 0.9;
  CANVAS_WIDTH = windowWidth * 0.9;

  cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  centerCanvas();
}

function draw() {
  var dp = pos - p;
  p += dp * easing;
  if (dp != 0) {
    translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    //canvas.position(0, 0)
    rotate(-p);

    for (let i = 0; i < fibs.length; i++) {
      const scaledFib = fibs[i] * scale;
      fill(color);
      rect(0, 0, scaledFib, scaledFib);
      arc(scaledFib, 0, 2 * scaledFib, 2 * scaledFib, 90, 180);
      translate(scaledFib, scaledFib);
      rotate(-90);
    }

    if (scale <= minScale || scale >= maxScale) {
      fibs = [1, 1];
      initfib();
      scale = 1;
    } else {
      scale += ((dp * easing) / 90) * phi;
    }
  }
  //print(pos)
}
