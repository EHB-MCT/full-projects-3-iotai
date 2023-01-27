'use strict';

renderInfoIcon();

function renderInfoIcon() {
    const infoElement = document.createElement('img');
    infoElement.src = '../assets/icons/info-circle.png';
    infoElement.style.position = 'absolute';
    infoElement.style.top = '5px';
    infoElement.style.right = '10px';

    document.body.prepend(infoElement);
}
