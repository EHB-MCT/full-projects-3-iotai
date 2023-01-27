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

    header.append(logoElement);
}

export { renderHeader };
