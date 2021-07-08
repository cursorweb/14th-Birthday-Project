// todo: configure the slice amount
let size = 2; // 1 / size
let img;

function preload() {
    img = loadImage("cookie.png");
}

function setup() {
    noStroke();
    createCanvas(500, 500);
}

function draw() {
    fill(0);
    arc(width / 2, height / 2, width, height, 0, 2 * PI / size);
    let arcMask = get();
    clear();
    img.mask(arcMask);
    image(img, 0, 0, width, height);
}

function chip(x, y) {
    push();
    fill("#5a3017");
    circle(x, y, 50);
    pop();

    // depth
    push();
    noFill();
    strokeWeight(10);
    stroke("#422108");
    arc(x, y, 40, 40, PI / 2, PI + PI / 4);
    pop();
}