import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useEffect, useState } from "react";
import {
  getForcastWeather,
  parseWeatherData,
  parseCurrentLocation,
} from "../../utils/weatherApi";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import { Switch, Route } from "react-router-dom/";
import { getItems, addItem, deleteItem } from "../../utils/Api";

function App() {
  /* ------------------------------- Use States ------------------------------- */

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  // const [weatherType, setWeatherType] = useState("");

  /* ------------------------------- Use Effects ------------------------------ */

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const currentLocation = parseCurrentLocation(data);
        setLocation(currentLocation);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  /* -------------------------------- Handlers -------------------------------- */

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleConfirmModal = () => {
    setActiveModal("confirm");
  };

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const handleAddItem = (values) => {
    addItem(values)
      .then((data) => {
        console.log(data);
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteItem = (selectedCard) => {
    deleteItem(selectedCard)
      .then(() => {
        const newClothesList = clothingItems.filter((item) => {
          return item.id !== selectedCard.id;
        });
        setClothingItems(newClothesList);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} location={location} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              handleCreateModal={handleCreateModal}
              handleSelectedCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
        </Switch>
      </CurrentTempUnitContext.Provider>
      <Footer />

      {activeModal === "create" && (
        <AddItemModal
          handleAddItem={handleAddItem}
          onClose={handleCloseModal}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          handleDeleteClick={handleConfirmModal}
        />
      )}
      {activeModal === "confirm" && (
        <ConfirmModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteItem}
        />
      )}
    </div>
  );
}

export default App;
