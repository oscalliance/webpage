document.body.classList.add('animations-disabled'); /* preventing animations on initial page load */

document.querySelectorAll('.toggle').forEach(toggle => {
    const key = toggle.dataset.target;
    const savedState = localStorage.getItem(key);

    if (savedState !== null) {
        const isOn = savedState === 'true';
        toggle.setAttribute('aria-pressed', isOn);

        if (toggle.dataset.target) {
            document.body.classList.toggle(toggle.dataset.target, isOn);
        }
    }

    toggle.addEventListener('click', () => {
        const curState = toggle.getAttribute('aria-pressed') === 'true';

        toggle.setAttribute('aria-pressed', !curState);
        document.body.classList.toggle(toggle.dataset.target, !curState);

        localStorage.setItem(key, !curState);
    });
});

requestAnimationFrame(() => {
    document.body.classList.remove('animations-disabled');
});