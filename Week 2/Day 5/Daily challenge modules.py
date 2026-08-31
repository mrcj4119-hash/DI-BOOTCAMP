import requests
import time


def get_page_load_time(url):
    """Return the time in seconds it takes to complete a GET request."""
    start_time = time.perf_counter()
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    elapsed_time = time.perf_counter() - start_time
    return round(elapsed_time, 3)


websites = [
    "https://www.google.com",
    "https://www.ynet.co.il",
    "https://www.imdb.com",
]

for site in websites:
    try:
        load_time = get_page_load_time(site)
        print(f"{site} loaded in {load_time} seconds")
    except requests.exceptions.RequestException as e:
        print(f"{site} failed to load: {e}")
