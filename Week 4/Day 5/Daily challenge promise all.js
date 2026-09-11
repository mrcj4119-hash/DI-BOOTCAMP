async function getSunrise(latitude, longitude) {
	const url = `https://api.sunrise-sunset.org/json?lat=${encodeURIComponent(latitude)}&lng=${encodeURIComponent(longitude)}&formatted=0`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Sunrise request failed: ${response.status}`);
	}

	const data = await response.json();

	if (data.status !== "OK") {
		throw new Error(`Sunrise API error: ${data.status}`);
	}

	return data.results.sunrise;
}

function formatSunrise(isoTime) {
	return new Date(isoTime).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}

if (typeof document !== "undefined") {
	const form = document.querySelector("#sunrise-form");
	const results = document.querySelector("#results");

	form.addEventListener("submit", async event => {
		event.preventDefault();
		const formData = new FormData(form);
		const firstCity = formData.get("first-city").trim() || "City 1";
		const secondCity = formData.get("second-city").trim() || "City 2";

		results.textContent = "Checking both sunrise times...";

		try {
			const [firstSunrise, secondSunrise] = await Promise.all([
				getSunrise(formData.get("first-latitude"), formData.get("first-longitude")),
				getSunrise(formData.get("second-latitude"), formData.get("second-longitude"))
			]);

			results.replaceChildren();
			[
				[firstCity, firstSunrise],
				[secondCity, secondSunrise]
			].forEach(([city, sunrise]) => {
				const result = document.createElement("article");
				result.innerHTML = `<h2>${city}</h2><p>${formatSunrise(sunrise)}</p>`;
				results.appendChild(result);
			});
		} catch (error) {
			results.textContent = "Could not retrieve both sunrise times.";
			console.error(error);
		}
	});
}
