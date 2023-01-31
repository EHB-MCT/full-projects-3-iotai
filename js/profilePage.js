'use strict';

import * as cookie from './cookie.js';

import { renderNav} from './footer.js';
import { browseAvatars} from './join.js';
import { renderHeader } from './header.js';

window.onload = async () => {
    renderNav();
    init();
    makeProfileActive();
};

function makeProfileActive() {
    const profile = document.querySelector('#profile-img');
    profile.src = '../assets/nav/profile-active.png';
    profile.width = profile.width * 1.5;
    profile.height = profile.height * 1.5;
}

function init() {
    renderStats();
    const arrowLeft = document.querySelector('#arrow-left');
    const arrowRight = document.querySelector('#arrow-right');
    arrowLeft.addEventListener('click', () => {
        browseAvatars(-1);
    });
    arrowRight.addEventListener('click', () => {
        browseAvatars(1);
    });
}

function renderStats() {
    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#email');
    const winsField = document.querySelector('#wins');
    const playedGamesField = document.querySelector('#playedGames');
    const playerId = cookie.getCookie('player_id');
    fetch(`https://iotai-backend.onrender.com/player/${playerId}`, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((player) => {
            console.log(player);
            document.querySelector('#avatar').src = `../assets/avatars/avatar-${player[0].avatar}.png`;
            nameField.textContent = `${player[0].name}`;
            emailField.textContent = `${player[0].email}`;
            winsField.textContent = `${player[0].wins} games won`;
            playedGamesField.textContent = `${player[0].played_games} games played`;
        });
}