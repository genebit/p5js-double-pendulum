const gravity = 1;

let mass1 = 10;
let length1 = 100;
let angle1 = 200;
let xPos1 = 0;
let yPos1 = 0;
let angularVelocity1 = 0.01;

let mass2 = 15;
let length2 = 150;
let angle2 = 200;
let xPos2 = 0;
let yPos2 = 0;
let angularVelocity2 = 0.02;

function setup() {
     createCanvas(700, 700);
}

let trails = [];
let alpha = 0;

function draw() {
     // Center the elements
     background(240);
     translate(350, 200);
     stroke(26);
     strokeWeight(6);

     // Point origin
     ellipse(0, 0, 10, 10);

     // First pendulum-------/
     xPos1 = length1 * sin(angle1);
     yPos1 = length1 * cos(angle1);

     line(0, 0, xPos1, yPos1);
     ellipse(xPos1, yPos1, mass1, mass1);

     // Second pendulum-------/
     xPos2 = xPos1 + length2 * sin(angle2);
     yPos2 = yPos1 + length2 * cos(angle2);

     line(xPos1, yPos1, xPos2, yPos2);
     ellipse(xPos2, yPos2, mass2, mass2);

     // Trails----------------/
     trails.push([xPos2, yPos2]);
     for(let i = 0; i < trails.length; i++) {
          noStroke();
          fill(235, 79, 52, alpha);
          ellipse(trails[i][0], trails[i][1], 6);
          if(alpha > 255) {
               trails.shift();
               alpha = 0;
          }
          alpha += 8;
     }

     // Formula for computing angular velocity 1
     let ang1Num = -gravity * (2 * mass1 + mass2) * sin(angle1) -
                    mass2 * gravity * sin(angle1 - 2 * angle2) -
                    2 * sin(angle1 - angle2) *
                    mass2 * (angularVelocity2 * angularVelocity2 * length2 +
                    angularVelocity1 * angularVelocity1 * length1 * cos(angle1 - angle2));

     let ang1Denom = length1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
     let angularAcceleration1 = ang1Num / ang1Denom;

     // Formula for computing angular velocity 2
     let ang2Num = 2 * sin(angle1 - angle2) * (angularVelocity1 * angularVelocity1 *
                    length1 * (mass1 + mass2) + gravity * (mass1 + mass2) *
                    cos(angle1) + angularVelocity2 * angularVelocity2 * length2 *
                    mass2 * cos(angle1 - angle2));

     let ang2Denom = length2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
     let angularAcceleration2 = ang2Num / ang2Denom;

     angularVelocity1 += angularAcceleration1;
     angularVelocity2 += angularAcceleration2;
     angle1 += angularVelocity1;
     angle2 += angularVelocity2;
     
     // Damping
     // angularVelocity1 *= 0.999;
     // angularVelocity2 *= 0.999;
}
