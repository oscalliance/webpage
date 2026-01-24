// cleanest jank
const headers = document.querySelectorAll('.project-page-header');
headers.forEach(header => { header.querySelector('.header-spacer').textContent = header.querySelector('button').textContent; })