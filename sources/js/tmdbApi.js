import apiKey from "./apikey.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: apiKey,
  },
};

fetch("https://api.themoviedb.org/3/authentication", options)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
