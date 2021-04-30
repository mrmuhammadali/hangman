const getFrequentLetter = (dataset, hangman) => {
  const frequencyMap = new Map();
  dataset.forEach((word) => {
    word.split("").forEach((letter) => {
      frequencyMap.set(letter, (frequencyMap.get(letter) || 0) + 1);
    });
  });

  const sortedFrequencies = [...frequencyMap.entries()].sort(
    (a, b) => b[1] - a[1],
  );

  return sortedFrequencies.find(([letter]) => !hangman.includes(letter))[0];
};

module.exports = {
  getFrequentLetter,
};
