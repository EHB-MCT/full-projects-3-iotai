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
            <p class="task-text" id="task-text">${task.description}</p>
            <img class="task-image" id="task-image" src=/assets/tasks/${task.img}>
            <div class="form">
                <div class="input">
                    <input required type="text" name="text" autocomplete="off" placeholder="Answer" class="input" id="answerInput" />
                </div>
                <div class="buttons">
                    <button class="popup-button glow_blue green" id="submit-answer-button">Submit</button>
                </div>
            </div>
        </div>
        </div>
        `;
        document.body.appendChild(popup);

        const submitAnswerButton = document.getElementById('submit-answer-button');
        submitAnswerButton.onclick = function () {
            const answerInput = document.getElementById('answerInput');
            const answer = answerInput.value;
            const taskText = document.getElementById('task-text');
            if (answer.toLowerCase() === task.answer.toLowerCase()) {
            taskText.innerHTML = 'Task completed!';
            setTimeout(() => {
                popup.remove();
              }, "2000")
            } else {
            taskText.innerHTML = 'Wrong answer! Try again';

            }
        };

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