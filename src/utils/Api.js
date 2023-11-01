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
  const getItemsReq = fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
  return getItemsReq;
};

/* --------------------------- POST new item request --------------------------- */

export const addItem = ({ name, imageUrl, weather, token }) => {
  const addItemReq = fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
  return addItemReq;
};

/* --------------------------- DELETE item request -------------------------- */

export const deleteItem = (selectedCard, token) => {
  const deleteItemReq = fetch(`${baseUrl}/items/${selectedCard._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return deleteItemReq;
};

/* -------------------------------- PUT item like request ------------------------------- */

export const addCardLike = (id, user, token) => {
  const addCardLikeReq = fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user }),
  }).then(checkResponse);
  return addCardLikeReq;
};

/* ------------------------------- DELETE item like request ------------------------------ */

export const removeCardLike = (id, user, token) => {
  const removeCardLikeReq = fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user }),
  }).then(checkResponse);
  return removeCardLikeReq;
};
