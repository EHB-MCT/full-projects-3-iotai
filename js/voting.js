'use strict';

import * as cookie from './cookie.js';

window.onload = async () => {
    await addPlayers();
    initVoteButton();
};

/*spelers inladen*/
async function addPlayers() {
    const votingContainer = document.querySelector('#voting-system');
    cookie.setCookie('lobby_ic', 'GNHNTR');
    console.log(document.cookie);
    const lobby_ic = cookie.getCookie('lobby_ic');
    await fetch(`https://iotai-backend.onrender.com/lobby/${lobby_ic}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((lobby) => {
            lobby.players.forEach((player, index) => {
                votingContainer.innerHTML += `
            <div class="votingContainer">
            <p>${player.name}</p>
            <div class="av-vote">
            <img id="avatar-img" src="../assets/avatars/avatar-${player.avatar}.png">
            <button class="btn-vote button-green" id="btn${index}">Vote</button>
            </div>
            </div>
            `;
            });
        });
}

async function initVoteButton() {
    /*pressing vote button*/
    const voteBTNs = document.querySelectorAll('.btn-vote');
    const skipVoteBTN = document.querySelector('#btn-skip-vote');
    let hasVoted = false;

    voteBTNs.forEach((button) => {
        button.addEventListener('click', () => {
            if (hasVoted == true) return;
            button.innerHTML = 'Voted';
            // vote fetch api
            button.classList.add('button-yellow');

            // Update has voted state
            hasVoted = true;
        });
    });
    skipVoteBTN.addEventListener('click', () => {
        if (hasVoted == true) return;
        skipVoteBTN.innerHTML = 'Skipped vote';
        // vote skip fetch api
        skipVoteBTN.classList.add('button-yellow');

        // Update has voted state
        hasVoted = true;
    });
}

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
    const lobby_ic = cookie.getCookie('lobby_invite_code');
    fetch(`https://iotai-backend.onrender.com/lobby/${lobby_ic}/end-meeting`)
        .then((res) => res.json())
        .then(() => {
            console.log('meeting ended');
            /*const progress = document.querySelector('#progress');
            progress.style.width = `${data.progress}%`;*/
        });
}