import * as cookie from './cookie.js';

window.onload = () => {
    renderEjectedPlayer();
    renderAnimation();
};

function renderAnimation() {
    const images = ['../assets/death-animation/Trex-Closed.png', '../assets/death-animation/Trex-Open.png'];
    let i = 0;

    setInterval(function () {
        document.getElementById('myImage').src = images[i];
        i = (i + 1) % images.length;
    }, 400);
}

function renderEjectedPlayer() {
    const p = document.querySelector('#ejection');
    fetch(`https://iotai-backend.onrender.com/player/${cookie.getCookie('ejected_player_id')}`)
        .then((res) => res.json())
        .then((data) => {
            p.textContent = `${data[0].name} has been ejected (${cookie.getCookie('ejected_player_votes')} votes)`;
            ejectPlayer();
        });
}

function ejectPlayer() {
    fetch(`https://iotai-backend.onrender.com/player/eject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_id: cookie.getCookie('ejected_player_id'), lobby_invite_code: cookie.getCookie('lobby_ic') }),
    })
        .then((res) => res.json())
        .then((data) => {
            setTimeout(() => {
                window.location.href = '../html/game.html';
            }, 5000);
        });
    // Delete cookie
    cookie.deleteCookie('ejected_player');
    cookie.deleteCookie('ejected_player_id');
    cookie.deleteCookie('ejected_player_votes');
    cookie.deleteCookie('voted_on');
}
