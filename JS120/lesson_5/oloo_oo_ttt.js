let readline = require('readline-sync');

let Square = {
  UNUSED_SQUARE:   " ",
  HUMAN_MARKER:    "X",
  COMPUTER_MARKER: "O",
  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },
  getMarker() {
    return this.marker;
  },
  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },
  toString() {
    return this.marker;
  }
};
let squares = Object.create(Square).init();

let Board = {
  init() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter += 1) {
      this.squares[String(counter)] = Square.UNUSED_SQUARE;

    }
    return this;
  },
  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  },
  markSquareAt(key,marker) {
    squares.setMarker(marker);
    this.squares[key] = squares.marker;
  },
  isFull() {
    return this.unusedSquares().length === 0;
  },
  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key] === squares.UNUSED_SQUARE);
  },
  countMarkersFor(player,keys) {
    let markers = keys.filter(key => {
      return this.squares[key] === player.getMarker();
    });

    return markers.length;
  },
  displayWithClear() {
    console.clear();
    console.log('');
    console.log('');
    this.display();
  }
};

let board = Object.create(Board).init();

let Player = {
  init(marker) {
    this.marker = marker;
    return this;
  },
  getMarker() {
    return this.marker;
  }
};


let player = Object.create(Player);

let human = Object.create(player).init(Square.HUMAN_MARKER);
let computer = Object.create(player).init(Square.COMPUTER_MARKER);


let tttGame = {
  POSSIBLE_WINNING_ROWS: [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ],

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log('');
    console.log(human);
    console.log(computer);
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  },
  displayResults() {
    if (this.isWinner(human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  },

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = board.unusedSquares();
      const prompt = `Choose a square (${validChoices.join(", ")}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    board.markSquareAt(choice, human.getMarker());
  },
  computerMoves() {
    let validChoices = board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    board.markSquareAt(choice, computer.getMarker());
  },
  gameOver() {

    return board.isFull() || this.someoneWon();
  },
  someoneWon() {
    console.log('game');
    return this.isWinner(human) || this.isWinner(computer);
  },
  isWinner(player) {
    return tttGame.POSSIBLE_WINNING_ROWS.some(row => {
      return board.countMarkersFor(player,row) === 3;
    });
  },
  play() {
    this.displayWelcomeMessage();

    board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      board.displayWithClear();
    }

    board.displayWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  }
};
let TTTGame = Object.create(tttGame);


TTTGame.play();

