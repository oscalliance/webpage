const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalHeaderText = document.getElementById("modal-header-text");

function openModal(key, headertext, content = undefined) {
    modalHeaderText.textContent = headertext;

    const templates = modalOverlay.querySelectorAll(".modal-template");
    templates.forEach(t => t.style.display = "none");

    const template = document.getElementById(`modal-${key}`);
    if (!template) return;

    template.style.display = "block";

    if (content) {
        const dynamic = template.querySelector(".modal-dynamic-content");
        dynamic.innerHTML = content;
    }

    modalOverlay.classList.add("active");
}

function closeModal() {
    modalOverlay.classList.remove("active");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});

document.addEventListener("click", e => {
    const button = e.target.closest(".open-modal");
    if (!button) return;

    openModal(button.dataset.modal, button.dataset.headertext, button.dataset.content);
});
