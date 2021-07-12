const container = document.querySelector(".confetti-overlay");

document.querySelectorAll(".btn").forEach(el => {
    el.addEventListener("mouseover", e => {
        const cont = document.createElement("div");
        cont.classList.add("hover");

        for (let i = 0; i < 3; i++) {
            let confetti = document.createElement("div");
            confetti.classList.add("confetti", `confetti-${i}`);
            cont.appendChild(confetti);
        }

        cont.style.left = `${e.clientX}px`;
        cont.style.top = `${e.clientY}px`;

        container.appendChild(cont);

        setTimeout(() => cont.remove(), 500);
    });
});