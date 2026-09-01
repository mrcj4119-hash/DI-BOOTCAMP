
const container = document.getElementById("container");
console.log(container);

const allLis = document.querySelectorAll("li");
for (let li of allLis) {
    if (li.textContent === "Pete") {
        li.textContent = "Richard";
    }
}

const allUls = document.querySelectorAll("ul.list");
const secondUl = allUls[1];
const secondLiOfSecondUl = secondUl.querySelectorAll("li")[1];
secondLiOfSecondUl.remove();

const myName = "Alex";
for (let ul of allUls) {
    const firstLi = ul.querySelector("li");
    firstLi.textContent = myName;
}

for (let ul of allUls) {
    ul.classList.add("student_list");
}

allUls[0].classList.add("university", "attendance");

container.style.backgroundColor = "lightblue";
container.style.padding = "20px";

for (let li of allLis) {
    if (li.textContent === "Dan") {
        li.style.display = "none";
    }
}

for (let li of allLis) {
    if (li.textContent === "Richard") {
        li.style.border = "2px solid black";
    }
}

document.body.style.fontSize = "18px";

const bgColor = window.getComputedStyle(container).backgroundColor;
if (bgColor === "rgb(173, 216, 230)") { 
    const usersInDiv = Array.from(allUls[0].querySelectorAll("li"))
        .map(li => li.textContent)
        .join(" and ");
    alert("Hello " + usersInDiv);
}
