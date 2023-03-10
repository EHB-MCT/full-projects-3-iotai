'use strict';

import * as cookie from './cookie.js';

var meetingActive = false;

window.onload = async () => {
    initPopups();
    const role = cookie.getCookie('role');
    if (role == 'Scientist' || role == undefined || role == '') {
        renderEliminatedButton();
    }
    console.log(document.cookie);
    await renderTasks();
    renderTaskProgress();
    initPopups();
    checkForEndGame();
    renderMeetingButton();
};

// Keep checking task progress / meeting state / end game?
setInterval(() => {
    renderTaskProgress();
    checkForMeeting();
    checkForEndGame();
}, 1000);

async function renderEliminatedButton() {
    document.querySelector('#eliminated-id').innerHTML = `<div class="eliminated-button glow_red red" id="eliminated-btn">
    <img class="eliminated_icon" src="../assets/icons/eliminated-icon.png" alt="Eliminated" /> </div>`;
    const btn = document.getElementById('eliminated-id');
    // Make button clickable if alive
    if ((await isPlayerAlive()) == false) return;
    btn.addEventListener('click', () => {
        const confirmOverlay = document.querySelector('#confirmOverlay');
        const confirmYes = document.querySelector('#confirm-yes');
        const confirmNo = document.querySelector('#confirm-no');
        confirmOverlay.style.display = 'block';
        confirmYes.addEventListener('click', () => {
            fetch(`https://iotai-backend.onrender.com/player/eject`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ player_id: cookie.getCookie('player_id'), lobby_invite_code: cookie.getCookie('lobby_ic') }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    confirmOverlay.style.display = 'none';
                });
        });
        confirmNo.addEventListener('click', () => {
            confirmOverlay.style.display = 'none';
        });
    });
    btn.style.display = 'block';
}

async function checkForEndGame() {
    await fetch(`https://iotai-backend.onrender.com/lobby/${cookie.getCookie('lobby_ic')}/end-check`, { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
            if (data.ended == 1 || data.ended == true) {
                window.location.href = '../html/game_end.html';
            }
        });
}

async function renderTaskProgress() {
    fetch(`https://iotai-backend.onrender.com/tasks/progress/${cookie.getCookie('lobby_ic')}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.status == 400) return;
            const progress = document.querySelector('#progress');
            progress.style.width = `${data.progress}%`;
        });
}

async function renderTasks() {
    await fetch(`https://iotai-backend.onrender.com/tasks/player/all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            player_id: cookie.getCookie('player_id'),
            lobby_ic: cookie.getCookie('lobby_ic'),
            amount: 3,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            const tasks = data.tasks;
            const tasksDiv = document.querySelector('#tasks-wrapper');
            tasks.forEach((task, index) => {
                const div = document.createElement('div');
                div.id = `mission${index + 1}`;
                div.style.position = 'absolute';
                div.style.left = task.positionX;
                div.style.top = task.positionY;

                const btn = document.createElement('button');
                btn.classList.add('popupBtn');
                btn.dataset.taskId = task.id;

                const img = document.createElement('img');
                img.src = `../assets/icons/pin_${index + 1}.png`;
                img.alt = `mission ${index + 1}`;

                //
                div.append(btn);
                btn.append(img);
                tasksDiv.append(div);
            });
        });
}

async function initPopups() {
    const popupBtns = document.querySelectorAll('.popupBtn');
    popupBtns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            const taskId = btn.getAttribute('data-task-id');
            const popup = document.createElement('div');
            popup.id = 'popup';
            popup.style.display = 'block';
            document.getElementById('background-overlay').style.display = 'block';
            // Get TASK info
            fetch(`https://iotai-backend.onrender.com/task/${taskId}`)
                .then((res) => res.json())
                .then((task) => {
                    console.log(task);
                    popup.innerHTML = `
                    <div id="popup" style="display: block">
                    <div class="popup-content">
                        <img class="close" src="../assets/icons/cross-icon.png" height="30px" />
                        <p class="task-text" id="task-text">${task.description}</p>
                        <img class="task-image" id="task-image" src='../assets/tasks/${task.img}'>
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
                    submitAnswerButton.onclick = async function () {
                        const answerInput = document.getElementById('answerInput');
                        const answer = answerInput.value;
                        const taskText = document.getElementById('task-text');
                        if (answer.toLowerCase() === task.answer.toLowerCase()) {
                            taskText.style.color = '#00ffaf';
                            taskText.innerHTML = 'Task completed!';
                            // complete task in backend
                            await fetch(`https://iotai-backend.onrender.com/task/${task.id}/complete`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    player_id: cookie.getCookie('player_id'),
                                    lobby_invite_code: cookie.getCookie('lobby_ic'),
                                }),
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    setTimeout(() => {
                                        popup.remove();
                                        btn.style.display = 'none';
                                        document.getElementById('background-overlay').style.display = 'none';
                                    }, '2000');
                                });
                        } else {
                            taskText.style.color = '#ff5758';
                            taskText.innerHTML = 'Wrong answer! Try again';
                            setTimeout(() => {
                                taskText.style.color = 'white';
                                taskText.innerHTML = task.description;
                            }, '3000');
                        }
                    };

                    const close = popup.getElementsByClassName('close')[0];
                    close.onclick = function () {
                        popup.remove();
                        document.getElementById('background-overlay').style.display = 'none';
                    };
                });
        });
    });
}

async function renderMeetingButton() {
    //Meeting button -> mag niet kunnen verdwijnen met kruisje

    const meetingBtn = document.querySelector('.meeting-button');
    const meetingPopup = document.getElementById('meetingPopup');

    if ((await isPlayerAlive()) == false) return;
    //pop-up bij klikken op emergency button
    meetingBtn.addEventListener('click', function () {
        const ic = cookie.getCookie('lobby_ic');
        //Start meeting post method
        fetch(`https://iotai-backend.onrender.com/lobby/${ic}/start-meeting`, {
            method: 'POST',
        });
    });
}

function checkForMeeting() {
    const ic = cookie.getCookie('lobby_ic');
    fetch(`https://iotai-backend.onrender.com/lobby/${ic}`)
        .then((res) => res.json())
        .then((lobby) => {
            if (lobby.meeting_is_active == 1) {
                activateMeeting();
            }
        });
}

function activateMeeting() {
    meetingPopup.style.display = 'block';
    document.getElementById('background-overlay').style.display = 'block';
    setTimeout(function () {
        window.location.href = '../html/voting.html';
    }, 10000);
}

function isPlayerAlive() {
    return fetch(`https://iotai-backend.onrender.com/player/${cookie.getCookie('player_id')}/lobby/${cookie.getCookie('lobby_id')}`).then((res) => res.json());
}
