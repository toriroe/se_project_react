import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTempUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const Main = ({ weatherTemp, onSelectCard, clothingItems }) => {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const temp = weatherTemp?.temperature?.[currentTempUnit];
  const getWeatherType = () => {
    if (currentTempUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    }

    if (currentTempUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }
  };
  const weatherType = getWeatherType();

  const filteredCards = clothingItems.filter((item) => {
    return item.weather === weatherType;
  });

  /* --------------------- isDay variable for weather card -------------------- */

  const currentTime = new Date().getHours();

  const getIsDaytime = (time) => {
    if (time > 6 && time < 19) {
      return true;
    } else {
      return false;
    }
  };

  const isDay = getIsDaytime(currentTime);

  /* -------------------------------------------------------------------------- */

  return (
    <main className="main">
      <WeatherCard day={isDay} type="clear" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp}° {currentTempUnit} / You may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => {
            return (
              <ItemCard card={item} onSelectCard={onSelectCard} key={item.id} />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
