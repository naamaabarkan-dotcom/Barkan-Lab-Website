
document.addEventListener('DOMContentLoaded', async function () {
    await loadSharedHeader();
    await loadSharedFooter();
    setActiveNavLink();
    loadComments();
});


function loadSharedHeader() {
    var placeForHeader = document.getElementById('shared-header');
    if (!placeForHeader) {
        return Promise.resolve();
    }

    return fetch('header.html')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Header load failed');
            }
            return response.text();
        })
        .then(function (html) {
            placeForHeader.innerHTML = html;
        });
}
function loadSharedFooter() {
    var placeForFooter = document.getElementById('shared-footer');
    if (!placeForFooter) {
        return Promise.resolve();
    }

    return fetch('footer.html')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('footer load failed');
            }
            return response.text();
        })
        .then(function (html) {
            placeForFooter.innerHTML = html;
        });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav a');

    links.forEach(function (link) {
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

function loadComments() {
    const commentSection = document.getElementById('comment-section');

    if (!commentSection) {
        return;
    }

    fetch('/api/comment')
        .then(function (response) {
            return response.text();
        })
        .then(function (comment) {
            commentSection.value = comment;
            commentSection.scrollTop = commentSection.scrollHeight;
        })
        .catch(function () {
            commentSection.value = 'Could not load comments';
        });
}
