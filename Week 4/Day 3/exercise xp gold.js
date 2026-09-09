const submittedData = document.querySelector("#submitted-data");
const queryParameters = new URLSearchParams(window.location.search);
const name = queryParameters.get("name");
const lastname = queryParameters.get("lastname");

if (name && lastname) {
	const message = document.createElement("p");
	message.textContent = `Hello ${name} ${lastname}!`;
	submittedData.appendChild(message);
} else {
	submittedData.textContent = "No name data was submitted.";
}
