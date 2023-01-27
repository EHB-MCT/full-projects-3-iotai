'use strict';

import * as cookie from './cookie.js';
import { renderSocials } from './footer.js';
import { renderHeader } from './header.js';

window.onload = () => {
    renderSocials();
    init();
};

function init() {
    const loginBTN = document.querySelector('#login');
    loginBTN.addEventListener('click', (e) => {
        e.preventDefault();
        const nameOrEmail = document.querySelector('#input-nameOrEmail').value;
        const password = document.querySelector('#input-password').value;
        console.log(nameOrEmail, password);
        logIn([nameOrEmail, password]);
    });
}

function logIn(creds) {
    const data = {
        name: creds[0],
        email: creds[0],
        password: creds[1],
    };
    fetch('https://iotai-backend.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status == 400) return alert(`Error ${data.status}: ${data.message}`);
            // Store player name and id in cookie
            const timeUntillCookieExpiresInSeconds = 60 * 60 * 24 * 7; // Set to expire in 1 week
            cookie.setCookie('player_id', `${data.id}`, { 'max-age': timeUntillCookieExpiresInSeconds });
            cookie.setCookie('player_name', `${data.name}`, { 'max-age': timeUntillCookieExpiresInSeconds });
            window.location = `${window.location.origin}/html/join.html`;
        });
}
