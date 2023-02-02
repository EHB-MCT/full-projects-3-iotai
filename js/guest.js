'use strict';

import * as cookie from './cookie.js';
import { renderSocials } from './footer.js';
import { renderHeader } from './header.js';

window.onload = () => {
    renderSocials();
    init();
};

function init() {
    const eventList = ['click'];
    for (let evt of eventList) {
        document.querySelector('#submit').addEventListener(evt, () => {
            const name = document.querySelector('#input-name').value;
            if (name == undefined || name == '') return alert('Name can not be empty');
            fetch(`https://iotai-backend.onrender.com/guest/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == 400) return alert(`Error ${data.status}: ${data.message}`);
                    if (data.status == 200) {
                        const timeUntillCookieExpiresInSeconds = 60 * 60 * 24; // Set to 1 day
                        console.log(data);
                        cookie.setCookie('player_id', `${data.player.id}`, { 'max-age': timeUntillCookieExpiresInSeconds });
                        cookie.setCookie('player_name', `${data.player.name}`, { 'max-age': timeUntillCookieExpiresInSeconds });
                        window.location = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/join.html';
                    }
                });
        });
    }
}
