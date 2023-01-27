'use strict';

import * as cookie from './cookie.js';
import { renderNav, renderSocials } from './footer.js';
import { renderHeader } from './header.js';

window.onload = async () => {
    renderNav();
    init();
    makeHomeActive();
};

function makeHomeActive() {
    const home = document.querySelector('#home-img');
    home.src = '../assets/nav/home-active.png';
    home.width = home.width * 1.5;
    home.height = home.height * 1.5;
}

function init() {
    renderName();
    initJoinLobby();
}

function renderName() {
    const nameField = document.querySelector('#name');
    const playerId = cookie.getCookie('player_id');
    fetch(`https://iotai-backend.onrender.com/player/${playerId}`, { method: 'GET' })
        .then((res) => res.json())
        .then((player) => {
            document.querySelector('#avatar').src = `../assets/avatars/avatar-${player[0].avatar}.png`;
            nameField.textContent = `Hello ${player[0].name}!`;
        });
}

function initJoinLobby() {
    const button = document.querySelector('#join-lobby');
    button.addEventListener('click', () => {
        const ic = document.querySelector('#game_pin').value;
        const playerId = cookie.getCookie('player_id');

        if (!ic) return alert('No invite code');
        fetch(`https://iotai-backend.onrender.com/lobby/${ic}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player_id: playerId }),
        })
            .then((res) => res.json())
            .then((lobby) => {
                const timeUntillCookieExpiresInSeconds = 60 * 60 * 3; // Set to 3hrs
                cookie.setCookie('lobby_invite_code', ic, { 'max-age': timeUntillCookieExpiresInSeconds });
                window.location = `${window.location.origin}/html/lobby.html`;
            });
    });
}
