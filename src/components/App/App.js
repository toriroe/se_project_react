import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import {
  getForcastWeather,
  parseWeatherData,
  parseCurrentLocation,
} from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Switch, Route, Redirect, useHistory } from "react-router-dom/";
import { getItems, addItem, deleteItem } from "../../utils/Api";
import { signIn, register, getContent } from "../../utils/auth";

function App() {
  /* ------------------------------- Use States ------------------------------- */

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(true);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  /* -------------------------------- Handlers -------------------------------- */

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
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

  const handleEditProfileModal = () => {};

  const handleEditProfile = () => {};

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
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

  const handleSignUp = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then((user) => {
        console.log(user);
        setLoggedIn(true);
        setCurrentUser(user);
        console.log(loggedIn);
        console.log(currentUser);
        localStorage.setItem("jwt", user.token);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogIn = ({ email, password }) => {
    signIn({ email, password })
      .then((user) => {
        localStorage.setItem("jwt", user.token);
        setLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogOut = () => {
    setCurrentUser({});
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onCreateModal={handleCreateModal}
            location={location}
            loggedIn={loggedIn}
            onLogIn={handleLoginModal}
            onSignUp={handleRegisterModal}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
            <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <Profile
                handleCreateModal={handleCreateModal}
                handleSelectedCard={handleSelectedCard}
                clothingItems={clothingItems}
                onLogOut={handleLogOut}
              />
            </ProtectedRoute>
          </Switch>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
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
      {activeModal === "login" && (
        <LoginModal onClose={handleCloseModal} handleLogIn={handleLogIn} />
      )}
      {activeModal === "register" && (
        <RegisterModal onClose={handleCloseModal} handleSignUp={handleSignUp} />
      )}
    </div>
  );
}

export default App;
