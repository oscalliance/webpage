function formatDatesInText(text) {
    const useMMDDYYYY = document.body.classList.contains("use-mmddyyyy");

    return text.replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g, (_, m, d, y) => {
        return useMMDDYYYY
            ? `${m}/${d}/${y}`
            : `${d}/${m}/${y}`;
    });
}

function renderDates() {
    document.querySelectorAll(".has-date").forEach(el => {
        if (!el.dataset.original) {
            el.dataset.original = el.textContent;
        }

        el.textContent = formatDatesInText(el.dataset.original);
    });
}

document.querySelectorAll(".toggle[data-target='use-mmddyyyy']").forEach(toggle => {
    toggle.addEventListener("click", renderDates);
});

window.addEventListener("load", renderDates);
