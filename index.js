/* 
    todo: You can ignore it it's just a start
    Create two variables, firstCard and secondCard.
    Set their values to a random number between 2-11
    Declare a variable called message and assign its value to an empty string
    let firstCard = 6;
    let secondCard = 4;
*/
let playerCards = [0, 0];
let playerSum = 0;
let dealerCards = [0, 0];
let dealerSum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = " ";
let messageEL = document.getElementById("msg-el");
let playerSumEl = document.getElementById("player-sum");
let playerCardEl = document.getElementById("player-cards");
let dealerSumEl = document.getElementById("dealer-sum");
let restartBtn = document.getElementById("restart-btn");
let newBtn = document.getElementById("new-btn");
let startBtn = document.getElementById("start-btn");

//To get Random values for cards
function getRandomCard() {
  //Math.floor(Math.random() * (max - min + 1)) + min, here min=1 and max= 13 is fixed
  let randomNumber = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
  //if we get 1 return it as 11. as per the game rule for ACE card we can use either 1 or 11 but here will take 11, This will end game so fast so I'm skiping it
  //if we get 11-13 return as 10. as per the game rule for face cards like king queen and jack we have to use 10
  if (randomNumber > 10) {
    return 10;
  } else {
    return randomNumber;
  }
}

//This is a basic setup for game
function baseSetup() {
  //if you don't use this it will give you repeatated value
  playerCardEl.textContent = "Your Cards : ";
  // Create a for loop that renders out all the player's cards instead of just two
  for (let i = 0; i < playerCards.length; i++) {
    playerCardEl.textContent += playerCards[i] + " ";
  }
  //Render out all player's cards we have
  playerSumEl.textContent = "Your Sum : " + playerSum;

  //Render out all the Dealer's card
  dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

  /* 
  Write the conditional according to these rules:
  if sum === 0 -> Pick Up the Cards? 😉
  if less than or equal to 20 -> "Do you want to draw a new card? 🙂"
  else if exactly 21 -> "Wohoo! You've got Blackjack! 🥳"
  else -> "You're out of the game! 😭"
  Reassign the message variable to the string we're logging out

    if (playerSum === 0) {
      console.log("Pick Up the Cards? 😉");
      message = "Pick Up the Cards? 😉";
    } else if (playerSum < 21) {
      console.log("Do you want to draw a new card? 🙂");
      message = "Do you want to draw a new card? 🙂";
    } else if (playerSum === 21) {
      console.log("Wohoo! You've got Blackjack! 🥳");
      hasBlackJack = true;
      message = "Wohoo! You've got Blackjack! 🥳";
      showRestartButton();
      hideNewButton();
    } else {
      console.log("You're out of the game! 😭");
      isAlive = false;
      message = "You're out of the game! 😭";
      showRestartButton();
      hideNewButton();
    }
    */

  //Added above code in seperate funtion for more clarity
  determineGameOutcome();
  messageEL.textContent = message;

  /*
  Cash Out!
  console.log("Found BlackJack : " + hasBlackJack);

  Dead Dude!!
  console.log("Dead Or Alive : " + isAlive);

  Message
  console.log(message);
  */

  // Cards
  console.log("   Player's Cards : " + playerCards);
  // Cards
  console.log("   Dealer's Cards : " + dealerCards);
}

//Start Game
function startGame() {
  //When we click on start or new card we see page is not getting refreshed so now will add value here not outside of startGame function
  //Player's Value
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  playerCards = [firstCard, secondCard];
  playerSum = firstCard + secondCard; // Create a variable, sum, and set it to the sum of the two cards

  //Dealer's value
  let dealerCard1 = getRandomCard();
  let dealerCard2 = getRandomCard();
  dealerCards = [dealerCard1, dealerCard2];
  dealerSum = dealerCard1 + dealerCard2;

  hasBlackJack = false;
  isAlive = true;

  showNewButton();
  hideStartButton();
  hideRestartButton();
  baseSetup();
}

//Draw New Card
function newCard() {
  //console.log("Drawing a new card from the deck!");
  // Only allow the player to get a new card if player is alive and does NOT have Blackjack
  if (isAlive === true && hasBlackJack === false) {
    // Create a card variable, and hard code its value to a number (2-11)
    // Add the new card to the sum variable
    // Push the card to the cards array
    let playerCard = getRandomCard();
    playerSum = playerSum + playerCard;
    playerCards.push(playerCard);

    let dealerCard = getRandomCard();
    dealerSum = dealerSum + dealerCard;
    dealerCards.push(dealerCard);

    // Call startGame()
    baseSetup();
  }
}

// Determine End Game
function determineGameOutcome() {
  if (playerSum === 21 && dealerSum !== 21) {
    //Player Hit 21 -- working fine
    message = "Wohoo! You've got Blackjack! 🥳";
    hasBlackJack = true;
    isAlive = false;
    showRestartButton();
    hideNewButton();
  } else if (dealerSum === 21 && playerSum !== 21) {
    //Dealer Hit 21 -- working fine
    message = "You Lose ! Dealer has Blackjack! 😿";
    isAlive = false;
    showRestartButton();
    hideNewButton();
  } else if (playerSum < 21 && dealerSum > 21) {
    message = "Dealer busts! You win! 🥹";
    showRestartButton();
    hideNewButton();
  } else if (playerSum > 21 && dealerSum < 21) {
    message = "You Busted! 🫢";
    isAlive = false;
    showRestartButton();
    hideNewButton();
  } else if (playerSum === 0) {
    //after restart it reset value to 0 --- working fine
    message = "Pick Up the Cards?🃏";
    console.log("Pick Up the Cards?🃏");
  } else if (playerSum > 21 && dealerSum > 21) {
    message = "Noone Win! 🥱";
    isAlive = false;
    showRestartButton();
    hideNewButton();
  } else {
    message = "Do you want to draw a new card? 😉";
  }
}

//Restart the Game
function restartGame() {
  dealerCards = [0, 0];
  dealerSum = 0;
  playerCards = [0, 0];
  playerSum = 0;
  hasBlackJack = false;
  isAlive = false;
  showStartButton();
  hideRestartButton();
  baseSetup();
}

//Restart Button Visibility
function showRestartButton() {
  restartBtn.style.display = "inline-block";
}

function hideRestartButton() {
  restartBtn.style.display = "none";
}

//New Button Visibility
function showNewButton() {
  newBtn.style.display = "inline-block";
}

function hideNewButton() {
  newBtn.style.display = "none";
}

//Start Button Visibility
function showStartButton() {
  startBtn.style.display = "inline-block";
}

function hideStartButton() {
  startBtn.style.display = "none";
}
