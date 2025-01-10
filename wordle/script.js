// Initial setup
const board = document.getElementById('board');
const keyboard = document.getElementById('keyboard');

// Create the game board
function createBoard() {
  for (let i = 0; i < 30; i++) { // 6 rows of 5 letters
    const tile = document.createElement('div');
    tile.classList.add('tile');
    board.appendChild(tile);
  }
}

// Create the keyboard
function createKeyboard() {
  const keys = "qwertyuiopasdfghjklzxcvbnm".split('');
  keys.push("OK");
  keys.forEach(key => {
    const button = document.createElement('button');
    button.textContent = key;
    button.dataset.key = key;
    keyboard.appendChild(button);
  });
}

// Initialize the game
function initGame() {
  createBoard();
  createKeyboard();
}

initGame();

// Load words from JSON
 fetch('words.json')
   .then(response => response.json())
   .then(data => {
     const words = data.words;
     console.log(words); // Access the word list
   })
   .catch(error => console.error('Error loading words:', error));

// Submit the current guess
function submitGuess() {
  if (currentGuess.length < 5) {
    alert("Not enough letters!");
    return;
  }

  if (!words.includes(currentGuess)) {
    alert("Word not in list!");
    return;
  }

  // Check the guess against the answer
  const guessLetters = currentGuess.split('');
  const answerLetters = answer.split('');

  // Track letter matches
  const colorFeedback = new Array(5).fill('absent');

  // First pass: check for correct letters in correct positions
  guessLetters.forEach((letter, index) => {
    if (letter === answerLetters[index]) {
      colorFeedback[index] = 'correct';
      answerLetters[index] = null; // Remove matched letter
    }
  });

  // Second pass: check for correct letters in incorrect positions
  guessLetters.forEach((letter, index) => {
    if (colorFeedback[index] === 'absent' && answerLetters.includes(letter)) {
      colorFeedback[index] = 'present';
      answerLetters[answerLetters.indexOf(letter)] = null; // Remove matched letter
    }
  });

  // Apply colors to tiles
  guessLetters.forEach((letter, index) => {
    const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${index}"]`);
    tile.classList.add(colorFeedback[index]);
  });

  // Update keyboard colors
  guessLetters.forEach((letter, index) => {
    const keyButton = document.querySelector(`[data-key="${letter}"]`);
    if (!keyButton.classList.contains('correct')) {
      keyButton.classList.add(colorFeedback[index]);
    }
  });

  // Check for win or lose
  if (currentGuess === answer) {
    alert("You Win!");
    disableInput();
  } else if (currentRow === 5) {
    alert(`Game Over! The word was: ${answer}`);
    disableInput();
  }

  // Reset for next guess
  currentGuess = '';
  currentTile = 0;
  currentRow++;
}

// Disable further input after game ends
function disableInput() {
  const buttons = document.querySelectorAll('#keyboard button');
  buttons.forEach(button => button.removeEventListener('click', handleKeyClick));
}

// Initialize the game
function initGame() {
  createBoard();
  createKeyboard();
}

initGame();
