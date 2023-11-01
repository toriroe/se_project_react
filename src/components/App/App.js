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

  const handleEditProfileModal = () => {
    setActiveModal("editprofile");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItem = (values) => {
    addItem(values)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
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
        setLoggedIn(true);
        setCurrentUser(user);
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

  const handleEditProfile = (values) => {
    editProfile(values)
      .then((editedUser) => {
        setCurrentUser(editedUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLikeClick = (id, isLiked, user) => {
    console.log(id, isLiked, user);
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(id, user, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(id, user, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
          })
          .catch((err) => console.log(err));
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
            <RegisterModal
              onClose={handleCloseModal}
              handleSignUp={handleSignUp}
            />
          )}
          {activeModal === "editprofile" && (
            <EditProfileModal
              onClose={handleCloseModal}
              handleEditProfile={handleEditProfile}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
