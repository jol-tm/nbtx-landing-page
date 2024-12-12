document.addEventListener("scroll", checkscroll);
document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    AOS.init();
});

function checkscroll() {
    const navLine = document.querySelector("#navLine");
    const rollTop = document.querySelector("#rollTop");

    if (window.scrollY >= (document.body.scrollHeight - window.innerHeight)) {
        navLine.style.opacity = "0";
    } else if (window.scrollY > 0) {
        navLine.style.width = 100 - (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + "%";
        navLine.style.opacity = "1";
        rollTop.style.right = "-3rem";
    } else {
        navLine.style.width = "100%";
        navLine.style.opacity = "1";
    }

    // Separeted if to not conflict with the others ones
    if (window.scrollY - (document.body.scrollHeight - window.innerHeight) >= -500) {
        rollTop.style.right = "1rem";
    }
}