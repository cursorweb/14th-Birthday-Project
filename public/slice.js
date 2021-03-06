// todo: configure the slice amount
let size = 2 ** slice; // 1 / size
let img;

function preload() {
    img = loadImage("cookie.png");
}

function setup() {
    noStroke();
    createCanvas(500, 500).parent(document.querySelector(".canvas"));
}

function draw() {
    fill(0);
    arc(width / 2, height / 2, width, height, -2 * PI / size, 0);
    let arcMask = get();
    clear();
    img.mask(arcMask);
    image(img, 0, 0, width, height);
}