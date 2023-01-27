'use strict';

import { renderNav} from './footer.js';

window.onload = async () => {
    renderNav();
    makeProfileActive();
};

function makeProfileActive() {
    const profile = document.querySelector('#profile-img');
    profile.src = '../assets/nav/profile-active.png';
    profile.width = profile.width * 1.5;
    profile.height = profile.height * 1.5;
}