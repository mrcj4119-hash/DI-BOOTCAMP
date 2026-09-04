const canvas = document.querySelector("#canvas");
const palette = document.querySelector("#palette");
const selectedPreview = document.querySelector("#selected-preview");
const squareCount = document.querySelector("#square-count");
const drawState = document.querySelector("#draw-state");
const gridSize = document.querySelector("#grid-size");
const gridSizeValue = document.querySelector("#grid-size-value");
const customColor = document.querySelector("#custom-color");
const clearButton = document.querySelector("#clear-button");

const colors = ["#202124", "#ff6b4a", "#f6bd60", "#84a59d", "#5b6c9d", "#d1495b", "#f28482", "#70c1b3", "#247ba0", "#6c584c", "#f5cac3", "#a8dadc", "#457b9d", "#e9c46a", "#606c38"];
let selectedColor = colors[1];
let isDrawing = false;

function updatePaintedCount() {
	squareCount.textContent = canvas.querySelectorAll(".pixel[data-painted=\"true\"]").length;
}

function paint(pixel) {
	if (!pixel || !pixel.classList.contains("pixel")) return;
	pixel.style.backgroundColor = selectedColor;
	pixel.dataset.painted = "true";
	updatePaintedCount();
}

function selectColor(color, swatch) {
	selectedColor = color;
	selectedPreview.style.backgroundColor = color;
	document.querySelectorAll(".color-swatch").forEach((item) => item.setAttribute("aria-pressed", "false"));
	if (swatch) swatch.setAttribute("aria-pressed", "true");
}

function createPalette() {
	colors.forEach((color) => {
		const swatch = document.createElement("button");
		swatch.className = "color-swatch";
		swatch.type = "button";
		swatch.style.backgroundColor = color;
		swatch.setAttribute("aria-label", `Select ${color}`);
		swatch.setAttribute("aria-pressed", "false");
		swatch.addEventListener("click", () => selectColor(color, swatch));
		palette.append(swatch);
	});
	selectColor(selectedColor, palette.firstElementChild.nextElementSibling);
}

function createGrid(size) {
	canvas.replaceChildren();
	canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	for (let index = 0; index < size * size; index += 1) {
		const pixel = document.createElement("div");
		pixel.className = "pixel";
		pixel.setAttribute("role", "gridcell");
		canvas.append(pixel);
	}
	updatePaintedCount();
}

canvas.addEventListener("mousedown", (event) => {
	isDrawing = true;
	paint(event.target);
	drawState.textContent = "Drawing...";
});
canvas.addEventListener("mouseover", (event) => {
	if (isDrawing) paint(event.target);
});
document.addEventListener("mouseup", () => {
	isDrawing = false;
	drawState.textContent = "Ready to draw";
});
canvas.addEventListener("pointermove", (event) => {
	if (event.buttons > 0) paint(document.elementFromPoint(event.clientX, event.clientY));
});
customColor.addEventListener("input", () => selectColor(customColor.value));
gridSize.addEventListener("input", () => {
	gridSizeValue.textContent = `${gridSize.value} x ${gridSize.value}`;
	createGrid(Number(gridSize.value));
});
clearButton.addEventListener("click", () => createGrid(Number(gridSize.value)));

createPalette();
createGrid(Number(gridSize.value));
