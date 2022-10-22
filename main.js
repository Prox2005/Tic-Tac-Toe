"use strict";

class Player {
  constructor(name) {
    this.name = name;
  }
  addName() {
    console.log("wil add name to the interface");
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
    const player1 = inputs[0].value;
    const player2 = inputs[1].value;
    this.form("hidden");
    form.reset();
    this.renderBoard(player1, player2);
  }

  renderBoard(player1, player2) {
    const board = document.querySelector(".board");
    const h1 = document.querySelector(".main__title");
    const start = document.querySelector(".main__start");
    board.style.display = "grid";
    h1.textContent = `${player1} vs ${player2}`;
    start.remove();
  }
}

class Game {
  constructor() {}

  markSpot() {
    console.log("will allow players to add marks to a specific spot");
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
  new UI().getData();
});
