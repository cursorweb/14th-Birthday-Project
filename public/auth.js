const button = document.querySelector(".auth-btn");

button.addEventListener("click", () => {
    window.addEventListener("message", authComplete);

    const h = 500;
    const w = 350;
    const left = (screen.width / 2) - (w / 2);
    const top = (screen.height / 2) - (h / 2);

    let authWindow = window.open(
        `https://repl.it/auth_with_repl_site?domain=${location.host}`,
        "_blank",
        `modal=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );

    function authComplete(e) {
        if (e.data != "auth_complete") return;
        
        window.removeEventListener("message", authComplete);

        authWindow.close();
        location.reload();
    }
});