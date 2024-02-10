function ticTacToe() {}

ticTacToe.prototype = {
  propert() {
    this.game = document.querySelector(".game");
    this.position = document.querySelectorAll(".cell");
    this.button = document.getElementById("buttonMove");
    this.arr = ["", "", "", "", "", "", "", "", ""];
    this.label = document.querySelector("#label");
    this.anim = document.querySelectorAll(".off");

    this.playerMove = true;
    this.playerWin = false;
    this.LENGTH = this.arr.length;
  },

  clickBot() {
    if (!this.playerWin) {
      if (this.arr.every((cell) => cell !== "")) {
        this.checkWin();
        return;
      }
      let botMove = Math.floor(Math.random() * 8);
      while (this.arr[botMove] !== "") {
        botMove = Math.floor(Math.random() * 8);
      }
      const botCell = document.querySelectorAll(".cell")[botMove];
      botCell.classList.add("bot");
      botCell.classList.add("on");
      botCell.textContent = "O";
      botCell.classList.remove("off");
      this.arr[botMove] = "O";
      this.playerMove = true;
    }
  },

  clickPlayer(event) {
    console.log(this.anim);
    if (this.playerMove) {
      const clickedCell = event.target;
      const cellIndex = Array.from(this.position).indexOf(clickedCell);
      this.arr[cellIndex] = "X";
      clickedCell.textContent = "X";
      clickedCell.classList.add("on");
      clickedCell.classList.remove("off");
      clickedCell.classList.add("player");
      this.playerMove = false;
    }
    if (!this.playerMove) {
      this.checkWin();
      setTimeout(this.clickBot(), 5000);
      this.playerMove = true;
    }
    this.checkWin();
  },

  intervalAnim() {
    setTimeout(() => {
      this.label.classList.remove("label-bot");
      this.label.classList.remove("label-player");
      this.label.textContent = "";
    }, 500);
  },

  clickButton() {
    this.label.style.animation = "none";
    this.label.style.animation =
      "animButtonOnetoZero 0.5s ease-in-out forwards";
    this.arr = ["", "", "", "", "", "", "", "", ""];
    this.position.forEach((item) => {
      item.classList.remove("player");
      item.classList.remove("bot");
      item.classList.remove("finish");
      item.textContent = "";
    });
    this.button.style.animation =
      "animButtonOnetoZero 0.5s ease-in-out forwards";
    this.playerWin = false;
  },

  checkWin() {
    let weightArr = this.arr.filter((el) => el !== "").length;
    if (
      (this.arr[0] === "X" && this.arr[1] === "X" && this.arr[2] === "X") ||
      (this.arr[3] === "X" && this.arr[4] === "X" && this.arr[5] === "X") ||
      (this.arr[6] === "X" && this.arr[7] === "X" && this.arr[8] === "X") ||
      (this.arr[0] === "X" && this.arr[3] === "X" && this.arr[6] === "X") ||
      (this.arr[1] === "X" && this.arr[4] === "X" && this.arr[7] === "X") ||
      (this.arr[2] === "X" && this.arr[5] === "X" && this.arr[8] === "X") ||
      (this.arr[0] === "X" && this.arr[4] === "X" && this.arr[8] === "X") ||
      (this.arr[2] === "X" && this.arr[4] === "X" && this.arr[6] === "X")
    ) {
      this.position.forEach((el) => el.classList.add("finish"));
      this.button.style.animation =
        "animButtonZerotoOne 3s  cubic-bezier(0.5, 0.5, 0.4, 1.2) forwards";
      this.label.textContent = "Вы победили!";
      this.label.setAttribute("class", "label-player");
      this.playerWin = true;
      this.label.style.animation = "animButtonZerotoOne 0.7s ease-in-out ";
    } else if (
      (this.arr[0] === "O" && this.arr[1] === "O" && this.arr[2] === "O") ||
      (this.arr[3] === "O" && this.arr[4] === "O" && this.arr[5] === "O") ||
      (this.arr[6] === "O" && this.arr[7] === "O" && this.arr[8] === "O") ||
      (this.arr[0] === "O" && this.arr[3] === "O" && this.arr[6] === "O") ||
      (this.arr[1] === "O" && this.arr[4] === "O" && this.arr[7] === "O") ||
      (this.arr[2] === "O" && this.arr[5] === "O" && this.arr[8] === "O") ||
      (this.arr[0] === "O" && this.arr[4] === "O" && this.arr[8] === "O") ||
      (this.arr[2] === "O" && this.arr[4] === "O" && this.arr[6] === "O")
    ) {
      this.position.forEach((el) => el.classList.add("finish"));
      this.button.style.animation =
        "animButtonZerotoOne 3s  cubic-bezier(0.5, 0.5, 0.4, 1.2) forwards";
      this.label.setAttribute("class", "label-bot");
      this.label.textContent = "Вы проиграли!";
      this.label.style.animation =
        "animButtonZerotoOne 0.5s ease-in-out forwards";
    } else if (weightArr === 9) {
      this.position.forEach((el) => el.classList.add("finish"));
      this.button.style.animation =
        "animButtonZerotoOne 3s  cubic-bezier(0.5, 0.5, 0.4, 1.2) forwards";
      this.label.style.animation =
        "animButtonZerotoOne 0.5s ease-in-out forwards";
      this.label.setAttribute("class", "label-bot");
      this.label.textContent = "Ничья!";
    }
  },

  eventlist() {
    this.position.forEach((item) => {
      item.addEventListener("click", this.clickPlayer.bind(this));
    });
    this.button.addEventListener("click", this.clickButton.bind(this));
  },

  init() {
    this.propert();
    this.eventlist();
  },
};

const game = new ticTacToe();
game.init();
