let questionPool = [
  {
    // the answers can be set to an array for easy access. but this example i'm using just object key/value.
    question: 'questions 1',
    answer1: 'answer1',
    answer2: 'answer2',
    answer3: 'answer3',
    answer4: 'correct',
    correct: 'answer4',
  },
  {
    question: 'questions 2',
    answer1: 'answer1',
    answer2: 'correct',
    answer3: 'answer3',
    answer4: 'answer4',
    correct: 'answer2',
  },
  {
    question: 'questions 3',
    answer1: 'correct',
    answer2: 'answer2',
    answer3: 'answer3',
    answer4: 'answer4',
    correct: 'answer1',
  },
  {
    question: 'questions 4',
    answer1: 'answer1',
    answer2: 'correct',
    answer3: 'answer3',
    answer4: 'answer4',
    correct: 'answer2',
  },
  {
    question: 'questions 5',
    answer1: 'answer1',
    answer2: 'answer2',
    answer3: 'correct',
    answer4: 'answer4',
    correct: 'answer3',
  },
];
let questionDisplay = document.querySelector('#question');
let questionContainer = document.querySelector('#question-container');
let timerDisplay = document.querySelector('#timer');
let viewScore = document.querySelector('#view-score');
let startBtn = document.querySelector('#startBtn');
let title = document.querySelector('#title');
let buttonContainer = document.querySelector('#button-container');
let answerBtn = buttonContainer.querySelectorAll('button');
let nameInput = document.querySelector('#name-input');
let highScore = document.querySelector('#high-score');
let renderScore = document.querySelector('#render-score');
let mainScreen = document.querySelector('#main-screen');
answerBtn[0].addEventListener('click', checkAnswer);
answerBtn[1].addEventListener('click', checkAnswer);
answerBtn[2].addEventListener('click', checkAnswer);
answerBtn[3].addEventListener('click', checkAnswer);
mainScreen.addEventListener('click', reset);
viewScore.addEventListener('click', displayScore);

let tableRow = document.createElement('tr');
let nameData = document.createElement('td');
let scoreData = document.createElement('td');

nameInput.style.display = 'none';
questionContainer.style.display = 'none';
mainScreen.style.display = 'none';
let gameState = true;
let gameRecord = [];
let time = 1000;
let intervalID;
let score = 0;
let questionIndex = 0;

function reset() {
  nameInput.style.display = 'none';
  questionContainer.style.display = 'none';
  mainScreen.style.display = 'none';
  title.textContent = 'Welcome to the Quiz Challenge!!';
  startBtn.style.display = 'flex';
  toggleBtn();
}
function checkAnswer(e) {
  //get the correct answer from questionpool object and compare to target.value
  if (questionPool.length > questionIndex) {
    if (e.target.value === 'correct') {
      score++;
      populateAnswerBtn(questionIndex);
      displayQuestion(questionPool[questionIndex].question);
      questionIndex++;
    } else {
      time -= 500;
      populateAnswerBtn(questionIndex);
      displayQuestion(questionPool[questionIndex].question);
      questionIndex++;
    }
  } else {
    if (e.target.value === 'correct') {
      score++;
    }
    askName();
    console.log('gameover');
    console.log('game score ' + score);
  }
}

//simply displays the question
function displayQuestion(question) {
  questionDisplay.textContent = question;
}

