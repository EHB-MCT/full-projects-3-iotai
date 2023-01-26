'use strict';

window.onload = () => {
    renderLobby();
    checkIfLobbyHasStarted();
};

setInterval(() => {
    checkIfLobbyHasStarted();
}, 5000);

async function checkIfLobbyHasStarted() {
    const ic = 'GNHNTR';
    await fetch(`https://iotai-backend.onrender.com/lobby/${ic}`)
        .then((res) => res.json())
        .then((lobby) => {
            // redirect if started
            if (lobby.started) window.location = `${window.location.origin}/html/role.html`;
        });
}

function renderLobby() {
    const prompt = document.querySelector('#prompt');
    const playersDiv = document.querySelector('#players');

    const ic = 'GNHNTR';
    fetch(`https://iotai-backend.onrender.com/lobby/${ic}`)
        .then((res) => res.json())
        .then((lobby) => {
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
