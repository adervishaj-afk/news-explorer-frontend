import { BASE_URL } from "../utils/constants";

// Function to handle the server response
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// Sign up user (register)
const signup = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }), // Sending name, email, and password
  }).then(handleServerResponse);
};

// Sign in user (login)
const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // Sending email and password
  }).then(handleServerResponse);
};

export const auth = {
  signup,
  signin,
};
