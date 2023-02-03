'use strict';

import * as cookie from './cookie.js';

window.onload = () => {
    renderWinners();
};

function renderWinners() {
    fetch(`https://iotai-backend.onrender.com/lobby/${cookie.getCookie('lobby_ic')}/end-check`, { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
            const roleTitle = document.querySelector('#role-title');
            const playersDiv = document.querySelector('.players');
            roleTitle.textContent = `${data.role} WIN`;
            if (data.role == 'Scientists') {
                roleTitle.classList.add('green');
                roleTitle.classList.add('glow_blue');
            } else {
                roleTitle.classList.add('red');
                roleTitle.classList.add('glow_red');
            }
            console.log(data);
            data.winners.forEach((winner) => {
                console.log(winner);
                const div = document.createElement('div');
                div.classList.add('winner-wrapper');
                const img = document.createElement('img');
                img.src = `../assets/avatars/avatar-${winner.avatar}.png`;
                img.alt = winner.avatar;
                img.width = '64';
                img.height = '64';

                const p = document.createElement('p');
                p.textContent = winner.name;
                p.style.fontSize = '1rem';
                p.classList.add('subtitles');

                playersDiv.append(div);
                div.append(img);
                div.append(p);
            });
        });
}

setTimeout(() => {
    window.location.href = '../html/join.html';
}, 10000);
