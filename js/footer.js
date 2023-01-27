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
}

function createImages(subdirectory, size, ...[images]) {
    let imageElements = [];
    images.forEach((image) => {
        const img = document.createElement('img');
        img.src = `../assets/${subdirectory}/${image}.png`;
        img.alt = image;
        img.id = `${image}-img`;
        img.width = size;
        img.height = size;
        imageElements.push(img);
    });
    return imageElements;
}

function renderNav() {
    const images = createImages('nav', 35, ['home', 'leaderboard', 'shop', 'profile']);
    const footer = document.querySelector('footer');
    images.forEach((image) => {
        footer.append(image);
    });
}

function renderSocials() {
    const images = createImages('socials', 60, ['iotai-icon-fb', 'iotai-icon-ig', 'iotai-icon-tt', 'iotai-icon-yt']);
    const footer = document.querySelector('footer');
    images.forEach((image) => {
        footer.append(image);
    });
}

export { renderNav, renderSocials };
