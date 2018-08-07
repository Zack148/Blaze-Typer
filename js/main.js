window.addEventListener('load', function(){
  init('easy')
});

// levels
const levels = {
  easy: 30,
  medium: 20,
  hard: 10
}
var currentLevel, time, score, isPlaying, countdownInterval, checkStatusInterval, words, currentWordIndex,



const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

// init game
async function init(difficulty) {
  words = await getWords(100);
  currentWordIndex = 0
  currentLevel = levels[difficulty]
  time = currentLevel;
  score = 0;
  console.log(words);

  if (countdownInterval) clearInterval(countdownInterval)
  if (checkStatusInterval) clearInterval(checkStatusInterval)
  //show number of seconds in ui
  seconds.innerHTML = currentLevel;
  //Load word from array
  showWord(words);
  //start matching on word input
  wordInput.addEventListener('input', startMatch);
  //Call countdown every second
  countdownInterval = setInterval(countdown, 1000);
  //check status
  checkStatusInterval = setInterval(checkStatus, 50);


}

function getWords(numberOfWords, lengthOfWord) {
  return new Promise(function(resolve, reject) {
    fetch('https://random-words-api.herokuapp.com/' + numberOfWords + '/' + lengthOfWord)
    .then(res => res.json())
    .then(myJson => resolve(myJson))
    .catch(err => console.log(err))
  });
}

//start match
function startMatch() {
  if(matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

//match current word to word input
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

//Pick & show random word
function showWord(words) {
  //output random word
  if (currentWordIndex < words.length) {
    currentWord.innerHTML = words[currentWordIndex]
    currentWordIndex++;
  }
  if (currentWordIndex === words.length) {
    message.innerHTML = 'You Win';
  }
  //generate random array

}

//Countdown Timer
function countdown() {
  //check time != 0
  if(time > 0) {
    //decrement
    time--;
  } else if(time === 0){
    isPlaying = false;
  }
  if (typeof time !== 'undefined') {
    timeDisplay.innerHTML = time;
  } else {
    timeDisplay.innerHTML = 0;
  }

}

//check status
function checkStatus() {
  if(!isPlaying && time === 00) {
    message.innerHTML = 'Game Over';
    score = -1;
  }
}
