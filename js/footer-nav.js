'use strict';

renderFooter();

function renderFooter() {
    const footer = document.createElement('footer');
    footer.style.marginTop = '10px';
    footer.style.position = 'absolute';
    footer.style.bottom = '0px';
    footer.style.left = '0px';
    footer.style.display = 'flex';
    footer.style.justifyContent = 'space-around';
    footer.style.alignItems = 'center';
    footer.style.height = '15vh';
    footer.style.width = '100%';

    document.body.append(footer);

    const home = document.createElement('img');
    home.src = '../assets/nav/home.png';

    const images = createImages(['home', 'leaderboard', 'shop', 'profile']);
    images.forEach((image) => {
        footer.append(image);
    });
}

function createImages(...[images]) {
    let imageElements = [];
    images.forEach((image) => {
        const img = document.createElement('img');
        img.src = `../assets/nav/${image}.png`;
        img.alt = image;
        img.id = `${image}-img`;
        img.width = '35';
        img.height = '35';
        imageElements.push(img);
    });
    return imageElements;
}
