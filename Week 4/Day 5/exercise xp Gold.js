const giphyUrl =
	"https://api.giphy.com/v1/gifs/search?q=funny&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

async function displayRandomGif() {
	try {
		let response = await fetch(giphyUrl);

		if (response.status === 429) {
			const retryAfter = Number(response.headers.get("retry-after")) || 2;
			const waitTime = Math.min(retryAfter, 5) * 1000;
			await new Promise(resolve => setTimeout(resolve, waitTime));
			response = await fetch(giphyUrl);
		}

		if (!response.ok) {
			if (response.status === 429) {
				throw new Error("Giphy rate limit reached. Please try again later.");
			}

			throw new Error(`Giphy request failed: ${response.status}`);
		}

		const giphyData = await response.json();
		const gifs = giphyData.data;

		if (gifs.length === 0) {
			throw new Error("Giphy returned no GIFs");
		}

		const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
		const gifUrl = randomGif.images.original.url;

		if (typeof document === "undefined") {
			console.log("Exercise 1 GIF URL:", gifUrl);
			return;
		}

		const gif = document.createElement("img");
		gif.src = gifUrl;
		gif.alt = randomGif.title || "Random GIF";
		document.body.appendChild(gif);
	} catch (error) {
		console.error("Exercise 1 error:", error);
	}
}

displayRandomGif();

const urls = [
	"https://jsonplaceholder.typicode.com/users",
	"https://jsonplaceholder.typicode.com/posts",
	"https://jsonplaceholder.typicode.com/albums"
];

async function getData() {
	try {
		const [users, posts, albums] = await Promise.all(
			urls.map(async url => {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error(`Request failed: ${response.status}`);
				}

				return await response.json();
			})
		);

		console.log("users", users);
		console.log("posts", posts);
		console.log("albums", albums);
	} catch (error) {
		console.log("ooooooops");
		console.error(error);
	}
}

getData();
