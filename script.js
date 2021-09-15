
var canvas;
var xPosition;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style("z-index", "-1");

    if (windowWidth < 600)  canvas.position(0, 600);
    else                    canvas.position(0, 0);
}

function draw() {
    background(180);
    
    if (windowWidth < 600)  xPosition = windowWidth / 2;
    else                    xPosition = windowWidth / 4;
    
    fill(255);
    // pendulum
    ellipse(xPosition, windowHeight / 4, 20, 20);
}