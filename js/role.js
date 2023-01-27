'use strict';

import * as cookie from './cookie.js';

window.onload = () => {
    console.log(document.cookie);
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
            console.log(role);
            if (role[0].id == 2) roleTitle.classList.add('red');
            else if (role[0].id == 1) roleTitle.classList.add('green');
            roleTitle.textContent = `YOU ARE A ${role[0].name}`;
            roleDescription.textContent = role[0].description;
        });
}
