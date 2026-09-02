
const article = document.querySelector("article");
const h1 = document.querySelector("h1");
console.log(h1);

if (article) {
  const paragraphs = article.querySelectorAll("p");
  if (paragraphs.length > 0) {
    paragraphs[paragraphs.length - 1].remove();
  }

  const h2 = article.querySelector("h2");
  if (h2) {
    h2.addEventListener("click", () => {
      h2.style.backgroundColor = "red";
    });
  }

  const h3 = article.querySelector("h3");
  if (h3) {
    h3.addEventListener("click", () => {
      h3.style.display = "none";
    });
  }

  const secondParagraph = paragraphs[1];
  if (secondParagraph) {
    secondParagraph.classList.add("fade");
    secondParagraph.addEventListener("mouseover", () => {
      secondParagraph.style.opacity = "0";
    });
    secondParagraph.addEventListener("mouseout", () => {
      secondParagraph.style.opacity = "1";
    });
  }
}

const boldButton = document.getElementById("bold-btn");
if (boldButton) {
  boldButton.addEventListener("click", () => {
    document.querySelectorAll("p").forEach((p) => {
      p.style.fontWeight = "bold";
    });
  });
}

if (h1) {
  h1.addEventListener("mouseover", () => {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = `${randomSize}px`;
  });
}

const form = document.getElementById("user-form");
console.log(form);

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
console.log(fname);
console.log(lname);
console.log(document.getElementsByName("firstname"));
console.log(document.getElementsByName("lastname"));

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stops the form from refreshing the page

    const firstNameValue = fname.value.trim();
    const lastNameValue = lname.value.trim();

    if (!firstNameValue || !lastNameValue) {
      alert("Please fill in both fields.");
      return;
    }

    const usersAnswer = document.querySelector(".usersAnswer");
    usersAnswer.innerHTML = "";

    const firstLi = document.createElement("li");
    firstLi.textContent = firstNameValue;
    usersAnswer.appendChild(firstLi);

    const secondLi = document.createElement("li");
    secondLi.textContent = lastNameValue;
    usersAnswer.appendChild(secondLi);
  });
}

let allBoldItems;

function getBoldItems() {
  allBoldItems = document.querySelectorAll("strong");
}

function highlight() {
  getBoldItems();
  allBoldItems.forEach((item) => {
    item.style.color = "blue";
  });
}

function returnItemsToDefault() {
  getBoldItems();
  allBoldItems.forEach((item) => {
    item.style.color = "black";
  });
}

const sentenceParagraph = document.querySelector("p strong")?.closest("p");
if (sentenceParagraph) {
  sentenceParagraph.addEventListener("mouseover", highlight);
  sentenceParagraph.addEventListener("mouseout", returnItemsToDefault);
}

const sphereForm = document.getElementById("MyForm");
if (sphereForm) {
  sphereForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const radiusInput = document.getElementById("radius");
    const volumeInput = document.getElementById("volume");

    const radius = Number(radiusInput.value);
    const volume = (4 / 3) * Math.PI * radius ** 3;
    volumeInput.value = volume.toFixed(2);
  });
}
