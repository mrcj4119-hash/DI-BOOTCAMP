const hilariousGifsUrl =
	"https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(hilariousGifsUrl)
	.then(response => {
		if (!response.ok) {
			throw new Error(`Giphy request failed: ${response.status}`);
		}

		return response.json();
	})
	.then(giphyData => console.log("Exercise 1:", giphyData))
	.catch(error => console.error("Exercise 1 error:", error));

const sunGifsUrl =
	"https://api.giphy.com/v1/gifs/search?q=sun&rating=g&limit=10&offset=2&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(sunGifsUrl)
	.then(response => {
		if (!response.ok) {
			throw new Error(`Giphy request failed: ${response.status}`);
		}

		return response.json();
	})
	.then(giphyData => console.log("Exercise 2:", giphyData))
	.catch(error => console.error("Exercise 2 error:", error));

async function getStarship() {
	try {
		const response = await fetch("https://www.swapi.tech/api/starships/9/");

		if (!response.ok) {
			throw new Error(`Star Wars request failed: ${response.status}`);
		}

		const starshipData = await response.json();
		console.log("Exercise 3:", starshipData.result);
	} catch (error) {
		console.error("Exercise 3 error:", error);
	}
}

getStarship();

function resolveAfter2Seconds() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("resolved");
		}, 2000);
	});
}

async function asyncCall() {
	console.log("calling");
	const result = await resolveAfter2Seconds();
	console.log(result);
}

asyncCall();
