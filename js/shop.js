'use strict';

import { renderNav } from './footer.js';
import { renderHeader } from './header.js';

window.onload = async () => {
    renderNav();
    makeShopActive();
};

function makeShopActive() {
    const profile = document.querySelector('#shop-img');
    profile.src = '../assets/nav/shop-active.png';
    profile.width = profile.width * 1.5;
    profile.height = profile.height * 1.5;
}
