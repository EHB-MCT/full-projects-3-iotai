'use strict';

import * as cookie from './cookie.js';

window.onload = () => {
    renderCountdown();
    renderRole();
};

async function renderRole() {
    const roleTitle = document.querySelector('#role-title');
    const roleDescription = document.querySelector('#role-description');

    // Retrieve data from cookies
    const player_id = cookie.getCookie('player_id');
    const lobby_id = cookie.getCookie('lobby_id');
    await fetch(`https://iotai-backend.onrender.com/role/${lobby_id}/${player_id}`)
        .then((res) => res.json())
        .then((role) => {
            if (role[0].id == 2) {
                roleTitle.classList.add('red');
                roleTitle.classList.add('glow_red');
            } else if (role[0].id == 1) {
                roleTitle.classList.add('green');
                roleTitle.classList.add('glow_blue');
            }
            roleTitle.textContent = `YOU ARE A ${role[0].name}`;
            roleDescription.textContent = role[0].description;
            cookie.setCookie('role', role[0].name);
        });
}

function renderCountdown() {
    const countdownElement = document.querySelector('#countdown');
    // Create date that is 10 seconds ahead of "now"
    const countdownDate = new Date(new Date().getTime() + 12000).getTime();
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownElement.textContent = `Starting game in: ${seconds}`;

        if (distance <= 0) {
            clearInterval(countdown);
            countdownElement.textContent = 'Game starting...';
            window.location = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/game.html';
        }
    }, 1000);
}
