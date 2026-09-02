const form = document.getElementById("libform");
const storySpan = document.getElementById("story");
const shuffleButton = document.getElementById("shuffle-button");

const storyTemplates = [
  "Once upon a time, {person} found a {adjective} {noun} near {place} and decided to {verb} with it.",
  "At {place}, {person} discovered a {adjective} {noun} and began to {verb} like a champion.",
  "When {person} went to {place}, a {adjective} {noun} suddenly appeared and asked them to {verb}.",
  "In the middle of {place}, {person} met a {adjective} {noun} and tried to {verb} before sunrise."
];

let currentValues = {};

function getValues() {
  const noun = document.getElementById("noun").value.trim();
  const adjective = document.getElementById("adjective").value.trim();
  const person = document.getElementById("person").value.trim();
  const verb = document.getElementById("verb").value.trim();
  const place = document.getElementById("place").value.trim();

  return { noun, adjective, person, verb, place };
}

function buildStory(values) {
  const template = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];

  return template
    .replace("{noun}", values.noun)
    .replace("{adjective}", values.adjective)
    .replace("{person}", values.person)
    .replace("{verb}", values.verb)
    .replace("{place}", values.place);
}

function renderStory(values) {
  storySpan.textContent = buildStory(values);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = getValues();
  const allFilled = Object.values(values).every((value) => value !== "");

  if (!allFilled) {
    alert("Please fill in all fields before generating a story.");
    return;
  }

  currentValues = values;
  renderStory(values);
});

shuffleButton.addEventListener("click", () => {
  const values = getValues();
  const allFilled = Object.values(values).every((value) => value !== "");

  if (!allFilled) {
    alert("Please fill in all fields before shuffling the story.");
    return;
  }

  currentValues = values;
  renderStory(values);
});
