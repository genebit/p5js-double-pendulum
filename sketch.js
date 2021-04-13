function setup() {
  createCanvas(500, 500);
}

var angle1 = 0;
var angle2 = 0;

function draw() {
  background(30, 30, 30);

  var mass1 = 15;
  var length1 = 100;
  var xEnd1 = length1 * sin(angle1);
  var yEnd1 = length1 * cos(angle1);

  // Center the elements
  translate(250, 150);

  // Point origin
  ellipse(0, 0, 10, 10);

  // First pendulum
  stroke(255);
  strokeWeight(8);
  line(0, 0, xEnd1, yEnd1);
  ellipse(xEnd1, yEnd1, mass1, mass1);

  var mass2 = 15;
  var length2 = 100;
  var xEnd2 = xEnd1 + length2 * sin(angle2);
  var yEnd2 = yEnd1 + length2 * cos(angle2);

  // Second pendulum
  stroke(255);
  strokeWeight(8);
  line(xEnd1, yEnd1, xEnd2, yEnd2);
  ellipse(xEnd2, yEnd2, mass2, mass2);

  angle1 += 0.1;
  angle2 -= 0.05;
}
