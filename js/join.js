'use strict';

window.onload = () => {
    makeHomeActive();
};

function makeHomeActive() {
    const home = document.querySelector('#home-img');
    console.log(home);
    home.src = '../assets/nav/home-active.png';
    home.width = home.width * 1.5;
    home.height = home.height * 1.5;
}
