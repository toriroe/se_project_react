import { latitude, longitude, APIkey } from "./constants.js";
import { checkResponse } from "./Api.js";

export const getForcastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;

  const weatherType = data.weather[0].main;

  const weather = {
    temperature: {
      F: Math.ceil(temperature),
      C: Math.ceil(((temperature - 32) * 5) / 9),
    },
    type: weatherType.toLowerCase(),
  };
  return weather;
};

export const parseCurrentLocation = (data) => {
  const location = data.name;
  return location;
};
