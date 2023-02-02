'use strict';

import * as cookie from './cookie.js';

window.onload = async () => {
    addPlayers();
};

/*spelers inladen*/
function addPlayers() {
    const votingContainer = document.querySelector('#voting-system');
    cookie.setCookie('lobby_ic', 'GNHNTR');
    console.log(document.cookie);
    const lobby_ic = cookie.getCookie('lobby_ic');
    fetch(`https://iotai-backend.onrender.com/lobby/${lobby_ic}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((lobby) => {
            lobby.players.forEach((player) => {
                votingContainer.innerHTML += `
            <div class="votingContainer">
            <p>${player.name}</p>
            <div class="av-vote">
            <img id="avatar-img" src="../assets/avatars/avatar-${player.avatar}.png">
            <button class="btn-vote button-green" id="btn1">Vote</button>
            </div>
            </div>
            `;
            });
        });
}

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
var count = 30;
var redirect = setInterval(function () {
    document.getElementById('countdown').innerHTML = count;
    count--;
    if (count <= 0) {
        endMeeting();
        clearInterval(redirect);
        window.location = '#'; //redirect to animation page or back to the game
    }
}, 1000);

async function endMeeting() {
    fetch(`https://iotai-backend.onrender.com/lobby/${lobby_ic}/end-meeting`)
        .then((res) => res.json())
        .then((data) => {
            console.log('meeting ended');
            /*const progress = document.querySelector('#progress');
            progress.style.width = `${data.progress}%`;*/
        });
}
