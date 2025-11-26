const circleContainer = document.getElementById('circle-container');

const colors = [
    'radial-gradient(circle, rgba(255, 100, 255, 0.4), transparent 70%)',
    'radial-gradient(circle, rgba(180, 100, 255, 0.4), transparent 70%)'
];

for (let i = 0; i < 12; i++) {
    const circle = document.createElement('div');
    circle.classList.add('blur-circle');

    const size = Math.random() * 1000;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${Math.random() * 80}vw`;
    circle.style.top = `${Math.random() * 80}vh`;
    circle.style.opacity = `${Math.min(0.02 + size / 1000, 0.2)}`;
    circle.style.background = colors[i % colors.length];

    circleContainer.appendChild(circle);
}

document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.blur-circle').forEach(circle => {
        const sizeFactor = parseInt(circle.style.width) / 200;
        const rect = circle.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        circle.style.transform = `translate(${dx * 0.002 * sizeFactor ** 2}px, ${dy * 0.002 * sizeFactor ** 2}px)`;
    });
});

class Slider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.dotsCont = container.querySelector('.dots');
        this.descContainer = container.querySelector('.image-description-container');
        this.counterCurrent = container.querySelector('.current-slide');
        this.counterTotal = container.querySelector('.total-slides');

        this.noteElement = this.descContainer?.querySelector('#current-note');
        this.dateElement = this.descContainer?.querySelector('#current-date');
        this.pixelCountElement = this.descContainer?.querySelector('#current-pixel-count');

        this.controlsTop = this.container.querySelector('.slider-controls-top');
        this.scrollDirection = 'forward';
        this.autoScrollInterval = null;

        this.init();
        this.setupManualControls();
    }

    init() {
        if (this.counterTotal) this.counterTotal.textContent = this.slides.length;

        const nextBtn = this.container.querySelector('.next-button');
        const prevBtn = this.container.querySelector('.prev-button');

        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());

        if (this.dotsCont) {
            this.dotsCont.innerHTML = '';
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                this.dotsCont.appendChild(dot);
                dot.addEventListener('click', () => this.goToSlide(index));
            });
            this.dots = this.dotsCont.querySelectorAll('.dot');
        }

        document.addEventListener('keydown', (e) => {
            const activeProject = document.querySelector('.project.active');
            if (activeProject === this.container.closest('.project')) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });

        this.goToSlide(0);
    }

    goToSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');

        if (this.counterCurrent) this.counterCurrent.textContent = index + 1;
        if (this.dots) {
            this.dots.forEach(dot => dot.classList.remove('active'));
            this.dots[index].classList.add('active');
        }

        const note = this.slides[index].dataset.note;
        const date = this.slides[index].dataset.date;
        const pixelcount = this.slides[index].dataset.pixelcount;

        if (this.noteElement) this.noteElement.textContent = note || "—";
        if (this.dateElement) this.dateElement.textContent = date || "—";
        if (this.pixelCountElement) this.pixelCountElement.textContent = pixelcount ? "~" + pixelcount : "—";

        this.currentIndex = index;
    }

    nextSlide() {
        if (this.currentIndex >= this.slides.length - 1) this.goToSlide(0);
        else this.goToSlide(this.currentIndex + 1);
    }

    prevSlide() {
        if (this.currentIndex <= 0) this.goToSlide(this.slides.length - 1);
        else this.goToSlide(this.currentIndex - 1);
    }

    setupManualControls() {
        if (!this.controlsTop) return;

        this.controlsTop.querySelectorAll('[data-delay]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.controlsTop.querySelectorAll('[data-delay]').forEach(btn => btn.classList.remove('active'))
                const val = btn.getAttribute('data-delay');
                if (val === 'off') this.stopAutoScroll();
                else this.setAutoScroll(parseFloat(val));
                btn.classList.add('active');
            });
        });

        const dirToggle = this.controlsTop.querySelector('.direction-toggle');
        if (dirToggle) {
            dirToggle.addEventListener('click', () => {
                this.scrollDirection = this.scrollDirection === 'forward' ? 'backward' : 'forward';
                dirToggle.textContent = this.scrollDirection === 'forward' ? '→' : '←';
            });
        }
    }

    setAutoScroll(delaySeconds) {
        this.stopAutoScroll();
        this.autoScrollInterval = setInterval(() => {
            if (this.scrollDirection === 'forward') this.nextSlide();
            else this.prevSlide();
        }, delaySeconds * 1000);
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) clearInterval(this.autoScrollInterval);
        this.autoScrollInterval = null;
    }
}

class ProjectManager {
    constructor() {
        this.sliders = new Map();
        this.contributorManagers = new Map();
        this.currentProject = null;
        this.init();
    }

    init() {
        document.querySelectorAll('.project').forEach(project => {
            if (project.querySelectorAll('.slide').length > 0) {
                const slider = new Slider(project);
                this.sliders.set(project.dataset.project, slider);
            }

            if (project.querySelector('.contributor-box')) {
                const contributorManager = new ContributorManager(project);
                this.contributorManagers.set(project.dataset.project, contributorManager);
            }
        });

        document.querySelectorAll('.project-button').forEach(btn => {
            btn.addEventListener('click', () => this.showProject(btn.dataset.showProject));
        });
    }

    showProject(projectId) {
        document.querySelectorAll('.project').forEach(project => project.classList.remove('active'));
        const project = document.querySelector(`[data-project="${projectId}"]`);
        if (project) this.currentProject = projectId;
        project?.classList.add('active');
    }
}

class ContributorManager {
    constructor(projectContainer) {
        this.projectContainer = projectContainer;
        this.contributorsContainer = projectContainer.querySelector('.contributor-box');
        this.contributors = this.getContributorsForProject(projectContainer.dataset.project);
        this.eliteContributors = this.getEliteContributorsForProject(projectContainer.dataset.project);
        this.init();
    }

    getContributorsForProject(projectId) {
        const contributorsByProject = {
            'huge-firey': [
                "Simurated",
                "Frenkizaba1",
                "Awsomazing_neil",
                "theonlylizard",
                "PizzaGuy25_a",
                "Sam_Studios",
                "clampity",
                "Fananan",
                "cometztarz",
                "b100rulez",
                "justhanniehere",
                "brightcarp",
                "FernieLeaflen",
                "Legitbeatle",
                "995qa",
                "Amireal71",
                "One",
                "soapdoggie",
                "parfaitheart",
                "SonicFan510",
                "fbghjopy",
                "CoffiCreame",
                "floppedtacos",
                "Billbillson",
                "MagikalTwinkle",
                "JMReg0811",
                "MrPoker",
                "PinkPouDuck",
                "NuggetGgamer",
                "APersonThatIsMe",
                "coolbear11",
                "BLUSPRX",
                "KaiDaJai",
                "Reid",
                "Ajibounce",
                "L0v33rx",
                "Ender",
                "zushyart"
            ],
            'default': [
                ""
            ]
        };
        
        return contributorsByProject[projectId] || contributorsByProject.default;
    }

    getEliteContributorsForProject(projectId) {
        const contributorsByProject = {
            'huge-firey': [
                "Reviksedy",
                "BlueStevie64",
                "Nythic",
                "Matheuspixel",
                "akaSandwich",
                "AiryAiryAiry",
                "Fifi",
                "AnalyticalTomato"
            ],
            'default': [
                ""
            ]
        };

        return contributorsByProject[projectId] || contributorsByProject.default;
    }

    init() {
        this.shuffleContributors();
        this.shuffleEliteContributors();
        this.renderAllContributors();
    }

    shuffleContributors() {
        for (let i = this.contributors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.contributors[i], this.contributors[j]] = [this.contributors[j], this.contributors[i]];
        }
    }

    shuffleEliteContributors() {
        for (let i = this.eliteContributors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.eliteContributors[i], this.eliteContributors[j]] = [this.eliteContributors[j], this.eliteContributors[i]];
        }
    }

    renderAllContributors() {
        if (!this.contributorsContainer) return;
        this.contributorsContainer.innerHTML = '';

        this.eliteContributors.forEach(name => {
            const div = document.createElement('div');
            div.className = 'elite-contributor';
            div.textContent = name;
            this.contributorsContainer.appendChild(div);
        });

        this.contributors.forEach(name => {
            const div = document.createElement('div');
            div.className = 'contributor';
            div.textContent = name;
            this.contributorsContainer.appendChild(div);
        });

        this.centerSingleItemsInRows();
    }

    centerSingleItemsInRows() {
        const items = this.contributorsContainer.querySelectorAll('.contributor, .elite-contributor');
        const itemsPerRow = window.innerWidth > 600 ? 3 : (window.innerWidth > 400 ? 2 : 1);
        if (itemsPerRow === 1) return;

        const fullRows = Math.floor(items.length / itemsPerRow);
        const lastRowCount = items.length % itemsPerRow;

        if (lastRowCount === 1) {
            const lastIndex = fullRows * itemsPerRow;
            items[lastIndex].style.gridColumn = `2 / span 1`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});