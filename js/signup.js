'use strict';

import * as cookie from './cookie.js';
import { renderHeader } from './header.js';

import { renderSocials } from './footer.js';

window.onload = () => {
    renderSocials();
    initCreatePlayer();
};

function initCreatePlayer() {
    const submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.querySelector('#input-name').value;
        const password = document.querySelector('#input-password').value;
        const email = document.querySelector('#input-email').value;
        fetch('https://iotai-backend.onrender.com/player/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
                email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) return alert(data.error);
                if (data.status == 200) {
                    // Store in cookie
                    const timeUntillCookieExpiresInSeconds = 60 * 60 * 24 * 7; // Set to expire in 1 week
                    cookie.setCookie('player_id', `${data.player.id}`, {
                        'max-age': timeUntillCookieExpiresInSeconds,
                    });
                    cookie.setCookie('player_name', `${data.player.name}`, {
                        'max-age': timeUntillCookieExpiresInSeconds,
                    });
                    window.location = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/join.html';
                }
            });
    });
}
