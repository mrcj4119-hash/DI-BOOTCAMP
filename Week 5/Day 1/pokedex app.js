const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const display = document.querySelector('#display');
const randomButton = document.querySelector('#random-button');
const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');

let currentPokemonId = 1;

function setStatus(message, isError = false) {
    display.innerHTML = `
        <div class="status ${isError ? 'error' : ''}">
            <i class="fa-solid ${isError ? 'fa-triangle-exclamation' : 'fa-spinner fa-spin'}" aria-hidden="true"></i>
            <p>${message}</p>
        </div>
    `;
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function showPokemon(pokemon) {
    currentPokemonId = pokemon.id;
    const types = pokemon.types.map(({ type }) => `<span class="type">${capitalize(type.name)}</span>`).join('');
    const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

    display.innerHTML = `
        <img class="pokemon-art" src="${image}" alt="${capitalize(pokemon.name)}">
        <h1 class="pokemon-name">${capitalize(pokemon.name)}</h1>
        <p class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</p>
        <div class="types">${types}</div>
        <div class="facts">
            <div class="fact"><span class="fact-label">Height</span><span class="fact-value">${pokemon.height / 10} m</span></div>
            <div class="fact"><span class="fact-label">Weight</span><span class="fact-value">${pokemon.weight / 10} kg</span></div>
        </div>
    `;
}

async function fetchPokemon(id) {
    randomButton.disabled = true;
    previousButton.disabled = true;
    nextButton.disabled = true;
    setStatus('Scanning the Pokédex...');

    try {
        const response = await fetch(`${API_URL}${id}`);
        if (!response.ok) throw new Error(`Pokémon ${id} was not found`);
        showPokemon(await response.json());
    } catch (error) {
        console.error(error);
        setStatus('Oh no! That Pokémon is not available...', true);
    } finally {
        randomButton.disabled = false;
        previousButton.disabled = currentPokemonId <= 1;
        nextButton.disabled = false;
    }
}

function fetchRandomPokemon() {
    fetchPokemon(Math.floor(Math.random() * 151) + 1);
}

randomButton.addEventListener('click', fetchRandomPokemon);
previousButton.addEventListener('click', () => fetchPokemon(Math.max(1, currentPokemonId - 1)));
nextButton.addEventListener('click', () => fetchPokemon(currentPokemonId + 1));
fetchPokemon(currentPokemonId);