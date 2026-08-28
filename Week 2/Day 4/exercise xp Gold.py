import json
from urllib.parse import urlencode
from urllib.request import urlopen


API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
API_URL = "https://api.giphy.com/v1/gifs/search"
TRENDING_URL = "https://api.giphy.com/v1/gifs/trending"


def fetch_gifs(query, limit=10):
	params = urlencode({"q": query, "rating": "g", "api_key": API_KEY, "limit": limit})
	with urlopen(f"{API_URL}?{params}") as response:
		if response.status != 200:
			raise RuntimeError(f"Giphy returned status {response.status}")
		return json.load(response)


def tall_gifs(gif_response, minimum_height=100):
	return [
		gif for gif in gif_response.get("data", [])
		if int(gif["images"]["original"]["height"]) > minimum_height
	]


def exercise_one():
	results = tall_gifs(fetch_gifs("hilarious", limit=10))
	print(f"Gifs taller than 100 pixels: {len(results)}")
	return results


def exercise_two():
	query = input("Search for a GIF: ").strip()
	if not query:
		print("I couldn't find the requested term or phrase. Showing trending GIFs.")
		return fetch_trending_gifs()

	results = fetch_gifs(query, limit=50)
	if not results.get("data"):
		print("I couldn't find the requested term or phrase. Showing trending GIFs.")
		return fetch_trending_gifs()
	return results["data"]


def fetch_trending_gifs(limit=50):
	params = urlencode({"rating": "g", "api_key": API_KEY, "limit": limit})
	with urlopen(f"{TRENDING_URL}?{params}") as response:
		if response.status != 200:
			raise RuntimeError(f"Giphy returned status {response.status}")
		return json.load(response).get("data", [])


def main():
	choice = input("Choose Giphy exercise (1 or 2): ").strip()
	if choice == "1":
		exercise_one()
	elif choice == "2":
		print(f"Found {len(exercise_two())} GIFs.")
	else:
		print("Please choose 1 or 2.")


if __name__ == "__main__":
	main()
