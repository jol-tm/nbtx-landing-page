document.addEventListener("scroll", checkscroll);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".playBtn").forEach(e => {
        e.addEventListener("click", manageMusic);
    });
    
    const logo = [...document.querySelectorAll('#logo')]
    const sections = [...document.querySelectorAll('section')];
    const elementsToAnimate = logo.concat(sections);
    
    animateOnScroll(elementsToAnimate, 'showAnim', 'hideAnim');
});

let audio = new Audio();
let interval;
let time;
let timeLine;

function checkscroll() {
    const navLine = document.querySelector("#navLine");

    if (window.scrollY - (document.body.scrollHeight - window.innerHeight) >= -10) {
        navLine.style.opacity = "0";
    } else if (window.scrollY > 0) {
        navLine.style.width = 100 - (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + "%";
        navLine.style.opacity = "1";
    } else {
        navLine.style.width = "100%";
        navLine.style.opacity = "1";
    }
}

function manageMusic() {
    const file = this.getAttribute("audio");
    const playIcon = `<img src="imgs/play_arrow.svg" alt="play">`;
    const stopIcon = `<img src="imgs/stop.svg" alt="stop">`;

    time = this.nextElementSibling;
    timeLine = time.nextElementSibling;
    clearInterval(interval);

    document.querySelectorAll(".playBtn").forEach(e => {
        if (e != this) {
            e.innerHTML = playIcon;
        }
    });
    document.querySelectorAll(".time").forEach(e => {
        e.innerHTML = "00:00/00:00";
        e.nextElementSibling.style.width = "0%";
    });
    
    audio.src = file;

    if (this.innerHTML == playIcon ) {
        audio.play();
        this.innerHTML = stopIcon;

        interval = setInterval(() => {
            if (!audio.ended) {
                let cur = audio.currentTime;
                let curF = secondsToMS(audio.currentTime);
                let dur = audio.duration;
                let durF = secondsToMS(audio.duration);
        
                time.innerHTML = `${curF}/${durF}`;
                timeLine.style.width = (cur / dur * 100) + "%";
            } else {
                this.innerHTML = playIcon;
                clearInterval(interval);
            }
        }, 1000);

    } else {
        audio.pause();
        clearInterval(interval);
        this.innerHTML = playIcon;
    }
}

function secondsToMS(sec) {
    if (isNaN(sec)) {
        return `00:00`;
    }

    sec = sec.toFixed();
    
    let m = Math.floor(sec / 60);
    let s = (sec % 60);

    m < 10 ? m = "0" + m : m = m;
    s < 10 ? s = "0" + s : s = s;

    return `${m}:${s}`;
}

function animateOnScroll(elements, showAnim, hideAnim) {
    const options = {
        threshold: .1
    }

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(showAnim);
                entry.target.classList.remove(hideAnim);
            } else {
                entry.target.classList.remove(showAnim);
                entry.target.classList.add(hideAnim);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    elements.forEach((element) => observer.observe(element));
}