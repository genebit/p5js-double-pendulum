function setup() {
  createCanvas(500, 500);
}

var angle1 = 0;
var angle2 = 0;

function draw() {
  var mass1 = 15;
  var length1 = 100;
  var xEnd1 = length1 * sin(angle1);
  var yEnd1 = length1 * cos(angle1);

  const gravity = 9.8;
  var angularVelocity1 = 0.01;

  var mass2 = 15;
  var length2 = 100;
  var xEnd2 = xEnd1 + length2 * sin(angle2);
  var yEnd2 = yEnd1 + length2 * cos(angle2);

  var angularVelocity2 = 0.01;

  // Formula for angular velocity 1
  let numerator1 = -gravity (2 (mass1 + mass2)) * sin(angle1);
  let numerator2 = -mass2 * gravity * sin(angle1 - 2 (angle2));
  let numerator3 = -2 * sin(angle1 - angle2);
  let numerator4 = mass2 (angle2 * angle2 * length2 + angle1 * angle1 * length1 * cos(angle1 - angle2));
  
  let numerator = numerator1 + numerator2 + numerator3 + numerator4;
  let denominator = length1 (2 (mass1 + mass2 - mass2 * cos(2 (angle1 - 2 * angle2))));
  
  // Center the elements
  background(30, 30, 30);
  translate(250, 150);

  // Point origin
  ellipse(0, 0, 10, 10);

  // First pendulum-------/
  stroke(255);
  strokeWeight(8);
  line(0, 0, xEnd1, yEnd1);
  ellipse(xEnd1, yEnd1, mass1, mass1);

  // Second pendulum-------/
  stroke(255);
  strokeWeight(8);
  line(xEnd1, yEnd1, xEnd2, yEnd2);
  ellipse(xEnd2, yEnd2, mass2, mass2);
}
