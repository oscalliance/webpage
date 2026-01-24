const buttons = document.querySelectorAll('.page-switching-button');
const pages = document.querySelectorAll('.page');

function showPage(pageId) {
    let activeSection = null;

    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
            activeSection = page.id.substring(0, page.id.indexOf("/")) || page.id;
        }
    });

    buttons.forEach(btn => {
        if (btn.classList.contains('header-button')) {
            let section = btn.dataset.target.substring(0, btn.dataset.target.indexOf("/")) || btn.dataset.target;
            btn.style.backgroundColor =
                section === activeSection
                    ? 'var(--background-light)'
                    : 'transparent';
        }
    });

    location.hash = pageId;
    syncContributorsHeight();
    window.scrollTo({ top: 0, behavior: 'instant' });
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        showPage(btn.dataset.target);
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        showPage('projects/' + card.dataset.project);
    });
});

window.addEventListener('hashchange', () => {
    const pageId = location.hash.slice(1);
    if (document.getElementById(pageId)) {
        showPage(pageId);
    }
    else {
        showPage('about');
    }
});

showPage(location.hash.slice(1) || 'about');

function syncContributorsHeight() { /* jank alert! */
    document.querySelectorAll('.project-page-extras-container').forEach(container => {
        const history = container.querySelector('.project-page-history-container');
        const contributors = container.querySelector('.project-page-contributors-container');

        if (history && contributors) {
            contributors.style.height = `${history.offsetHeight}px`;
        }
    });
}

window.addEventListener('load', syncContributorsHeight);
window.addEventListener('resize', syncContributorsHeight);


window.onload = function () {
  window.scrollTo({ top: 0, behavior: 'instant' });
}