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



// // Load words from JSON
// fetch('words.json')
  // .then(response => response.json())
  // .then(data => {
    // const words = data.words;
    // console.log(words); // Access the word list
  // })
  // .catch(error => console.error('Error loading words:', error));

// // OR Directly include it in your JS
// const words = [
  // "about", "above", "actor", "apple", "alert", "album", "alter", "angle", "arena", 
  // // ...rest of the list
// ];