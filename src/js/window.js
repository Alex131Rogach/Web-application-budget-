function modaleWindow() {
    const buttonsHeader = document.querySelectorAll('.header__items button'),
          modalWindow = document.querySelector('.modalWindow'),
          modalWindowClose = modalWindow.querySelector('.modalWindow__close'),
          modalWindowWindow = modalWindow.querySelector('.modalWindow__window'),
          body = document.querySelector('body');

    buttonsHeader.forEach(item => {
        item.addEventListener('click', (e) => {

            if (item.classList.contains('enter')) {
                console.log('enter');
            } else {
                showWindow();
            }
        });
    });

    function showWindow() {
        let pos = 0, view = 0;
            body.style.overflow = 'hidden';
            modalWindow.style.display = 'flex';
            showRegWindow();
        function showRegWindow() {
            pos += 1;
            view += 2;
            modalWindowWindow.style.top = pos + '%';
            modalWindowWindow.style.opacity = view + '%';
            if (pos < 50) {
                requestAnimationFrame(showRegWindow);
            }
        }
    }

    function closeModal() {
        document.addEventListener('keydown', (e) => {

            if (e.code === 'Escape') {
                modalWindow.style.display = 'none';
                body.style.overflow = 'scroll';
            }
        });

        modalWindowClose.addEventListener('click', (e) => {
            modalWindow.style.display = 'none';
        });

        modalWindow.addEventListener('click', (e) => {

            if (e.target === modalWindow) {
                modalWindow.style.display = 'none';
            }
        });
    }

    closeModal();
}

module.exports = modaleWindow;