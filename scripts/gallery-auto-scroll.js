document.querySelectorAll('.project-page-history-container').forEach(container => {
    const gallery = container.querySelector('.project-page-gallery');
    const slider = container.querySelector('.project-page-gallery-auto-scroll-range');
    const display = container.querySelector('.project-page-gallery-auto-scroll-speed-display');

    let autoScrollTimer;

    function updateDisplay(value) {
        if (value <= 0) {
            display.textContent = 'OFF';
        } else {
            display.textContent = `${value.toFixed(2)}s`;
        }
    }

    function startAutoScroll(delay) {
        stopAutoScroll();
        if (delay <= 0) return;

        autoScrollTimer = setInterval(() => {
            if (gallery.nextSlide) gallery.nextSlide();
        }, delay * 1000);
    }


    function stopAutoScroll() {
        if (autoScrollTimer) clearInterval(autoScrollTimer);
    }

    slider.addEventListener('input', e => {
        let value = parseFloat(e.target.value);

        if (value < 0.1) {
            value = Math.round(value * 100) / 100;
        } else {
            value = Math.round(value * 20) / 20;
        }

        updateDisplay(value);
        startAutoScroll(value);
    });

    slider.value = 0; 
    updateDisplay(0);
    startAutoScroll(0);

    gallery.addEventListener('mouseenter', stopAutoScroll);
    gallery.addEventListener('mouseleave', () => startAutoScroll(parseFloat(slider.value)));
});
