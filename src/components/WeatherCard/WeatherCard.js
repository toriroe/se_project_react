import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });

  const imageSrcUrl = weatherOption.url || "";

  return (
    <section className="weather" id="weather-section">
      <div className="weather__info">{weatherTemp}° F</div>
      <img className="weather__image" src={imageSrcUrl} alt="current weather" />
    </section>
  );
};

export default WeatherCard;
