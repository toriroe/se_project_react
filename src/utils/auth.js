const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

/* ---------------------------- Sign In Request --------------------------- */

export const signIn = ({ email, password }) => {
  const signIn = fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
  return signIn;
};

/* ---------------------------- Sign Up request --------------------------- */

export const register = ({ name, avatar, email, password }) => {
  const register = fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
  return register;
};

/* ------------------------------- Check Token request ------------------------------ */

export const getContent = (token) => {
  const getContent = fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return getContent;
};

/* ------------------------------ Edit Profile request ------------------------------ */

export const editProfile = ({ name, avatar, _id, token }) => {
  const editProfile = fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar, _id }),
  }).then(checkResponse);
  return editProfile;
};
