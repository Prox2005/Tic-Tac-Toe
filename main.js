"use strict";
const gameBoard = [];

class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

class UI {
  form(display, display2) {
    const form = document.querySelector(".form");
    form.style.display = display;
    const overlay = document.querySelector(".overlay");
    overlay.style.display = display2;
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
    this.form("none", "none");
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

  win(player1, player2) {
    const title = document.querySelector(".main__title");
    const board = document.querySelector(".board");
    board.style.display = "none";
    const start = document.createElement("button");
    start.textContent = "Restart Game";
    start.classList.add("button", "main__start");
    const main = document.querySelector(".main");
    main.appendChild(start);
    start.addEventListener("click", function () {
      location.reload();
    });

    const cells = document.querySelectorAll(".cell");
    let x = 0;
    let o = 0;

    cells.forEach((cell) => {
      if (cell.textContent != "") {
        switch (cell.textContent) {
          case "x":
            x = x + 1;
            break;
          case "o":
            o = o + 1;
          default:
            break;
        }
        if (x > o) {
          title.textContent = `Congratulations ${player1.name}!😎`;
        } else {
          title.textContent = `Congratulations ${player2.name}!😎`;
        }
      }
    });
  }

  draw() {
    const board = document.querySelector(".board");
    board.style.display = "none";
    const title = document.querySelector(".main__title");
    title.textContent = "It's a Draw 🥲";
    const main = document.querySelector(".main");
    const start = document.createElement("button");
    start.textContent = "Restart Game";
    start.classList.add("button", "main__start");
    main.appendChild(start);
    start.addEventListener("click", function () {
      location.reload();
    });
  }
}

class Game {
  markSpot(player1, player2) {
    const cells = document.querySelectorAll(".cell");
    let activePlayer = 2;
    cells.forEach((cell) => {
      let boardArray = gameBoard;
      cell.addEventListener("click", function swithPlayer() {
        if (activePlayer === 1) {
          cell.textContent = player2.symbol;
          boardArray.push(player2.symbol);
          activePlayer = 2;
        } else if (activePlayer === 2) {
          cell.textContent = player1.symbol;
          boardArray.push(player1.symbol);
          activePlayer = 1;
        }
        cell.removeEventListener("click", swithPlayer);

        new Game().checkWinner(player1, player2);
      });
    });
  }

  checkWinner(player1, player2) {
    const combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const cells = document.querySelectorAll(".cell");
    for (let comb of combs) {
      if (
        cells[comb[0]].textContent == cells[comb[1]].textContent &&
        cells[comb[1]].textContent == cells[comb[2]].textContent &&
        cells[comb[0]].textContent != ""
      ) {
        new UI().win(player1, player2);
      } else if (
        cells[comb[0]].textContent !== cells[comb[1]].textContent &&
        cells[comb[1]].textContent !== cells[comb[2]].textContent &&
        gameBoard.length === 9
      ) {
        return new UI().draw();
      }
    }
  }
}

const startGame = document.querySelector(".main__start");
startGame.addEventListener("click", function () {
  new UI().form("flex", "block");
});

const submit = document.querySelector(".form");
submit.addEventListener("submit", function (e) {
  new UI().getData();
  e.preventDefault();
});
