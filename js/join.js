'use strict';

window.onload = () => {
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
    const name = document.querySelector('#name');
    fetch('https://iotai-backend.onrender.com/player/1', { method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
            name.textContent = data[0].name;
        });
}

function initJoinLobby() {
    const button = document.querySelector('#join-lobby');
    button.addEventListener('click', () => {
        const ic = document.querySelector('#game_pin').value;

        if (!ic) return alert('No invite code');
        fetch(`https://iotai-backend.onrender.com/lobby/${ic}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player_id: 1 }),
        })
            .then((res) => res.json())
            .then(() => {
                window.location = `${window.location.origin}/html/lobby.html`;
            });
    });
}
