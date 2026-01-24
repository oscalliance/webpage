function initGalleryContainer(container) {
    const gallery = container.querySelector('.project-page-gallery')

    const footer = container.querySelector('.project-page-extras-footer');
    const prevButton = footer.querySelector('.project-page-gallery-prev');
    const nextButton = footer.querySelector('.project-page-gallery-next');
    const dots = footer.querySelector('.project-page-gallery-dots');

    const slides = gallery.querySelectorAll('.project-page-gallery-slide');
    const counter = gallery.querySelector('.project-page-gallery-counter')
    const counterCurrent = counter.querySelector('.project-page-gallery-counter-current-slide');
    const counterTotal = counter.querySelector('.project-page-gallery-counter-total-slides');
    const infoContainer = container.querySelector('.project-page-gallery-info-container');
    const dateInfo = infoContainer.querySelector('#info-date');
    const pixelsInfo = infoContainer.querySelector('#info-pixel-count');
    const noteInfo = infoContainer.querySelector('#info-note');

    let dotElements;
    
    let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;

        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentIndex].classList.add('active');

        counterCurrent.textContent = `${currentIndex + 1}`;

        
        dateInfo.textContent = slides[currentIndex].dataset.date  === "" ? '—' : slides[currentIndex].dataset.date;
        pixelsInfo.textContent = slides[currentIndex].dataset.pixelCount  === "" ? '—' : '~' + slides[currentIndex].dataset.pixelCount;
        noteInfo.textContent = slides[currentIndex].dataset.note  === "" ? '—' : slides[currentIndex].dataset.note;

        if (dotElements) {
            dotElements.forEach(dot => dot.classList.remove('active'));
            dotElements[index].classList.add('active');
        }
    }

    gallery.prevSlide = () => showSlide(currentIndex - 1);
    gallery.nextSlide = () => showSlide(currentIndex + 1);

    if (prevButton) prevButton.addEventListener('click', () => gallery.prevSlide());
    if (nextButton) nextButton.addEventListener('click', () => gallery.nextSlide());

    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('project-page-gallery-dot');
        dots.appendChild(dot);
        dot.addEventListener('click', () => showSlide(index));
    });

    dotElements = dots.querySelectorAll('.project-page-gallery-dot');
    counterTotal.textContent = `${slides.length}`;

    showSlide(currentIndex);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        document.querySelectorAll('.project-page-gallery').forEach(gallery => {
            if (gallery.offsetParent !== null) {
                gallery.prevSlide();
            }
        });
    }

    if (e.key === 'ArrowRight') {
        document.querySelectorAll('.project-page-gallery').forEach(gallery => {
            if (gallery.offsetParent !== null) {
                gallery.nextSlide();
            }
        });
    }
});

document.querySelectorAll('.project-page-history-container').forEach(initGalleryContainer);
