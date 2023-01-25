"use strict"
window.onload = (event) => {
    roleSelection();

function roleSelection(){
let role = "";
let roleinfo = "";
let randomnumber = Math.random()*2;

// Get a random role
if(randomnumber >= 1)
 {document.body.innerHTML = '<h1 class="rolscherm_roltekst glow_red" id="rolscherm_roltekst"></h1><h2 class="rolscherm_roluitleg" id="rolscherm_roluitleg"></h2>';
 role = "predator", roleinfo = "Eliminate the scientists, but don't get caught!"
}
 else {document.body.innerHTML = '<h1 class="rolscherm_roltekst glow_blue" id="rolscherm_roltekst"></h1><h2 class="rolscherm_roluitleg" id="rolscherm_roluitleg"></h2>';
 role = "scientist", roleinfo = "Complete missions, find out who the predator is!"
}

// Toevoegen van de juiste rol
document.getElementById("rolscherm_roltekst").innerHTML = "you are a " + role; 

// Toevoegen van de juiste uitleg
document.getElementById("rolscherm_roluitleg").innerHTML = roleinfo;
  }
};