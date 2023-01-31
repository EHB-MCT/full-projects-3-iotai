'use strict';

import * as cookie from './cookie.js';

import { renderNav} from './footer.js';
import { renderHeader } from './header.js';

window.onload = async () => {
    renderNav();
    makeLeaderboardActive();
};

function makeLeaderboardActive() {
    const profile = document.querySelector('#leaderboard-img');
    profile.src = '../assets/nav/leaderboard-active.png';
    profile.width = profile.width * 1.5;
    profile.height = profile.height * 1.5;
}

function renderLeaderboard() {
    const query = 'SELECT * FROM players ORDER BY wins DESC LIMIT 10';
    fetch(`https://iotai-backend.onrender.com/player/${playerId}`, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((player) => {

        });
}