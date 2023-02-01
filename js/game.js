//Make pop-up for Tasks

const popupBtns = document.querySelectorAll('.popupBtn');

popupBtns.forEach(function (btn) {
  btn.onclick = function () {
    const taskId = btn.getAttribute('data-task-id');
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.display = 'block';

    // Call the API to retrieve the task description
    fetch(`https://iotai-backend.onrender.com/tasks`)
      .then(response => response.json())
      .then(tasks => {
        const task = tasks.find(t => t.id === Number(taskId));
        popup.innerHTML = `
        <div id="popup" style="display: block">
        <div class="popup-content">
            <img class="close" src="/assets/icons/cross-icon.png" height="30px" />
            <p class="task-text">${task.description}</p>
            <img class="task-image" src=/assets/tasks/mosasaurus.jpg>
            <button class="popup-button glow_blue green">Submit</button>
        </div>
        </div>
        `;
        document.body.appendChild(popup);

        const close = popup.getElementsByClassName('close')[0];
        close.onclick = function () {
          popup.remove();
        };
      });
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