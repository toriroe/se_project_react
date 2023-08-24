import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";

const Main = ({ weatherTemp, onSelectCard }) => {
  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };
  const weatherType = getWeatherType();

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="moon" weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        Today is {weatherTemp}° F / You may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                card={item}
                onSelectCard={onSelectCard}
                key={item._id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
