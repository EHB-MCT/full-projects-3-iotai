window.onload = (event) => {
    const images = ['../assets/death-animation/Trex-Closed.png', '../assets/death-animation/Trex-Open.png'];
    let i = 0;

    setInterval(function () {
        document.getElementById('myImage').src = images[i];
        i = (i + 1) % images.length;
    }, 400);
};

function EjectPlayer() {}