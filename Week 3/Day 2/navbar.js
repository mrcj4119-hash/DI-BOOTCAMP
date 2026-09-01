
const navBar = document.getElementById("navBar");
navBar.setAttribute("id", "socialNetworkNavigation");

const newLi = document.createElement("li");

const logoutText = document.createTextNode("Logout");

newLi.appendChild(logoutText);

const ul = document.querySelector("ul");
ul.appendChild(newLi);

const firstLink = ul.firstElementChild;
const lastLink = ul.lastElementChild;

console.log("First link text:", firstLink.textContent);
console.log("Last link text:", lastLink.textContent);
