'use strict';

import * as cookie from './cookie.js';

import { renderNav} from './footer.js';
import { renderHeader } from './header.js';

window.onload = async () => {
    renderNav();
    makeLeaderboardActive();
    renderLeaderboard();
};

function makeLeaderboardActive() {
    const profile = document.querySelector('#leaderboard-img');
    profile.src = '../assets/nav/leaderboard-active.png';
    profile.width = profile.width * 1.5;
    profile.height = profile.height * 1.5;
}

function renderLeaderboard() {
    const query = "SELECT * FROM players ORDER BY wins DESC LIMIT 1";
    fetch(`https://iotai-backend.onrender.com/players?query=${query}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.sort((a, b) => b.wins - a.wins);
            console.log(data);
            let players = [];
            data.forEach(record => {
              players.push({
                name: record.name,
                wins: record.wins
              });
            });
            console.log(players);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
}