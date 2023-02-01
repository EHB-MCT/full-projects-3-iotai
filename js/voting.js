'use strict';

/*pressing vote button*/
const buttons = document.querySelectorAll('.btn-vote');

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        buttons.forEach((b) => {
            b.classList.remove('button-yellow');
            if (b.id == 'btn-vote') {
                b.innerHTML = 'Vote skip';
            } else {
                b.innerHTML = 'Vote';
            }
            voted();
        });
        this.classList.add('button-yellow');
        if (this.id == 'btn-vote') {
            this.innerHTML = 'Voted skip';
        } else {
            this.innerHTML = 'Voted';
        }
    });
});

/*show amount of votes*/
var votes = 0;
function voted() {
    document.getElementById('vote-amount').innerHTML = votes + 1;
}

/*Voting countdown*/
var count = 120;
var redirect = setInterval(function () {
    document.getElementById('countdown').innerHTML = count;
    count--;
    if (count <= 0) {
        clearInterval(redirect);
        window.location = '#'; //redirect to animation page or back to the game
    }
}, 1000);
