import ItemCard from "../components/ItemCard/ItemCard";

const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

/* ---------------------------- GET items request --------------------------- */

export const getItems = () => {
  const getItems = fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
  return getItems;
};

/* --------------------------- POST items request --------------------------- */

export const addItem = ({ name, imageUrl, weather, token }) => {
  const addItem = fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
  return addItem;
};

/* --------------------------- DELETE item request -------------------------- */

export const deleteItem = (selectedCard, token) => {
  const deleteItem = fetch(`${baseUrl}/items/${selectedCard.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return deleteItem;
};

/* -------------------------------- LIKE item ------------------------------- */

export const addCardLike = (id, user, token) => {
  const addCardLike = fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user }),
  }).then(checkResponse);
  return addCardLike;
};

/* ------------------------------- UNLIKE item ------------------------------ */

export const removeCardLike = (id, user, token) => {
  const removeCardLike = fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user }),
  }).then(checkResponse);
  return removeCardLike;
};
