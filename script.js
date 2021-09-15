
var w = window.innerWidth;
var h = window.innerHeight;

function setup() {
    canvas = createCanvas(w, h);
}

function draw() {
    background("#fff000");
    // A rectangle
    fill("#f2b55e");
    strokeWeight(4);
    rect(w/2, h/4, 200, 200);
    // uses global variables for width and height
}

window.onresize = function () {
    // assigns new values for width and height variables
    w = window.innerWidth;
    h = window.innerHeight;

    console.log(w);
    if (w < 500) {
        w = w/4;
    }
    canvas.size(w, h);
}