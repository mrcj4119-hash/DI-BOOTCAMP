const API_URL = 'https://www.swapi.tech/api/people/';
const statusElement = document.querySelector('#status');
const randomButton = document.querySelector('#random-button');

function setStatus(message, isError = false) {
	statusElement.className = `status${isError ? ' error' : ''}`;
	statusElement.innerHTML = `
		<i class="fa-solid ${isError ? 'fa-triangle-exclamation' : 'fa-spinner fa-spin'}" aria-hidden="true"></i>
		<p>${message}</p>
	`;
}

function displayCharacter(character, homeWorld) {
	const properties = character.properties || character;
	statusElement.className = 'character';
	statusElement.innerHTML = `
		<p class="character-label">Character archive</p>
		<h2 class="character-name">${properties.name || 'Unknown'}</h2>
		<dl class="facts">
			<div class="fact"><dt>Height</dt><dd>${properties.height || 'Unknown'}</dd></div>
			<div class="fact"><dt>Gender</dt><dd>${properties.gender || 'Unknown'}</dd></div>
			<div class="fact"><dt>Birth year</dt><dd>${properties.birth_year || 'Unknown'}</dd></div>
			<div class="fact"><dt>Home world</dt><dd>${homeWorld || 'Unknown'}</dd></div>
		</dl>
	`;
}

async function getRandomCharacter() {
	randomButton.disabled = true;
	setStatus('Searching the galaxy...');

	try {
		const randomId = Math.floor(Math.random() * 83) + 1;
		const response = await fetch(`${API_URL}${randomId}`);
		if (!response.ok) throw new Error(`Character request failed: ${response.status}`);

		const data = await response.json();
		if (!data.result) throw new Error('Character data was missing');

		const character = data.result;
		const homeWorldResponse = await fetch(character.properties.homeworld);
		const homeWorldData = homeWorldResponse.ok ? await homeWorldResponse.json() : null;
		const homeWorld = homeWorldData?.result?.properties?.name;
		displayCharacter(character, homeWorld);
	} catch (error) {
		console.error(error);
		setStatus('Unable to connect to the Star Wars database.', true);
	} finally {
		randomButton.disabled = false;
	}
}

randomButton.addEventListener('click', getRandomCharacter);
getRandomCharacter();
