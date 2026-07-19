(function () {
    const audio = document.getElementById("fun-audio");
    const toggleSelector = ".toggle[data-target='fun-mode']";
    
    let beatChecker;
    let lastBeat = -1;
    const bpm = 158.140;
    const secondsPerBeat = 60 / bpm;

    document.querySelectorAll(toggleSelector).forEach(toggle => {
        toggle.addEventListener("click", function() {
            const isPressed = this.getAttribute("aria-pressed") === "true";

            if (isPressed) {
                audio.play();

                document.documentElement.classList.add("hue-shift-active");
                lastBeat = -1; 
                beatChecker = setInterval(checkBeat, 30);
            } else {
                audio.pause();

                document.documentElement.classList.remove("hue-shift-active");
                clearInterval(beatChecker);
            }
        });
    });

    function checkBeat() {
        let currentBeat = Math.floor(audio.currentTime / secondsPerBeat);
        if (currentBeat > lastBeat) {
            lastBeat = currentBeat;
            setRandomSplash();
        }
    }
})();