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
  }).then(checkResponse);
  return getItems;
};

/* --------------------------- POST items request --------------------------- */

export const addItem = ({ name, imageUrl, weather }) => {
  const addItem = fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
  return addItem;
};

/* --------------------------- DELETE item request -------------------------- */

export const deleteItem = (selectedCard) => {
  const deleteItem = fetch(`${baseUrl}/items/${selectedCard.id}`, {
    method: "GET",
  }).then(checkResponse);
  return deleteItem;
};
