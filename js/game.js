//Make pop-up for Tasks

const popupBtns = document.querySelectorAll('.popupBtn');

popupBtns.forEach(function (btn) {
  btn.onclick = function () {
    const popup = document.createElement('div');
    const taskId = btn.getAttribute('data-task-id');
    console.log(taskId);
    popup.innerHTML = `
    <div id="popup" style="display: block">
    <div class="popup-content">
        <img class="close" src="/assets/icons/cross-icon.png" height="30px" />
        <p class="task-text">Vraag</p>
        <button class="popup-button glow_blue green">Submit</button>
    </div>
    </div>
    `;
    document.body.appendChild(popup);

    const close = popup.getElementsByClassName('close')[0];
    close.onclick = function () {
      popup.style.display = 'none';
      popup.remove();
    };
  };
});



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