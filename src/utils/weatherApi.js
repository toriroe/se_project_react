// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

import { latitude, longitude, APIkey } from "./constants.js";

export const getForcastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  return Math.ceil(temperature);
};

export const parseCurrentLocation = (data) => {
  const location = data.name;
  return location;
};

// export const parseWeatherType = (data) => {
//   const weather = data.weather;
//   const weatherCondition = weather[0].main.toLowerCase();
//   return weatherCondition;
// };
