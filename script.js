// The Game Logic is divided into four stages:
// 1- place the mark on click in each cell
// 2- check for win; if any of the win combination is met
// 3- check for draw; if all the cells contains a class and the win case is not met
// 4- switch the Turns after each round

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn;
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");

cells.forEach((cell) => {
  cell.addEventListener("click", clickHandler, { once: true });
});

function clickHandler(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  // place the Mark
  // check for win
  // check for draw
  // switch the tunrs
  swapTurns();
  showHover();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function showHover() {
  const classHover = circleTurn ? CIRCLE_CLASS : X_CLASS;
  board.classList.add(classHover);
}
