'use strict';

import * as cookie from './cookie.js';

function isPlayerAlive(player_id, lobby_id) {
    return fetch(`https://iotai-backend.onrender.com/player/${player_id}/lobby/${lobby_id}`).then((res) => res.json());
}

window.onload = async () => {
    await renderPlayers();
    initVoteButton();
    renderVoteCount();
    if (cookie.getCookie('voted_on')) {
        renderVotedOn();
    }
};

setInterval(() => {
    renderVoteCount();
}, 1000);

function renderVotedOn() {
    const votedOn = cookie.getCookie('voted_on');
    const voteBtn = document.getElementById(votedOn);
    voteBtn.textContent = 'Voted';
    voteBtn.classList.add('button-yellow');
}

/*spelers inladen*/
async function renderPlayers() {
    const votingContainer = document.querySelector('#voting-system');
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
            lobby.players.forEach(async (player, index) => {
                console.log(player);
                if ((await isPlayerAlive(player.players_id, cookie.getCookie('lobby_id'))) == false) {
                    votingContainer.innerHTML += `
            <div class="votingContainer ejected">
            <p>${player.name}</p>
            <div class="av-vote">
            <img id="avatar-img" src="../assets/avatars/avatar-${player.avatar}.png">
            <button class="btn-no-vote button-red" id="${player.players_id}">Vote</button>
            </div>
            </div>
            `;
                } else
                    votingContainer.innerHTML += `
            <div class="votingContainer">
            <p>${player.name}</p>
            <div class="av-vote">
            <img id="avatar-img" src="../assets/avatars/avatar-${player.avatar}.png">
            <button class="btn-vote button-green" id="${player.players_id}">Vote</button>
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

    if ((await isPlayerAlive()) == false) return;
    voteBTNs.forEach((button) => {
        button.addEventListener('click', () => {
            if (cookie.getCookie('voted_on')) return;
            button.innerHTML = 'Voted';
            // vote fetch api
            fetch(`https://iotai-backend.onrender.com/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ voter_id: cookie.getCookie('player_id'), voted_id: button.id, lobby_ic: cookie.getCookie('lobby_ic') }),
            })
                .then((res) => res.json())
                .then(() => {
                    // store in cookie so u cant revote on page refresh
                    cookie.setCookie('voted_on', button.id);
                });
            button.classList.add('button-yellow');
            renderVoteCount();
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

let count = 600;
async function renderVoteCount() {
    const lobby_ic = cookie.getCookie('lobby_ic');
    let playerCount = 0;
    let voteCount = 0;
    await fetch(`https://iotai-backend.onrender.com/lobby/${cookie.getCookie('lobby_id')}/players-alive`)
        .then((res) => res.json())
        .then((data) => {
            playerCount = data.length;
        });
    await fetch(`https://iotai-backend.onrender.com/votes/${lobby_ic}/count`)
        .then((res) => res.json())
        .then((data) => {
            voteCount = data.voteCount;
        });
    document.getElementById('vote-amount').textContent = `${voteCount}/${playerCount}`;

    document.getElementById('countdown').innerHTML = count;
    count--;
    if (count <= 0 || voteCount == playerCount) {
        endMeeting();
        if (!cookie.getCookie('voted_on')) window.location.href = '../html/game.html';
        ejectPlayer();
    }
}

async function ejectPlayer() {
    // find player with most votes
    await fetch(`https://iotai-backend.onrender.com/most-voted-player/${cookie.getCookie('lobby_ic')}`)
        .then((res) => res.json())
        .then((data) => {
            // store in cookie
            cookie.setCookie('ejected_player_id', data.player.id);
            cookie.setCookie('ejected_player_votes', data.votes);
        });

    // redirect
    // window.location.href = '../html/death-animation.html'; //redirect to animation page
}

async function endMeeting() {
    const lobby_ic = cookie.getCookie('lobby_ic');
    fetch(`https://iotai-backend.onrender.com/lobby/${lobby_ic}/end-meeting`, { method: 'POST' });
}
