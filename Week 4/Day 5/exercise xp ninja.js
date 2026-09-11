const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

async function fetchGifs(category) {
	const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(category)}&limit=12&rating=g&api_key=${apiKey}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Giphy request failed: ${response.status}`);
	}

	return response.json();
}

if (typeof document !== "undefined") {
	const form = document.querySelector("#gif-form");
	const categoryInput = document.querySelector("#category");
	const results = document.querySelector("#gif-results");
	const deleteButton = document.querySelector("#delete-gifs");

	function appendGifs(giphyData) {
		results.replaceChildren();

		if (giphyData.data.length === 0) {
			results.textContent = "No GIFs found for that category.";
			return;
		}

		giphyData.data.forEach(gifData => {
			const gif = document.createElement("img");
			gif.src = gifData.images.fixed_width.url;
			gif.alt = gifData.title || "Giphy result";
			gif.loading = "lazy";
			results.appendChild(gif);
		});
	}

	form.addEventListener("submit", async event => {
		event.preventDefault();
		const category = categoryInput.value.trim();

		if (!category) {
			return;
		}

		try {
			results.textContent = "Loading...";
			const giphyData = await fetchGifs(category);
			appendGifs(giphyData);
		} catch (error) {
			results.textContent = "Unable to load GIFs.";
			console.error(error);
		}
	});

	deleteButton.addEventListener("click", () => {
		results.replaceChildren();
	});
}

