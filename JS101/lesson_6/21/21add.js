const readline = require('readline-sync');
const SUITS = ['H', 'D', 'S', 'C'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const MATCH_VALUE = 21;
const DEALER_VALUE = 17;
const UPDATE_SCORE_VALUE = 1;

function prompt(message) {
  console.log(`=> ${message}`);
}

// shuffle an array
function shuffle(array) {
  for (let first = array.length - 1; first > 0; first--) {
    let second = Math.floor(Math.random() * (first + 1)); // random index from 0 to i
    [array[first], array[second]] = [array[second], array[first]]; // swap elements
  }

  return array;
}

function initalizeDeck() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
    let suit = SUITS[suitIndex];

    for (let valueIndex = 0; valueIndex < VALUES.length; valueIndex++) {
      let value = VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }

  return shuffle(deck);
}

function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === "A").forEach(_ => {
    if (sum > MATCH_VALUE) sum -= 10;
  });

  return sum;
}

function busted(cards) {
  return cards > MATCH_VALUE;
}

function resetScore(matchScore) {
  for (let player in matchScore) {
    matchScore[player] = 0;
  }
}

function detectResult(dealerTotal,playerTotal) {
  if (playerTotal > MATCH_VALUE) {
    return 'PLAYER_BUSTED';
  } else if (dealerTotal > MATCH_VALUE) {
    return 'DEALER_BUSTED';
  } else if (dealerTotal < playerTotal) {
    return 'PLAYER';
  } else if (dealerTotal > playerTotal) {
    return 'DEALER';
  } else {
    return 'TIE';
  }
}

function displayResults(dealerTotal, playerTotal,matchScore) {
  let result = detectResult(dealerTotal, playerTotal);
  switch (result) {
    case 'PLAYER_BUSTED':
      prompt('You busted! Dealer wins!');
      matchScore['DEALER'] += UPDATE_SCORE_VALUE;
      break;
    case 'DEALER_BUSTED':
      prompt('Dealer busted! You win!');
      matchScore['PLAYER'] += UPDATE_SCORE_VALUE;
      break;
    case 'PLAYER':
      prompt('You win!');
      matchScore['PLAYER'] += UPDATE_SCORE_VALUE;
      break;
    case 'DEALER':
      prompt('Dealer wins!');
      matchScore['DEALER'] += UPDATE_SCORE_VALUE;
      break;
    case 'TIE':
      prompt("It's a tie!");
  }
}

function playAgain(matchScore) {
  console.log('-------------');
  prompt(`Score: Player - ${matchScore['PLAYER']} Dealer - ${matchScore['DEALER']}`);
  prompt('The match is over!');
  if (checkScore(matchScore)) {
    prompt('Do you want to play another Match (y or n) ?');
    resetScore(matchScore);
  } else {
    prompt('Do you want to play again? (y or n)');
  }
  let answer = readline.question();
  while (true) {
    if (answer.toLowerCase() === 'y') {
      return true;
    } else if (answer.toLowerCase() === 'n') {
      return false;
    } else {
      prompt('Please input a valid answer');
      answer = readline.question();
    }
  }
}

function popTwoFromDeck(deck) {
  return [deck.pop(), deck.pop()];
}

function hand(cards) {
  return cards.map(card => `${card[1]}${card[0]}`).join(' ');
}

function endOutput(dealerCards, playerCards,dealerTotal,playerTotal) {
  console.log('==============');
  prompt(`Dealer has ${dealerCards} for a total of: ${dealerTotal}`);
  prompt(`Player has ${playerCards} for a total of: ${playerTotal}`);
  console.log('==============');
}

function checkScore(matchScore) {
  let check;
  for (let player in matchScore) {
    if (matchScore[player] === 5) {
      check = true;
    } else {
      check = false;
    }
  }
  return check;
}

let matchScore = {
  PLAYER: 0,
  DEALER:0
};

while (true) {
  prompt('Welcome to Whatever-One!');

  // declare and initialize vars
  let deck = initalizeDeck();
  let playerCards = [];
  let dealerCards = [];

  // initial deal
  playerCards.push(...popTwoFromDeck(deck));
  dealerCards.push(...popTwoFromDeck(deck));
  let playerTotal = total(playerCards);
  let dealerTotal = total(dealerCards);
  prompt(`Dealer has ${dealerCards[0]} and ?`);
  prompt(`You have: ${playerCards[0]} and ${playerCards[1]}, for a total of ${playerTotal}.`);

  // player turn
  while (true) {


    let playerTurn;
    while (true) {
      prompt('Would you like to (h)it or (s)tay?');
      playerTurn = readline.question().toLowerCase();
      if (['h', 's'].includes(playerTurn)) break;
      prompt("Sorry, must enter 'h' or 's'.");
    }

    if (playerTurn === 'h') {
      playerCards.push(deck.pop());
      playerTotal = total(playerCards);
      prompt('You chose to hit!');
      prompt(`Your cards are now: ${hand(playerCards)}`);
      prompt(`Your total is now: ${playerTotal}`);
    }

    if (playerTurn === 's' || busted(playerTotal)) break;
  }

  if (busted(playerTotal)) {
    endOutput(dealerCards, playerCards,dealerTotal,playerTotal);
    displayResults(dealerTotal, playerTotal,matchScore);

    if (playAgain(matchScore)) {
      continue;
    } else {
      break;
    }
  } else {
    prompt(`You stayed at ${playerTotal}`);
  }

  // dealer turn
  prompt('Dealer turn...');

  while (dealerTotal < DEALER_VALUE) {
    prompt(`Dealer hits!`);
    dealerCards.push(deck.pop());
    dealerTotal = total(dealerCards);
    prompt(`Dealer's cards are now: ${hand(dealerCards)}`);
  }

  if (busted(dealerTotal)) {
    prompt(`Dealer total is now: ${dealerTotal}`);
    displayResults(dealerCards, playerCards,matchScore);
    endOutput(dealerCards, playerCards,dealerTotal,playerTotal);
    if (playAgain(matchScore)) {
      continue;
    } else {
      break;
    }
  } else {
    prompt(`Dealer stays at ${dealerTotal}`);
  }

  // both player and dealer stays - compare cards!
  endOutput(dealerCards, playerCards,dealerTotal,playerTotal);

  displayResults(dealerCards, playerCards,matchScore);
  if (!playAgain(matchScore) || checkScore(matchScore))  break;
}

