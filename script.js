// The Game Logic is divided into four stages:
// 1- place the mark on click in each cell
// 2- check for win; if any of the win combination is met
// 3- check for draw; if all the cells contains a class and the win case is not met
// 4- switch the Turns after each round

// Variables & Constants Menu
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
let circleTurn;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", clickHandler);
    cell.addEventListener("click", clickHandler, { once: true });
  });
  winningMessageElement.classList.remove("show");
  showHover();
}

function clickHandler(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // place the Mark
  placeMark(cell, currentClass);
  // check for win
  if (checkForWin(currentClass)) {
    showWinMessage();
    // check for draw
  } else if (checkForDraw()) {
    showDrawMessage();
  } else {
    // switch the tunrs
    swapTurns();
    showHover();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function showHover() {
  board.classList.remove("x");
  board.classList.remove("circle");

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkForWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function showWinMessage() {
  winningMessageText.innerText = `${circleTurn ? "O's  🌛" : "X's ⭐"}   Wins!`;
  winningMessageElement.classList.add("show");
}

function checkForDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function showDrawMessage() {
  winningMessageText.innerText = `Draw!  😐`;
  winningMessageElement.classList.add("show");
}
