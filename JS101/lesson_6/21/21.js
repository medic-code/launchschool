/*


Explicit Requirements
1. A deck has 52 cards with 4 suits
1.1 Hearts, Diamonds, Clubs and Spades
1.1.1 Each suit has 13 values (2-10, Jack, Queen, King, Ace)
2. Goal of 21 is to get as close to 21 as possible
2.1 Going over 21 is a bust
3. Game consists of dealer and player
3.1 Each participtant dealt two cards
3.2 Each player knows the 2 cards 
3.3 The player can only see one of the dealers cards
4. Numbered cards are worth face value 
4.1 Jack, Queen and King are worth 10
4.2 Ace can be worth 1 or 11 
4.2.1 Depends on hand being over 21 or not
4.2.2 If two aces are drawn then each 
ace has to evaluated in term
5. Player always goes first
5.1 Decide between hit or stay
5.2 Hit means dealt another card
6. The turn is over when the play is bust or stays
7. If the player busts, dealer wins
8. When player stays dealer moves
8.1 Dealer hits until atleast 17
8.2 If dealer busts then player wins
9. If both dealer and player stay then cards are compared
9.1 Total values are calculated and who has the highest value wins.

Pseudocode

1. Initalize deck
2. Deal cards to player and dealer
3. Player turn: hit or stay
  - Repeat until bust or stay
4. If player bust, dealer wins 
5. Dealer turn: hit or stay
  - Repeat until total >= 17
6. If dealer busts, player wins
7. Compare cards and declare winner

Data Structures

Deck: Nested Array
4 Sub array elements corresponding to 
H,D,C,S

Alternative
An array of numbers and strings 

  

Player cards: An array
Dealers cards: An array 

Calculating Aces 

1. Keep count of cards drawn total
2. Add 11 to that number
2.1 If that number is greater than 21 then Ace = 1
2.2 Else ace value is 11

Player Turn

Ask player to hit or stay
if stay, stop asking
otherwise go to #1

Shuffle Cards

Dealer Turn 
Similar to players turn 


Displaying Results 


*/

/*Algorithm
input: Nil
output: Nested Array
Explicit requirements
1. Create a deck of cards
2. There should be 52 array elements 
2.1 Each array element is itself a 2-array element
2.2 For each 2-array element the first index should appear
    13 times for each card face(H,J,S,D)
2.3 Each second index should be from 2 - 10, J,Q,K,A

Data structures
Nested array
using objects to create an array 

Algorithm
1. Create an object with keys corresponding to H,J,S,D
1.1 Object values correspond to 2-10, J,Q,K,A
2. Using the object entries method to create nested array.




*/
const readline = require('readline-sync');
function createDeck() {
  let cardsArr = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  let faceArr = ['H','J','S','D'];
  return faceArr.map(face => {
    return cardsArr.map(elem => [face,elem])
  }).flat();
}

function shuffle(array) {
  for (let index = array.length -1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random()* (index + 1));
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]];
  }
  return array
}

function dealCards(deck) {
  let randomIndex = Math.floor(Math.random()*(deck.length + 1));
  return deck.splice(randomIndex,1);
}

function initialCards(deck) {
  let cards = {
    "playerCards": [],
   "dealerCards": []
  }
  
  for (let i = 0; i <= 3; i++) {
    if (i % 2 == 0) {
      cards.playerCards.push(dealCards(deck).flat()[1]);
    } else {
      cards.dealerCards.push(dealCards(deck).flat()[1]);
    }
    
  }
  return cards
}

function keepCount(cards) {

  let sum = 0;
  cards.forEach(value => {
    if (value === 'A') {
      sum += 11;
    } else if (['J','K','Q'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  })
  cards.filter(value => value === 'A').forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}


function displayPlayerCards(cards) {
  console.log(cards);
  console.log(`You have: ${cards.join(',')}`)
}

function displayDealerCards(cards) {
 console.log(`Dealer has: ${cards[1]} and unknown card`);
}

function playerTurn(cards,deck) {
  console.log(cards.playerCards);
  while(true) {
    console.log('The count is ',keepCount(cards.playerCards));
    if (keepCount(cards.playerCards) > 21 ) {
      break
    }
    console.log("hit or stay?");
    let answer = readline.question();
    if (answer == 'stay') break;
    cards.playerCards.push(dealCards(deck).flat()[1]);
    displayPlayerCards(cards.playerCards);
    displayDealerCards(cards.dealerCards);
    
    } 
return keepCount(cards.playerCards) > 21 ? 'bust' : 'stay'
}

function dealerTurn(cards,deck) {
  console.log('Dealer Turn');
  while(true) {
    cards.push(dealCards(deck).flat()[1]);
    displayDealerCards(cards);
    if (keepCount(cards) > 21) {
      return 'Player Wins'
    } else if (keepCount(cards) < 17) {
      continue
    } else {
      return 'Stay';
    }
  }
}

function compare() {
  return keepCount(cards.dealerCards) >= keepCount(cards.playerCards) ? 'dealer' : 'player'
}

function displayWinner(display) {
  console.log(`${display} wins!`)
}


let deck = createDeck();
shuffle(deck);

let cards = initialCards(deck);
displayPlayerCards(cards.playerCards);
displayDealerCards(cards.dealerCards);
console.log(cards);
if (playerTurn(cards,deck) === 'bust') {
  console.log('Bust! You lost')
  return 'bust'
  } 
 
  let dealer = dealerTurn(cards.dealerCards,deck);
  if (dealer === 'Stay') {
    let result = compare()
    displayWinner(result);
  } else {
    console.log('player wins')
  }
 


