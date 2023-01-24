"use strict"
/*roleSelection();

function roleSelection(){
let randomnumber = Math.random()*10;
console.log(randomnumber);
let role = "";
if(randomnumber >= 8){role = "predator"} else {role = "scientist"}
console.log(role);

document.getElementById("rolscherm_roltekst").innerHTML = "role: " + role; 
}*/

window.onload = (event) => {
    console.log("page is fully loaded");
    roleSelection();

function roleSelection(){
let randomnumber = Math.random()*2;
console.log(randomnumber);
let role = "";
let roleinfo = "";
if(randomnumber >= 1)
      {document.body.innerHTML = '<h1 class="rolscherm_roltekst glow_red" id="rolscherm_roltekst"></h1><h2 class="rolscherm_roluitleg" id="rolscherm_roluitleg"></h2>';
        role = "predator", roleinfo = "Eliminate the scientists, but don't get caught!"}
 else {document.body.innerHTML = '<h1 class="rolscherm_roltekst glow_blue" id="rolscherm_roltekst"></h1><h2 class="rolscherm_roluitleg" id="rolscherm_roluitleg"></h2>';
 role = "scientist", roleinfo = "Complete missions, find out who the predator is!"}
console.log(role);

document.getElementById("rolscherm_roltekst").innerHTML = "you are a " + role; 
document.getElementById("rolscherm_roluitleg").innerHTML = roleinfo;


}
  };