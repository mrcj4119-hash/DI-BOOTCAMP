const input = document.getElementById("lettersInput");

input.addEventListener("input", () => {
  input.value = input.value.replace(/[^a-zA-Z]/g, "");
});
