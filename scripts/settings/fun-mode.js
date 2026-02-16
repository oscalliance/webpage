(function () {
    const audio = document.getElementById("fun-audio");
    const toggleSelector = ".toggle[data-target='fun-mode']";

    document.querySelectorAll(toggleSelector).forEach(toggle => {
        toggle.addEventListener("click", function() {
            const isPressed = this.getAttribute("aria-pressed") === "true";

            if (isPressed) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
})();