document.addEventListener("scroll", checkscroll);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".playBtn").forEach(e => {
        e.addEventListener("click", manageMusic);
    });
    AOS.init();
});

let audio = new Audio();

function checkscroll() {
    const navLine = document.querySelector("#navLine");
    const rollTop = document.querySelector("#rollTop");

    if (window.scrollY - (document.body.scrollHeight - window.innerHeight) >= -10) {
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
    if (window.scrollY >= 1000) {
        rollTop.style.right = "1rem";
    }
}

function manageMusic() {
    const file = this.getAttribute("audio");
    const playIcon = `<img src="imgs/play_arrow.svg" alt="play">`;
    const stopIcon = `<img src="imgs/stop.svg" alt="stop">`;
    let interval;
    time = this.nextElementSibling; // Por algum motivo só funcionou sem colocar palavra chave da variável, sem ela começaa a interagir com todos os time conforme vai clicando, estranho.
    timeLine = time.nextElementSibling;
    
    if (!audio.ended) {
        document.querySelectorAll(".playBtn").forEach(e => {
            if (e != this) {
                e.innerHTML = playIcon;
            }
        });
        document.querySelectorAll(".time").forEach(e => {
            e.innerHTML = "00:00/00:00";
            e.nextElementSibling.style.width = "0%";
        });
    }
    
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
    sec = sec.toFixed();
    
    let m = Math.floor(sec / 60);
    let s = (sec % 60);

    m < 10 ? m = "0" + m : m = m;
    s < 10 ? s = "0" + s : s = s;

    return `${m}:${s}`;
}