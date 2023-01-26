'use strict';

renderHeader();

function renderHeader() {
    const logoElement = document.createElement('img');
    logoElement.src = '../assets/evologo.png';
    logoElement.alt = 'EvoMission Logo';
    logoElement.style.height = '100%';
    logoElement.style.display = 'block';
    logoElement.style.margin = 'auto';

    const header = document.createElement('header');
    header.style.marginTop = '10px';
    header.style.position = 'relative';
    header.style.height = '20vh';

    document.body.prepend(header);

    const infoElement = document.createElement('img');
    infoElement.src = '../assets/icons/info-circle.png';
    infoElement.style.position = 'absolute';
    infoElement.style.top = '5px';
    infoElement.style.right = '10px';

    header.append(logoElement, infoElement);
}
