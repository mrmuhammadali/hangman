const axios = require("axios");
const fs = require("fs");

const api = require("./api");
const dataset = require("./dataset.json");
const utils = require("./utils");

/*
 We can use loop here instead of recursion to avoid adding the calls to call stack.
*/
const guessLetter = async (letter, token, incorrectCount, dataset) => {
  if (incorrectCount >= 7) {
    return false;
  }
  try {
    const { hangman, token: updatedToken, correct } = await api.guessLetter(
      letter,
      token,
    );
    console.log(`Dataset size = ${dataset.length}`);
    console.log(
      `Guessed Letter = ${letter} ~ ${correct}, Incorrect Count = ${incorrectCount}`,
    );
    console.log(`Current state: ${hangman}`);
    console.log("------------------------------------------------");

    if (correct) {
      if (!hangman.includes("_")) {
        return true;
      }
      const regex = new RegExp(hangman.replace(/_/g, "."));
      const filteredDataset = dataset.filter((word) => word.match(regex));
      const frequentLetter = utils.getFrequentLetter(filteredDataset, hangman);

      return guessLetter(
        frequentLetter,
        updatedToken,
        incorrectCount,
        filteredDataset,
      );
    } else {
      const regex = new RegExp(letter, "g");
      const filteredDataset = dataset.filter((word) => !word.match(regex));
      const frequentLetter = utils.getFrequentLetter(filteredDataset, hangman);

      return guessLetter(
        frequentLetter,
        updatedToken,
        incorrectCount + 1,
        filteredDataset,
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const winHangman = async () => {
  try {
    const { hangman, token } = await api.startGame();
    console.log(`Game started: ${hangman}`);
    const filteredDataset = dataset.filter(
      (word) => word.length === hangman.length,
    );
    const frequentLetter = utils.getFrequentLetter(filteredDataset, hangman);
    const hasWon = await guessLetter(frequentLetter, token, 0, filteredDataset);
    console.log(hasWon ? "won" : "lost");
  } catch (error) {
    console.error(error);
  }
};

winHangman();

// Stored the data in dataset.json to debug the code quickly without waiting for api call to complete
const cacheDataset = async () => {
  const datasetResponse = await api.fetchDataset();
  fs.writeFile("dataset.json", JSON.stringify(datasetResponse), (err) => {
    if (!err) {
      console.log("Saved dataset!!");
    }
  });
};

// cacheDataset();
