class BallA {
     constructor(mass, length) {
          this.mass = mass;
          this.length = length;
          this.angle = 200;
          this.xPosition = 0;
          this.yPosition = 0;
          this.angularVelocity = 0.01;
     }
     draw() {
          this.xPosition = this.length * sin(this.angle);
          this.yPosition = this.length * cos(this.angle);

          line(0, 0, this.xPosition, this.yPosition);
          ellipse(this.xPosition, this.yPosition, this.mass, this.mass);
     }
}

class BallB {
     constructor(mass, length) {
          this.mass = mass;
          this.length = length;

          this.angle = 200;
          this.xPosition = 0;
          this.yPosition = 0;
          this.angularVelocity = 0.02;    
     }
     draw(ballAX, ballAY) {
          this.xPosition = ballAX + this.length * sin(this.angle);
          this.yPosition = ballAY + this.length * cos(this.angle);

          line(ballAX, ballAY, this.xPosition, this.yPosition);
          ellipse(this.xPosition, this.yPosition, this.mass, this.mass);
     }
}

var gravity = 1;

let trails = [];
let alpha = 0;

const FPS = 60;

var ballA = new BallA(10, 100);
var ballB = new BallB(15, 150);

var canvas;
var xPosition;
// Credits to StackOverflow: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
     return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
     } : null;
}

function drawTrails(color) {
     trails.push([ballB.xPosition, ballB.yPosition]);
     for(let i = 0; i < trails.length; i++) {
          noStroke();
          fill(hexToRgb(color).r, hexToRgb(color).g, hexToRgb(color).b, alpha);
          ellipse(trails[i][0], trails[i][1], ballB.mass/2);
          if(alpha > 255) {
               trails.shift();
               alpha = 0;
          }
          alpha += 8;
     }
}

function setup() {
     canvas = createCanvas(windowWidth, windowHeight);
     canvas.style("z-index", "-1");
     
     if (windowWidth < 600)  canvas.position(0, 700);
     else                    canvas.position(0, 0);

     frameRate(FPS);
}

function draw() {

// JQUERY VALUE PROPERTIES CHANGER
     $("#ball-1-mass").on('mouseup', function() {
          ballA.mass = $("#ball-1-mass").val(); 
     }).on("touchend", function() {
          ballA.mass = $("#ball-1-mass").val(); 
     });
     $("#ball-1-length").on("mouseup", function() { 
          ballA.length = $("#ball-1-length").val(); 
     }).on("touchend", function() {
          ballA.length = $("#ball-1-length").val(); 
     });
     
     $("#ball-2-mass").on("mouseup", function() { 
          ballB.mass = $("#ball-2-mass").val();  
     }).on("touchend", function() { 
          ballB.mass = $("#ball-2-mass").val();  
     });
     $("#ball-2-length").on("mouseup", function() { 
          ballB.length = $("#ball-2-length").val(); 
     }).on("touchend", function() {
          ballB.length = $("#ball-2-length").val(); 
     });
     
     $("#gravity").on("mouseup",function() { 
          gravity = $("#gravity").val(); 
     }).on("touchend",function() { 
          gravity = $("#gravity").val(); 
     });;
     
     var enableDamping = $("#damping").is(":checked");
     if (enableDamping) {
          ballA.angularVelocity *= 0.999;
          ballB.angularVelocity *= 0.999;
     }
     
     background(255);
     
     if (windowWidth < 600)  xPosition = windowWidth / 2;
     else                    xPosition = windowWidth / 4;

     translate(xPosition, windowHeight / 4);
     stroke(26);
     strokeWeight(6);

// ORIGIN
     ellipse(0, 0, 10, 10);

// DRAW BALL A AND B
     ballA.draw();
     ballB.draw(ballA.xPosition, ballA.yPosition);

// TRAILS
// TODO: Change the look of this instead of ellipse, make it a continuous line
     var enableTrails = $("#trails").is(":checked");
     if (enableTrails) {
          $("#colors").removeAttr("disabled");
          drawTrails($("#colors").val());
     }
     else {
          $("#colors").attr("disabled","disabled");
     }
     
//######################################################################
// FORMULA FOR CALCULATING THE ANGULAR VELOCITY     ####################
// NOTE: A and B refers to Ball A and B             ####################
//######################################################################

// DON'T ASK ME HOW, THIS IS THE FORMULA: https://www.myphysicslab.com/pendulum/double-pendulum-en.html

// ANGULAR VELOCITY A
     let angleA_numerator = -gravity * (2 * ballA.mass + ballB.mass) * sin(ballA.angle) -
               ballB.mass * gravity * sin(ballA.angle - 2 * ballB.angle) - 2 * sin(ballA.angle - ballB.angle) *
               ballB.mass * (ballB.angularVelocity * ballB.angularVelocity * ballB.length + ballA.angularVelocity * 
               ballA.angularVelocity * ballA.length * cos(ballA.angle - ballB.angle));

     let angleA_denominator = ballA.length * (2 * ballA.mass + ballB.mass - ballB.mass * cos(2 * ballA.angle - 2 * ballB.angle));
     let angularAcceleration1 = angleA_numerator / angleA_denominator;

// ANGULAR VELOCITY B
     let angle2_numerator = 2 * sin(ballA.angle - ballB.angle) * (ballA.angularVelocity * ballA.angularVelocity *
               ballA.length * (ballA.mass + ballB.mass) + gravity * (ballA.mass + ballB.mass) *
               cos(ballA.angle) + ballB.angularVelocity * ballB.angularVelocity * ballB.length *
               ballB.mass * cos(ballA.angle - ballB.angle));

     let angleB_denominator = ballB.length * (2 * ballA.mass + ballB.mass - ballB.mass * cos(2 * ballA.angle - 2 * ballB.angle));
     let angularAcceleration2 = angle2_numerator / angleB_denominator;

     ballA.angularVelocity += angularAcceleration1;
     ballA.angle += ballA.angularVelocity;
     
     ballB.angularVelocity += angularAcceleration2;
     ballB.angle += ballB.angularVelocity;
}
