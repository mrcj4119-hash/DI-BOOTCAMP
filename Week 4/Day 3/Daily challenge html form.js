const userForm = document.querySelector("#user-form");
const output = document.querySelector("#output");

userForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(userForm);
	const user = {
		name: formData.get("name").trim(),
		lastname: formData.get("lastname").trim(),
	};

	const jsonString = JSON.stringify(user);
	const result = document.createElement("p");
	result.textContent = jsonString;
	output.appendChild(result);
});
