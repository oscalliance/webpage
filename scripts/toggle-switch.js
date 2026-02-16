document.body.classList.add('animations-disabled'); /* preventing animations on initial page load */

document.querySelectorAll('.toggle').forEach(toggle => {
    const key = toggle.dataset.target;
    const isPersistent = toggle.dataset.persistent !== "false";

    let isOn;

    if (isPersistent) {
        const savedState = localStorage.getItem(key);

        if (savedState !== null) {
            isOn = savedState === 'true';
        } 
        else {
            isOn = toggle.getAttribute('aria-pressed') === 'true';
        }

        toggle.setAttribute('aria-pressed', isOn);
        document.body.classList.toggle(key, isOn);
    } 
    else {
        isOn = toggle.getAttribute('aria-pressed') === 'true';
        document.body.classList.toggle(key, isOn);
    }

    toggle.addEventListener('click', () => {
        const curState = toggle.getAttribute('aria-pressed') === 'true';
        const newState = !curState;

        toggle.setAttribute('aria-pressed', newState);
        document.body.classList.toggle(key, newState);

        if (isPersistent) {
            localStorage.setItem(key, newState);
        }
    });
});

requestAnimationFrame(() => {
    document.body.classList.remove('animations-disabled');
});
