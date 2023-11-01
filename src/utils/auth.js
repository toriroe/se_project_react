const baseUrl = "http://localhost:3001";
import { checkResponse } from "./Api";

/* ---------------------------- Sign In Request --------------------------- */

export const signIn = ({ email, password }) => {
  const signInReq = fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
  return signInReq;
};

/* ---------------------------- Sign Up request --------------------------- */

export const register = ({ name, avatar, email, password }) => {
  const registerReq = fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
  return registerReq;
};

/* ------------------------------- Check Token request ------------------------------ */

export const getContent = (token) => {
  const getContentReq = fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return getContentReq;
};

/* ------------------------------ Edit Profile request ------------------------------ */

export const editProfile = ({ name, avatar, _id, token }) => {
  const editProfileReq = fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar, _id }),
  }).then(checkResponse);
  return editProfileReq;
};
