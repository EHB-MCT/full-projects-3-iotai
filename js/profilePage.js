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
    renderName();
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
            method: 'GET'
        })
        .then((res) => res.json())
        .then((player) => {
            console.log(player);
            document.querySelector('#avatar').src = `../assets/avatars/avatar-${player[0].avatar}.png`;
            nameField.textContent = `${player[0].name}`;
        });
}