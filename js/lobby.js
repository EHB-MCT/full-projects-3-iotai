'use strict';

import * as cookie from './cookie.js';

window.onload = () => {
    renderLobby();
    checkIfLobbyHasStarted();
};

setInterval(() => {
    checkIfLobbyHasStarted();
    renderLobby();
}, 2000);

async function checkIfLobbyHasStarted() {
    const ic = cookie.getCookie('lobby_invite_code');
    await fetch(`https://iotai-backend.onrender.com/lobby/${ic}`)
        .then((res) => res.json())
        .then((lobby) => {
            // redirect if started
            if (lobby.started) window.location = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/role.html';
        });
}

function renderLobby() {
    const prompt = document.querySelector('#prompt');
    const playersDiv = document.querySelector('#players');

    const ic = cookie.getCookie('lobby_invite_code');
    fetch(`https://iotai-backend.onrender.com/lobby/${ic}`)
        .then((res) => res.json())
        .then((lobby) => {
            cookie.setCookie('lobby_id', lobby.id, { 'max-age': 60 * 60 * 3 });
            prompt.textContent = `Waiting for players... ${lobby.player_count}/${lobby.player_limit}`;

            lobby.players.forEach((player) => {
                playersDiv.innerHTML += `
                <div class="player">
                    <img src="../assets/avatars/avatar-${player.avatar}.png" alt="${player.avatar}" width="100" height="100"></img>
                    <p class="subtitles" id="${player.name}${player.players_id}">${player.name}</p>
                </div>
                `;
            });
        });
}
