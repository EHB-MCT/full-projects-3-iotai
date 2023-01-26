'use strict';

window.onload = () => {
    renderRole();
};

async function renderRole() {
    const roleTitle = document.querySelector('#role-title');
    const roleDescription = document.querySelector('#role-description');
    await fetch('https://iotai-backend.onrender.com/role/1/6')
        .then((res) => res.json())
        .then((role) => {
            roleTitle.textContent = role[0].name;
            roleDescription.textContent = role[0].description;
        });
}
