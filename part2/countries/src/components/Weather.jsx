import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_SOME_KEY;

    // Defensive/debug in case of missing key
    if (!apiKey) {
      console.warn("No OpenWeather API key set in VITE_SOME_KEY");
      return;
    }

    const url = "https://api.openweathermap.org/data/2.5/weather";

    axios
      .get(url, {
        params: {
          q: capital,
          appid: apiKey,
          units: "metric",
        },
      })
      .then((response) => {
        setWeather(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch weather data");
      });
  }, [capital]);

  // Handle missing API key in env variable
  if (!import.meta.env.VITE_SOME_KEY) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>
          Set your OpenWeather API key in <code>VITE_SOME_KEY</code> to see
          weather.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Loading weather...</p>
      </div>
    );
  }

  const temp = weather.main?.temp;
  const windSpeed = weather.wind?.speed;
  const icon = weather.weather?.[0]?.icon;
  const description = weather.weather?.[0]?.description;

  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : null;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {temp !== undefined && <p>temperature {temp} °C</p>}
      {iconUrl && <img src={iconUrl} alt={description || "Weather icon"} />}
      {windSpeed !== undefined && <p>wind {windSpeed} m/s</p>}
    </div>
  );
};

export default Weather;
