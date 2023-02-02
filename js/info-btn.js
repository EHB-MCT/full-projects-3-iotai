'use strict';

renderInfoIcon();

function renderInfoIcon() {
    const infoElement = document.createElement('img');
    infoElement.src = '../assets/icons/info-circle.png';
    infoElement.style.position = 'absolute';
    infoElement.style.top = '10px';
    infoElement.style.right = '10px';
    infoElement.onclick = function () {
        window.location.href = 'rules.html';
    };

    document.body.prepend(infoElement);
}
