const modal = document.querySelector(".modal-cont");
const canvas = document.querySelector(".canvas");

document.querySelectorAll(".card").forEach(el => {
    el.addEventListener("click", () => {
        modal.style.display = "block";
        const sliceNumber = Number(el.getAttribute("data-num")) + 1;
        new p5(p => {
            let img;
            let size = 2 ** sliceNumber;

            p.preload = () => {
                img = p.loadImage("cookie.png");
            }

            p.setup = () => {
                p.noStroke();
                p.createCanvas(500, 500).parent(canvas);
            }

            p.draw = () => {
                p.fill(0);
                p.arc(p.width / 2, p.height / 2, p.width, p.height, -2 * p.PI / size, 0);
                let arcMask = p.get();
                p.clear();
                img.mask(arcMask);
                p.image(img, 0, 0, p.width, p.height);
            }
        });
    });
});

document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
    canvas.innerHTML = "";
});