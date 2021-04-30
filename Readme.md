## Hangman

### Game Requirements:
1. User can guess one letter at a time
2. User can have 7 wrong entries before the game is over
3. User cannot guess same letter more than once
4. User can guess letters from a-z


### Pseudocode:
1. Fetch Dataset
2. Start Game ~ hangman_string
3. filtered_words = Filter out the words based on hangman_string size
4. While incorrectCount &lt; 7
5. Guess char based on max frequency which is not already guessed
6. PUT guessed letter with latest token
7. If !correct = exclude all words based on guessed letter and update tries count 
8. If correct = include all words based on guessed indices
9. If (count < 7 && !hangman_string.includes(‘_’)) return win
10. Else return lost

{
  A: 1,
  N: 3,
  C: 4,
}


__a__

Email: badr@polly.ai