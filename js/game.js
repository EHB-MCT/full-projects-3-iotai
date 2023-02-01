//Tasks
const popupBtns = document.querySelectorAll('.popupBtn');
const popup = document.getElementById('popup');
const close = document.getElementsByClassName('close')[0];

//pop-up bij klikken
popupBtns.forEach(function (btn) {
btn.onclick = function () {
    popup.style.display = 'block';
};
});

//pop-up verdwijnt bij klikken op het kruisje
close.onclick = function () {
popup.style.display = 'none';
};



//Meeting button -> mag niet kunnen verdwijnen met kruisje

const meetingBtn = document.querySelector('.meeting-button');
const meetingPopup = document.getElementById('meetingPopup');

//pop-up bij klikken
meetingBtn.addEventListener('click', function () {
    console.log("clicked on meeting button");
    meetingPopup.style.display = 'block';

    //redirect to voting page after 10 seconds
    setTimeout(function () {
        window.location.href = '../html/voting.html';
    }, 10000);
});