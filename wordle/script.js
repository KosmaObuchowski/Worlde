// Initial setup
const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
let currentGuess = "";
let currentRow = 0;
let currentTile = 0;
let answer = "";
// List of words 
let words = [
  "about", "above", "actor", "apple", "alert", "album", "alter", "angle", "arena",
  "arrow", "basic", "beach", "begin", "black", "block", "board", "brain", "brand",
  "bread", "break", "brick", "bring", "broad", "brown", "build", "buyer", "cable",
  "camel", "candy", "carry", "catch", "cause", "chain", "chair", "chart", "check",
  "chess", "chief", "child", "china", "chose", "civil", "claim", "class", "clean",
  "clear", "click", "clock", "close", "coach", "color", "comet", "count", "cover",
  "craft", "crazy", "cream", "crime", "cross", "crowd", "curve", "dance", "death",
  "debut", "delay", "depth", "devil", "doubt", "dozen", "draft", "drama", "dream",
  "dress", "drink", "drive", "early", "earth", "eagle", "elite", "empty", "enter",
  "equal", "error", "event", "exact", "exist", "extra", "faith", "fault", "favor",
  "feast", "fence", "field", "final", "first", "fixed", "flash", "floor", "flour",
  "focus", "force", "frame", "fresh", "front", "frost", "fruit", "giant", "glass",
  "globe", "grace", "grand", "grant", "grape", "grass", "green", "group", "guard",
  "guess", "guest", "guide", "habit", "heart", "heavy", "honor", "hotel", "house",
  "human", "humor", "ideal", "image", "index", "inner", "input", "issue", "joker",
  "joint", "jolly", "jumpy", "judge", "juice", "karma", "kneel", "knife", "knock",
  "known", "label", "large", "laugh", "layer", "learn", "leave", "level", "light",
  "limit", "local", "lodge", "logic", "loose", "lucky", "lunch", "magic", "major",
  "maker", "march", "match", "media", "metal", "might", "minor", "model", "money",
  "month", "motor", "mount", "movie", "music", "naked", "nerve", "never", "night",
  "noise", "north", "novel", "ocean", "offer", "often", "order", "other", "outer",
  "owner", "paint", "panel", "paper", "party", "peace", "phone", "photo", "piece",
  "place", "plane", "plant", "plate", "point", "pound", "power", "press", "price",
  "pride", "prime", "print", "prize", "proof", "proud", "queen", "query", "quick",
  "quiet", "radio", "raise", "range", "reach", "ready", "relax", "reply", "reset",
  "rider", "right", "river", "robot", "rocky", "round", "royal", "rural", "salad",
  "scale", "scare", "scene", "scoop", "score", "sense", "serve", "seven", "shade",
  "share", "sharp", "sheep", "shelf", "shift", "shine", "shock", "shore", "short",
  "sight", "skill", "sleep", "slice", "slide", "small", "smart", "smile", "solid",
  "solve", "sorry", "sound", "space", "spare", "speak", "speed", "spend", "spicy",
  "spike", "spill", "spine", "split", "spoil", "sport", "spray", "stand", "start",
  "state", "steam", "steal", "steel", "stone", "store", "storm", "story", "strap",
  "street", "style", "sugar", "sunny", "super", "table", "taken", "taste", "teach",
  "teeth", "thank", "theme", "there", "thing", "think", "third", "tiger", "tight",
  "timer", "toast", "topic", "total", "touch", "tower", "toxic", "trace", "track",
  "trade", "train", "treat", "trend", "trial", "tribe", "trick", "trust", "truth",
  "uncle", "under", "union", "unity", "upper", "urban", "value", "video", "villa",
  "visit", "vocal", "voice", "voter", "wagon", "water", "watch", "waste", "wheel",
  "where", "which", "while", "white", "whole", "whose", "woman", "world", "worry",
  "wound", "write", "wrong", "young", "youth"
];

// Select a random word as the answer
answer = words[Math.floor(Math.random() * words.length)];
console.log("Word list loaded, total words:", words.length);
console.log("Answer:", answer); 
initGame(); // Initialize the game

// Create the game board
function createBoard() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.row = i;
      tile.dataset.col = j;
      board.appendChild(tile);
    }
  }
}

// Create the keyboard
function createKeyboard() {
  const keys = [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter",
    "z", "x", "c", "v", "b", "n", "m", "Backspace",
  ];
  keys.forEach((key) => {
    const button = document.createElement("button");
    button.textContent = key;
    button.dataset.key = key;
    keyboard.appendChild(button);
    button.addEventListener("click", () => handleInput(key));
  });
}

// Handle input (both keyboard and on-screen)
function handleInput(key) {
  if (key === "Enter") {
    submitGuess();
  } else if (key === "Backspace") {
    if (currentTile > 0) {
      currentTile--;
      currentGuess = currentGuess.slice(0, -1);
      updateTile(currentRow, currentTile, "");
    }
  } else if (currentTile < 5 && /^[a-zA-Z]$/.test(key)) {
    updateTile(currentRow, currentTile, key.toLowerCase());
    currentGuess += key.toLowerCase();
    currentTile++;
  }
}

// Update tile content
function updateTile(row, col, letter) {
  const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  tile.textContent = letter;
}
// Submiting Guesses
function submitGuess() {
  if (currentGuess.length < 5) {
    alert("Not enough letters!");
    return;
  }

  console.log("Current guess:", currentGuess); // Debugging
  console.log("Is word in list?", words.includes(currentGuess)); // Debugging

  // Check if the word is in the list
  if (!words.includes(currentGuess)) {
    alert("Word not in list!");
    return;
  }

  // Check the guess against the answer
  const guessLetters = currentGuess.split("");
  const answerLetters = answer.split("");

  // Track letter matches
  const colorFeedback = new Array(5).fill("absent");

  // First pass: check for correct letters in correct positions
guessLetters.forEach((letter, index) => {
  const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${index}"]`);
  
  if (letter === answerLetters[index]) {
    colorFeedback[index] = "correct";  // Mark as correct if the letter matches at the correct position
    answerLetters[index] = null; // Remove letter from answer to prevent it from being reused
  }
});
  // Second pass: check for correct letters in incorrect positions
guessLetters.forEach((letter, index) => {
  // Only check for "present" if it wasn't marked as "correct" already
  if (colorFeedback[index] === "absent" && answerLetters.includes(letter)) {
    colorFeedback[index] = "present";  // Mark as present if the letter exists in the word but in the wrong position
    answerLetters[answerLetters.indexOf(letter)] = null; // Remove the letter from the answer to prevent reuse
  }
});

// Apply colors to tiles (update only the board)
guessLetters.forEach((letter, index) => {
  const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${index}"]`);
  tile.classList.add(colorFeedback[index]); // Add the appropriate class to each tile
});

  // Check for win or lose
  if (currentGuess === answer) {
    alert("You Win!");
    disableInput();
  } else if (currentRow === 5) {
    alert(`Game Over! The word was: ${answer}`);
    disableInput();
  } else {
    // Reset for next guess
    currentGuess = "";
    currentTile = 0;
    currentRow++;
  }
}

// Disable further input after game ends
function disableInput() {
  document.removeEventListener("keydown", handleKeyDown);
  const buttons = document.querySelectorAll("#keyboard button");
  buttons.forEach((button) => button.removeEventListener("click", handleInput));
}

// Handle physical keyboard input
function handleKeyDown(event) {
  handleInput(event.key);
}

// Initialize the game
function initGame() {
  createBoard();
  createKeyboard();
  document.addEventListener("keydown", handleKeyDown);
}
