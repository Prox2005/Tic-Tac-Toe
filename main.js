"use strict";

class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

class UI {
  form(visibility) {
    const form = document.querySelector(".form");
    form.style.visibility = visibility;
    const overlay = document.querySelector(".overlay");
    overlay.style.visibility = visibility;
  }

  getData() {
    const form = document.querySelector(".form");
    const inputs = document.querySelectorAll(".input");
    const playerName1 = inputs[0].value;
    const playerName2 = inputs[1].value;
    const symbol1 = document.querySelector(".select-1").value;
    const symbol2 = document.querySelector(".select-2").value;

    const player1 = new Player(playerName1, symbol1);
    const player2 = new Player(playerName2, symbol2);

    this.form("hidden");
    this.renderBoard(player1, player2);
    form.reset();
  }

  renderBoard(player1, player2) {
    const board = document.querySelector(".board");
    const h1 = document.querySelector(".main__title");
    const start = document.querySelector(".main__start");
    board.style.display = "grid";
    h1.textContent = `${player1.name} vs ${player2.name}`;
    start.remove();

    new Game().markSpot(player1, player2);
  }
}

class Game {
  constructor() {
    this.gameBoard = [];
    // "X", "X", "O", "X", "O", "X", "X", "O", "X"
    this.activePlayer = 1;
  }

  markSpot(player1, player2) {
    const cells = document.querySelectorAll(".cell");
    let activePlayer = 2;
    cells.forEach((cell) => {
      cell.addEventListener("click", function () {
        if (activePlayer === 1) {
          cell.textContent = player2.symbol;
          activePlayer = 2;
        } else if (activePlayer === 2) {
          cell.textContent = player1.symbol;
          activePlayer = 1;
        }
      });
    });
  }

  checkWinner() {
    console.log("will check for a winner or draw");
  }
}

const startGame = document.querySelector(".main__start");
startGame.addEventListener("click", function () {
  new UI().form("visible");
});

const submit = document.querySelector(".form__submit");
submit.addEventListener("click", function (e) {
  e.preventDefault();
  new UI().getData();
});
