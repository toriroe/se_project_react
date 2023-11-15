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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import { signIn, register, getContent, editProfile } from "../../utils/auth";

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
  const [isLoading, setIsLoading] = useState(false);
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
            setCurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  /* -------------------------------- Modal Handlers -------------------------------- */

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleConfirmModal = () => {
    setActiveModal("confirm");
  };

  const handleEditProfileModal = () => {
    setActiveModal("editprofile");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  /* ----------------------------- Other handlers ----------------------------- */

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItem = (values) => {
    console.log(values);
    setIsLoading(true);
    addItem(values)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteItem = (selectedCard, token) => {
    setIsLoading(true);
    deleteItem(selectedCard, token)
      .then(() => {
        const newClothesList = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newClothesList);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignUp = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    register({ name, avatar, email, password })
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        localStorage.setItem("jwt", user.token);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogIn = ({ email, password }) => {
    setIsLoading(true);
    signIn({ email, password })
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogOut = () => {
    setCurrentUser({});
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

  const handleEditProfile = (values) => {
    setIsLoading(true);
    editProfile(values)
      .then((res) => {
        console.log(res);
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLikeClick = (id, isLiked, user) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(id, user, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard.data : card))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(id, user, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard.data : card))
            );
          })
          .catch((err) => {
            console.error(err);
          });
  };

  return (
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
              onCardLike={handleLikeClick}
              isLoggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              handleCreateModal={handleCreateModal}
              handleSelectedCard={handleSelectedCard}
              clothingItems={clothingItems}
              onLogOut={handleLogOut}
              handleEditProfileModal={handleEditProfileModal}
              handleEditProfile={handleEditProfile}
              onCardLike={handleLikeClick}
              isLoggedIn={loggedIn}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleAddItem={handleAddItem}
            onClose={handleCloseModal}
            isLoading={isLoading}
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
          <LoginModal
            onClose={handleCloseModal}
            handleLogIn={handleLogIn}
            isLoading={isLoading}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            onClose={handleCloseModal}
            handleSignUp={handleSignUp}
            isLoading={isLoading}
          />
        )}
        {activeModal === "editprofile" && (
          <EditProfileModal
            onClose={handleCloseModal}
            handleEditProfile={handleEditProfile}
            isLoading={isLoading}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
