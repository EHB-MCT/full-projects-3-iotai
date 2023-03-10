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
    const home = document.querySelector('#join-img');
    home.src = '../assets/nav/join-active.png';
    home.width = home.width * 1.5;
    home.height = home.height * 1.5;
}

async function init() {
    await renderName();
    initJoinLobby();
    const arrowLeft = document.querySelector('#arrow-left');
    const arrowRight = document.querySelector('#arrow-right');
    arrowLeft.addEventListener('click', () => {
        browseAvatars(-1);
    });
    arrowRight.addEventListener('click', () => {
        browseAvatars(1);
    });
}

function renderName() {
    const nameField = document.querySelector('#name');
    const playerId = cookie.getCookie('player_id');
    fetch(`https://iotai-backend.onrender.com/player/${playerId}`, {
        method: 'GET',
    })
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player_id: playerId,
            }),
        })
            .then((res) => res.json())
            .then(async (lobby) => {
                if (lobby.status == 400) return alert(lobby.message);
                const timeUntillCookieExpiresInSeconds = 60 * 60 * 3; // Set to 3hrs
                cookie.setCookie('lobby_ic', ic, {
                    'max-age': timeUntillCookieExpiresInSeconds,
                });
                window.location = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/lobby.html';
            });
    });
}

async function browseAvatars(direction) {
    const avatars = {
        green: [
            'agate-g',
            'baby-g',
            'desert-rose-g',
            'diamond-g',
            'diplodocus-g',
            'fossile-g',
            'heart-g',
            'pterosaur-g',
            'quartz-g',
            't-rex-g',
            'tree-g',
            'waterlily-g',
        ],
    };

    let currentAvatar = document.querySelector('#avatar').alt;
    let nextAvatar = '';
    const currentAvatarIndex = avatars.green.indexOf(currentAvatar);
    if (currentAvatarIndex == avatars.green.length - 1 && direction == 1) {
        nextAvatar = avatars.green[0];
    } else if (currentAvatarIndex == 0 && direction == -1) {
        nextAvatar = avatars.green[avatars.green.length - 1];
    } else if (direction == -1) {
        nextAvatar = avatars.green[currentAvatarIndex + direction];
    } else if (direction == 1) {
        nextAvatar = avatars.green[currentAvatarIndex + direction];
    }
    const avatarIMG = document.querySelector('#avatar');
    avatarIMG.setAttribute('src', `../assets/avatars/avatar-${nextAvatar}.png`);
    avatarIMG.setAttribute('alt', nextAvatar);
    console.log(nextAvatar);
    await fetch('https://iotai-backend.onrender.com/player/avatar/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            player_id: cookie.getCookie('player_id'),
            avatar: nextAvatar,
        }),
    });
}

export { renderName, browseAvatars };
