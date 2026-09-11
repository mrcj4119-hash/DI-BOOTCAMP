const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

async function fetchRandomGif(category) {
	const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${encodeURIComponent(category)}&rating=g`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Giphy request failed: ${response.status}`);
	}

	return response.json();
}

if (typeof document !== "undefined") {
	const form = document.querySelector("#gif-form");
	const categoryInput = document.querySelector("#category");
	const gallery = document.querySelector("#gif-gallery");
	const deleteAllButton = document.querySelector("#delete-all");
	const message = document.querySelector("#message");

	function appendGif(giphyData) {
		const gifData = giphyData.data;
		const gifCard = document.createElement("article");
		const gif = document.createElement("img");
		const deleteButton = document.createElement("button");

		gif.src = gifData.images.original.url;
		gif.alt = gifData.title || "Random GIF";
		gif.loading = "lazy";
		deleteButton.type = "button";
		deleteButton.textContent = "DELETE";
		deleteButton.addEventListener("click", () => gifCard.remove());

		gifCard.append(gif, deleteButton);
		gallery.prepend(gifCard);
	}

	form.addEventListener("submit", async event => {
		event.preventDefault();
		const category = categoryInput.value.trim();

		if (!category) {
			return;
		}

		message.textContent = "Finding a GIF...";

		try {
			const giphyData = await fetchRandomGif(category);
			appendGif(giphyData);
			message.textContent = `Added a ${category} GIF.`;
			categoryInput.value = "";
		} catch (error) {
			message.textContent = "Could not load that GIF. Please try again.";
			console.error(error);
		}
	});

	deleteAllButton.addEventListener("click", () => {
		gallery.replaceChildren();
		message.textContent = "Gallery cleared.";
	});
}
