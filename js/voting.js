'use strict';

const buttons = document.querySelectorAll('.btn-vote');

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        buttons.forEach((b) => {
            b.classList.remove('button-yellow');
            if (b.id === 'btn-vote') {
                b.innerHTML = 'Vote skip';
            } else {
                b.innerHTML = 'Vote';
            }
        });
        this.classList.add('button-yellow');
        if (this.id === 'btn-vote') {
            this.innerHTML = 'Voted skip';
        } else {
            this.innerHTML = 'Voted';
        }
    });
});
