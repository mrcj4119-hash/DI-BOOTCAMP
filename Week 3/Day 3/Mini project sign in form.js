const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");

if (signUpBtn) {
  signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });
}

if (signInBtn) {
  signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
}