//takes in the question object and filters the answer props to an array to be mapped to the answer buttons with eventlisteners
function populateAnswerBtn(index) {
  console.log(index);
  let answers = [];
  let questionObj = questionPool[index];
  //this forloop below is not necessary if answers are in an array
  for (const [key, value] of Object.entries(questionObj)) {
    if (key === 'question' || key === 'correct') {
    } else {
      answers.push(value);
    }
  }
  for (let i = 0; i < answers.length; i++) {
    answerBtn[i].textContent = answers[i];
    answerBtn[i].value = answers[i];
  }
  // answerBtn.forEach((button) => {
  //   button.addEventListener('click', checkAnswer);
  // });
}
//if game started, toggle off the start button and score button then toggle on the answer buttons and vice versa
function toggleBtn() {
  if (gameState === true) {
    viewScore.style.visibility = 'hidden';
    startBtn.style.visibility = 'hidden';
    questionContainer.style.display = 'flex';
    title.style.display = 'none';
    viewScore.style.display = 'none';
    timerDisplay.style.display = 'block';
    highScore.style.display = 'none';
    gameState = false;
  } else {
    viewScore.style.visibility = 'visible';
    startBtn.style.visibility = 'visible';
    questionContainer.style.display = 'none';
    title.style.display = 'block';
    viewScore.style.display = 'block';
    timerDisplay.style.display = 'none';
    gameState = true;
  }
}
function randomizeQuestion() {
  //commented code below is for selecting randomly from index of an object and insert it into new one
  // let question = questionPool[Math.floor(Math.random() * questionPool.length)];
  // questionPool.splice(questionPool.indexOf(question), 1);
  // return question;

  //it just randomize the object array
  let currentIndex = questionPool.length;
  // There remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // Swap it with the current element.
    let temp = questionPool[currentIndex];
    questionPool[currentIndex] = questionPool[randomIndex];
    questionPool[randomIndex] = temp;
  }
}
function saveScore(event) {
  event.preventDefault();
  let name = event.target[0].value.trim();
  let player = { name: name, score: score };

  if (localStorage.length === 0) {
    gameRecord.push(player);
    localStorage.setItem('player', JSON.stringify(gameRecord));
  } else {
    let tempPlayer = JSON.parse(localStorage.getItem('player'));
    tempPlayer.push(player);
    localStorage.setItem('player', JSON.stringify(tempPlayer));
  }
  displayScore();
}

function displayScore() {
  title.textContent = 'High Scores:';
  questionDisplay.textContent = '';
  nameInput.style.display = 'none';
  highScore.style.display = 'flex';

  let players = JSON.parse(localStorage.getItem('player'));

  if (players === null) {
    for (let i = 0; i < players.length; i++) {
      renderScore.append(tableRow);
      tableRow.append(nameData);
      tableRow.append(scoreData);
      nameData.textContent = players[i].name;
      scoreData.textContent = players[i].score;
    }
  } else {
    for (let i = 0; i < players.length; i++) {
      renderScore.append(tableRow);
      tableRow.append(nameData);
      tableRow.append(scoreData);
      nameData.textContent = players[i].name;
      scoreData.textContent = players[i].score;
    }
  }
  mainScreen.style.display = 'block';
  startBtn.style.display = 'none';
  renderScore.style.display = 'block';
}
//will keep track of the score and also update to the localstorage as well as ask for name of player to keep score
function askName() {
  //title prompt
  title.style.display = 'flex';
  title.textContent = 'Game Over';
  //hide buttons
  buttonContainer.style.display = 'none';
  //message prompt for name
  questionDisplay.textContent = 'Please enter your name:';
  //input box for name
  nameInput.style.display = 'flex';
  nameInput.addEventListener('submit', saveScore);
}
function timer() {
  intervalID = setInterval(() => {
    if (time > 0) {
      timerDisplay.textContent = 'Time left: ' + Math.ceil(time / 100);
      time--;
    } else {
      clearInterval(intervalID);
      time = 10;
      timerDisplay.textContent = '';
      askName();
    }
  }, 10);
}
function gameStart() {
  randomizeQuestion();
  if (time !== 0) {
    if (questionPool[questionIndex] !== null) {
      toggleBtn();
      timer();
      populateAnswerBtn(questionIndex);
      displayQuestion(questionPool[questionIndex].question);
      questionIndex++;
    }
  }
}

// starts game timer and display a questions from a pool of questions
// check for answer input
// if answer is right next question
// if answer is wrong then subtract time from clock then next questions
// when time = 0 game ends with a score from total from pool of questions - correct answer = score
// then save score in localstorage
// call start main screen once finished

// click start button
startBtn.addEventListener('click', gameStart);
