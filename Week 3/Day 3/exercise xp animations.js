
const container = document.getElementById("container");
const clearButton = document.getElementById("clear");
let intervalId;

setTimeout(() => {
  alert("Hello World");
}, 2000);

setTimeout(() => {
  const para = document.createElement("p");
  para.textContent = "Hello World";
  container.appendChild(para);
}, 2000);

intervalId = setInterval(() => {
  const para = document.createElement("p");
  para.textContent = "Hello World";
  container.appendChild(para);

  if (container.children.length >= 5) {
    clearInterval(intervalId);
  }
}, 2000);

clearButton.addEventListener("click", () => {
  clearInterval(intervalId);
});

const box = document.getElementById("animate");
const boxContainer = document.getElementById("containerBox");
const moveButton = document.getElementById("moveBtn");

let boxPosition = 0;
let movingInterval;

function myMove() {
  clearInterval(movingInterval);
  boxPosition = 0;
  box.style.left = "0px";

  movingInterval = setInterval(() => {
    if (boxPosition >= boxContainer.clientWidth - box.clientWidth) {
      clearInterval(movingInterval);
      return;
    }

    boxPosition += 1;
    box.style.left = `${boxPosition}px`;
  }, 1);
}

moveButton.addEventListener("click", myMove);
