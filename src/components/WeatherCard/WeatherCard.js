import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });

  const imageSrcUrl = weatherOption.url || "";

  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather" id="weather-section">
      <div className="weather__info">
        {weatherTemp}° {currentTempUnit}
      </div>
      <img className="weather__image" src={imageSrcUrl} alt="current weather" />
    </section>
  );
};

export default WeatherCard;
