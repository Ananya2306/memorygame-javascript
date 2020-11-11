var sourceArray = ["imgs/guess1.jpg", "imgs/guess2.jpg", "imgs/guess3.jpg"]
var guessesElementNumbers = [1, 2, 3, 4, 5, 6]

function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// DOM Elements:

var guesses = document.getElementsByClassName("guess")

shuffledSourcesArray = shuffleArray(sourceArray)
shuffledGuessesElArray = shuffleArray(guessesElementNumbers)

var cards = document.getElementsByClassName("card")

guesses[guessesElementNumbers[0] -1].src = shuffledSourcesArray[0]
guesses[guessesElementNumbers[1] -1].src = shuffledSourcesArray[1]
guesses[guessesElementNumbers[2] -1].src = shuffledSourcesArray[0]
guesses[guessesElementNumbers[3] -1].src = shuffledSourcesArray[2]
guesses[guessesElementNumbers[4] -1].src = shuffledSourcesArray[1]
guesses[guessesElementNumbers[5] -1].src = shuffledSourcesArray[2]

var card1 = document.getElementById("card1")
var card2 = document.getElementById("card2")
var card3 = document.getElementById("card3")
var card4 = document.getElementById("card4")
var card5 = document.getElementById("card5")
var card6 = document.getElementById("card6")

// Variables needed

var cardsArray = [card1, card2, card3, card4, card5, card6]

var count = 0
var guessCount = 0;
var round = -2
var previousGuessesImages = []
var previousCards = []

checkIfCard = () => {
  checkifFinished()
  if (count == 2) {
    if (previousGuessesImages[0 + round] == previousGuessesImages[1 + round]) {
      alert("You guessed")
      count = 0
      guessCount++;
      checkifFinished()
    } else {
      let guessToFind1 = "guess" + String(previousCards[0 + round])
      let guessToFind2 = "guess" + String(previousCards[1 + round])
      let imgToFind1 = "img" + String(previousCards[0 + round])
      let imgToFind2 = "img" + String(previousCards[1 + round])
      sleep(500).then(() => {
        document.getElementById(imgToFind1).style.display = "inline";
        document.getElementById(imgToFind2).style.display = "inline";
        document.getElementById(guessToFind1).style.display = "none"
        document.getElementById(guessToFind2).style.display = "none"
        console.log(imgToFind1,imgToFind2,guessToFind1, guessToFind2)
        count = 0
      })
    }
  } else {
    return;
  }
}

var checkifFinished = () => {
  if (guessCount == 3) {
    overlayTextOn()
    document.getElementById("text2").addEventListener("click", () => {
      document.location.reload(true)
    })
  }
}

for (let item of cardsArray) {
  item.addEventListener("click", () => {
      var cardNumber = item.id[4]
      var clickedGuess = document.getElementById("guess" + cardNumber)
      var clickedImage = document.getElementById("guess" + cardNumber).src
      previousCards.push(cardNumber)
      previousGuessesImages.push(clickedImage)
      clickedGuess.style.display = "inline";
      document.getElementById("img" + cardNumber).style.display = "none"
      count++;
      round++;
      checkIfCard()
  })
}