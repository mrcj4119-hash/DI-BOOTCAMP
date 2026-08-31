import os
from datetime import datetime


API_KEY = os.getenv("OWM_API_KEY")


def create_owm(api_key=None):
	try:
		from pyowm import OWM
	except ImportError as error:
		raise RuntimeError("Install PyOWM with: pip install pyowm") from error

	key = api_key or API_KEY
	if not key:
		raise RuntimeError("Set the OWM_API_KEY environment variable first.")
	return OWM(key)


def create_weather_manager(api_key=None):
	return create_owm(api_key).weather_manager()


def weather_details(weather, location):
	wind = weather.wind()
	return {
		"location": location,
		"status": weather.detailed_status.title(),
		"temperature_c": round(weather.temperature("celsius")["temp"], 1),
		"humidity": weather.humidity,
		"wind": wind,
		"sunrise": weather.sunrise_time(timeformat="iso"),
		"sunset": weather.sunset_time(timeformat="iso"),
	}


def get_weather_by_place(place="Paris, FR", api_key=None):
	manager = create_weather_manager(api_key)
	observation = manager.weather_at_place(place)
	return weather_details(observation.weather, place)


def get_weather_by_id(city_id, api_key=None):
	manager = create_weather_manager(api_key)
	observation = manager.weather_at_id(int(city_id))
	location = observation.location.name
	return weather_details(observation.weather, location)


def get_forecast_by_id(city_id, api_key=None):
	manager = create_weather_manager(api_key)
	return manager.forecast_at_id(int(city_id), "3h")


def get_air_pollution_by_id(city_id, api_key=None):
	owm = create_owm(api_key)
	observation = owm.weather_manager().weather_at_id(int(city_id))
	coordinates = observation.location.lat, observation.location.lon
	pollution_manager = owm.airpollution_manager()
	return pollution_manager.airpollution_at_coords(*coordinates)


def print_weather(details):
	print(f"\nWeather in {details['location']}")
	print(f"Condition: {details['status']}")
	print(f"Temperature: {details['temperature_c']} C")
	print(f"Humidity: {details['humidity']}%")
	print(f"Wind: {details['wind']}")
	print(f"Sunrise: {details['sunrise']}")
	print(f"Sunset: {details['sunset']}")


def init_plot(axis):
	axis.set_ylabel("Humidity (%)")
	axis.set_title("Three-Day Humidity Forecast")
	axis.set_ylim(0, 100)
	axis.grid(axis="y", alpha=0.25)


def plot_temperatures(axis, forecast, periods=24):
	weathers = forecast.weathers[:periods]
	labels = [
		datetime.fromtimestamp(weather.reference_time()).strftime("%a %H:%M")
		for weather in weathers
	]
	humidity = [weather.humidity for weather in weathers]
	bars = axis.bar(labels, humidity, color="#4f86c6", width=0.8)
	axis.tick_params(axis="x", rotation=45, labelsize=8)
	return bars


def write_humidity_on_bar_chart(axis, bars):
	for bar in bars:
		axis.annotate(
			f"{bar.get_height():.0f}%",
			xy=(bar.get_x() + bar.get_width() / 2, bar.get_height()),
			xytext=(0, 3),
			textcoords="offset points",
			ha="center",
			fontsize=8,
		)


def show_humidity_chart(forecast):
	import matplotlib.pyplot as plt

	figure, axis = plt.subplots(figsize=(12, 6))
	init_plot(axis)
	bars = plot_temperatures(axis, forecast)
	write_humidity_on_bar_chart(axis, bars)
	figure.tight_layout()
	plt.show()


def main():
	try:
		print_weather(get_weather_by_place("Paris, FR"))
		city_id = input("Enter an OpenWeatherMap city ID: ").strip()
		print_weather(get_weather_by_id(city_id))
		forecast = get_forecast_by_id(city_id)
		print(f"Forecast entries available: {len(forecast.weathers)}")
		pollution = get_air_pollution_by_id(city_id)
		print(f"Air pollution data: {pollution.current_aqi()}")
	except Exception as error:
		print(f"Weather app error: {error}")
		print("Check that OWM_API_KEY is a valid OpenWeatherMap API key.")


if __name__ == "__main__":
	main()
