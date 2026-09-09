const quotes = [
	{
		id: 0,
		author: "Maya Angelou",
		quote: "You can't use up creativity. The more you use, the more you have.",
		likes: 0,
	},
	{
		id: 1,
		author: "Oscar Wilde",
		quote: "Be yourself; everyone else is already taken.",
		likes: 0,
	},
	{
		id: 2,
		author: "James Clear",
		quote: "Every action you take is a vote for the person you wish to become.",
		likes: 0,
	},
	{
		id: 3,
		author: "Maya Angelou",
		quote: "Try to be a rainbow in someone's cloud.",
		likes: 0,
	},
];

const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const likeButton = document.querySelector("#like-button");
const likeCount = document.querySelector("#like-count");
const filterStatus = document.querySelector("#filter-status");

let currentQuote = null;
let filteredQuotes = [];
let filteredQuoteIndex = 0;

function displayQuote(quote) {
	currentQuote = quote;
	quoteText.textContent = `“${quote.quote}”`;
	quoteAuthor.textContent = `- ${quote.author}`;
	likeCount.textContent = quote.likes;
}

function getRandomQuote() {
	const availableQuotes = quotes.filter((quote) => quote.id !== currentQuote?.id);
	const randomIndex = Math.floor(Math.random() * availableQuotes.length);
	return availableQuotes[randomIndex];
}

function showRandomQuote() {
	displayQuote(getRandomQuote());
	filterStatus.textContent = "";
}

function showQuoteStats() {
	const quote = currentQuote?.quote ?? "";
	document.querySelector("#characters-result").textContent = quote.length;
	document.querySelector("#characters-no-spaces-result").textContent = quote.replace(/\s/g, "").length;
	document.querySelector("#words-result").textContent = quote.trim() ? quote.trim().split(/\s+/).length : 0;
}

function updateFilterStatus() {
	if (filteredQuotes.length === 0) {
		filterStatus.textContent = "No quotes found for this author.";
		return;
	}

	filterStatus.textContent = `Quote ${filteredQuoteIndex + 1} of ${filteredQuotes.length} by ${filteredQuotes[0].author}`;
}

function displayFilteredQuote() {
	displayQuote(filteredQuotes[filteredQuoteIndex]);
	updateFilterStatus();
}

document.querySelector("#generate-button").addEventListener("click", showRandomQuote);

likeButton.addEventListener("click", () => {
	if (!currentQuote) return;

	currentQuote.likes += 1;
	likeCount.textContent = currentQuote.likes;
});

document.querySelector("#characters-button").addEventListener("click", showQuoteStats);
document.querySelector("#characters-no-spaces-button").addEventListener("click", showQuoteStats);
document.querySelector("#words-button").addEventListener("click", showQuoteStats);

document.querySelector("#add-quote-form").addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(event.currentTarget);
	const newQuote = {
		id: quotes.length,
		author: formData.get("author").trim(),
		quote: formData.get("quote").trim(),
		likes: 0,
	};

	quotes.push(newQuote);
	displayQuote(newQuote);
	event.currentTarget.reset();
	filterStatus.textContent = "Quote added.";
});

document.querySelector("#filter-form").addEventListener("submit", (event) => {
	event.preventDefault();

	const author = new FormData(event.currentTarget).get("author").trim().toLowerCase();
	filteredQuotes = quotes.filter((quote) => quote.author.toLowerCase() === author);
	filteredQuoteIndex = 0;

	if (filteredQuotes.length > 0) {
		displayFilteredQuote();
	} else {
		updateFilterStatus();
	}
});

document.querySelector("#previous-button").addEventListener("click", () => {
	if (filteredQuotes.length === 0) return;

	filteredQuoteIndex = (filteredQuoteIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
	displayFilteredQuote();
});

document.querySelector("#next-button").addEventListener("click", () => {
	if (filteredQuotes.length === 0) return;

	filteredQuoteIndex = (filteredQuoteIndex + 1) % filteredQuotes.length;
	displayFilteredQuote();
});
