const axios = require("axios");

const fetchDataset = () =>
  axios
    .get("https://raw.githubusercontent.com/despo/hangman/master/words")
    .then((res) => res.data)
    .then((text) => text.toLowerCase().split("\n"));

const startGame = () =>
  axios
    .post("http://hangman-api.herokuapp.com/hangman")
    .then((res) => res.data);

const guessLetter = (letter, token) =>
  axios
    .put(
      "http://hangman-api.herokuapp.com/hangman",
      new URLSearchParams({ letter, token }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    )
    .then((res) => res.data);

module.exports = {
  fetchDataset,
  startGame,
  guessLetter,
};
