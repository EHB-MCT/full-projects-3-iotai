window.onload = (event) => {
    const images = ['../assets/death-animation/Trex-Closed.png', '../assets/death-animation/Trex-Open.png'];
    let i = 0;

    setInterval(function () {
        document.getElementById('myImage').src = images[i];
        i = (i + 1) % images.length;
    }, 400);
};

backToGame();

function backToGame() {
    //Back to game screen after 5 sec
    setTimeout(() => {
        window.location.href = '../html/game.html';
    }, 5000);
}

function EjectPlayer() {}
