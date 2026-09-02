
const musicSelect = document.getElementById("genres");

if (musicSelect) {
  console.log(musicSelect.value);

  const classicOption = document.createElement("option");
  classicOption.value = "classic";
  classicOption.textContent = "Classic";
  musicSelect.appendChild(classicOption);
  musicSelect.value = "classic";
  console.log(musicSelect.value);
}

const colorSelect = document.getElementById("colorSelect");
const removeBtn = document.getElementById("removeBtn");

function removecolor() {
  const selectedIndex = colorSelect.selectedIndex;
  if (selectedIndex >= 0) {
    colorSelect.remove(selectedIndex);
  }
}

if (removeBtn) {
  removeBtn.addEventListener("click", removecolor);
}

let shoppingList = [];
const root = document.getElementById("root");

if (root) {
  const form = document.createElement("form");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add item";

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = "AddItem";

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.textContent = "ClearAll";

  function addItem() {
    const value = input.value.trim();
    if (value !== "") {
      shoppingList.push(value);
      input.value = "";
      renderList();
    }
  }

  function clearAll() {
    shoppingList = [];
    renderList();
  }

  function renderList() {
    const list = document.createElement("ul");
    shoppingList.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    const oldList = root.querySelector("ul");
    if (oldList) {
      oldList.remove();
    }

    root.appendChild(list);
  }

  addButton.addEventListener("click", addItem);
  clearButton.addEventListener("click", clearAll);

  form.appendChild(input);
  form.appendChild(addButton);
  form.appendChild(clearButton);
  root.appendChild(form);
}
