//-------------------------variables
let questionPool = [
  {
    question: 'question 1',
    answers: ['answer1', 'correct', 'answer1', 'answer1'],
    correct: 'correct',
  },
  {
    question: 'question 2',
    answers: ['answer2', 'answer2', 'correct', 'answer2'],
    correct: 'correct',
  },
  {
    question: 'question 3',
    answers: ['answer3', 'answer3', 'correct', 'answer3'],
    correct: 'correct',
  },
  {
    question: 'question 4',
    answers: ['correct', 'answer4', 'answer4', 'answer4'],
    correct: 'correct',
  },
  {
    question: 'question 5',
    answers: ['answer5', 'answer5', 'answer5', 'correct'],
    correct: 'correct',
  },
];
let time = 3000;
let questionIndex = 0;
let score = 0;
let intervalID;
//-------------------------main page
let homeView = document.querySelector('#home-view');
let viewHighScoreBtn = document.querySelector('#view-score');
let homeTitle = document.querySelector('#home-title');
let startBtn = document.querySelector('#start-button');
//-------------------------game page
let gameView = document.querySelector('#game-view');
let displayTime = document.querySelector('#display-time');
let gameTitle = document.querySelector('#game-title');
let buttonContainer = document.querySelector('#button-container');
let allAnswerBtn = document.querySelectorAll('#button-container button');
let answer1Btn = document.querySelector('#answer1');
let answer2Btn = document.querySelector('#answer2');
let answer3Btn = document.querySelector('#answer3');
let answer4Btn = document.querySelector('#answer4');
let bottomMsg = document.querySelector('#bottom-msg');
//-------------------------submit page
let submitView = document.querySelector('#submit-view');
let submitTitle = document.querySelector('#submit-title');
let nameForm = document.querySelector('#name-form');
//------------------------highscore page
let scoreView = document.querySelector('#score-view');
let highscoreTitle = document.querySelector('#highscore-title');
let highscoreList = document.querySelector('#highscore-list');
let highscoreListTr = document.querySelectorAll('#highscore-list');
let mainMenuBtn = document.querySelector('#main-menu');

//----------------------------functions
function startGame() {
  clearAllElements();
  randomizeQuestions();
  startTimer();
  renderGamePage();
}
function clearAllElements() {
  //home
  homeView.style.display = 'none';
  viewHighScoreBtn.style.display = 'none';
  homeTitle.style.display = 'none';
  startBtn.style.display = 'none';
  //game
  gameView.style.display = 'none';
  displayTime.style.display = 'none';
  gameTitle.style.display = 'none';
  buttonContainer.style.display = 'none';
  answer1Btn.style.display = 'none';
  answer2Btn.style.display = 'none';
  answer3Btn.style.display = 'none';
  answer4Btn.style.display = 'none';
  bottomMsg.style.display = 'none';
  //submit
  submitView.style.display = 'none';
  submitTitle.style.display = 'none';
  nameForm.style.display = 'none';
  //highscore
  scoreView.style.display = 'none';
  highscoreTitle.style.display = 'none';
  highscoreList.style.display = 'none';
  mainMenuBtn.style.display = 'none';
}
function randomizeQuestions() {
  //randomizes the question pool in the global scope
  let index;
  for (let i = 0; i < questionPool.length; i++) {
    let tempValue;
    let randomIndex = Math.floor(Math.random() * questionPool.length);
    tempValue = questionPool[i];
    questionPool[i] = questionPool[randomIndex];
    questionPool[randomIndex] = tempValue;
  }
}
function startTimer() {
  intervalID = setInterval(() => {
    if (time > 0) {
      displayTime.textContent = 'Time left: ' + Math.ceil(time / 100);
      time--;
    } else {
      time = 3000;
      displayTime.textContent = '';
      renderSubmitPage();
    }
  }, 10);
}
function renderGamePage() {
  clearAllElements();
  gameView.style.display = 'flex';
  displayTime.style.display = 'flex';
  gameTitle.style.display = 'flex';
  buttonContainer.style.display = 'flex';
  answer1Btn.style.display = 'flex';
  answer2Btn.style.display = 'flex';
  answer3Btn.style.display = 'flex';
  answer4Btn.style.display = 'flex';
  bottomMsg.style.display = 'flex';

  //picks the questions from the pool and if no more questions left, saveScore();
  //game title is also generated
  if (questionPool.length > questionIndex) {
    populateButtons(questionPool[questionIndex]);
    gameTitle.textContent = questionPool[questionIndex].question;
  } else {
    renderSubmitPage();
  }
}
function checkAnswers(event) {
  if (event.target.textContent === questionPool[questionIndex].correct) {
    bottomMsg.textContent = 'CORRECT!!!';
    score++;
    questionIndex++;
    renderGamePage();
  } else {
    bottomMsg.textContent = 'WRONG!!!';
    time -= 500;
    questionIndex++;
    renderGamePage();
  }
}
function renderSubmitPage(event) {
  clearAllElements();
  clearInterval(intervalID);

  submitView.style.display = 'flex';
  submitTitle.style.display = 'flex';
  nameForm.style.display = 'flex';
  time = 3000;
}
function saveScore(e) {
  e.preventDefault();
  let player = { name: e.target[0].value.trim(), score: score };
  let playerList = [];

  if (localStorage.length === 0) {
    playerList.push(player);
    localStorage.setItem('players', JSON.stringify(playerList));
  } else {
    let tempList = JSON.parse(localStorage.getItem('players'));
    tempList.push(player);
    localStorage.setItem('players', JSON.stringify(tempList));
  }
  renderHighscorePage();
  //the index resets here to reset the game, well you can reset anywhere as long as it's before the start game button is rerendered
  //ofc score has to be saved before resetting
  questionIndex = 0;
  score = 0;
}
function renderMainPage() {
  clearAllElements();
  homeView.style.display = 'flex';
  viewHighScoreBtn.style.display = 'flex';
  homeTitle.style.display = 'flex';
  startBtn.style.display = 'flex';
}
function renderHighscorePage() {
  //gets all players from highscore list
  let playerList = JSON.parse(localStorage.getItem('players'));
  clearAllElements();
  scoreView.style.display = 'flex';
  highscoreTitle.style.display = 'flex';
  highscoreList.style.display = 'flex';
  mainMenuBtn.style.display = 'flex';

  //check if list is empty/null
  if (playerList === null) {
    highscoreTitle.textContent = 'No Highscores YET....';
  } else {
    // if no players are there OR first time rendering highscore page, simply shows all scores stored in the localStorage
    if (highscoreList.childElementCount < 1) {
      for (let i = 0; i < playerList.length; i++) {
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdScore = document.createElement('td');

        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        highscoreList.appendChild(tr);

        tdName.textContent = playerList[i].name;
        tdScore.textContent = playerList[i].score;
      }

      console.log(highscoreList.children);
    } else if (
      highscoreList.childElementCount > 1 &&
      highscoreList.childElementCount === playerList
    ) {
      // console.log('Score list nodes: ' + highscoreList.childElementCount);
      // console.log(highscoreList[1]);
      // console.log('player list length: ' + playerList.length);
      // console.log(highscoreList.children[1].children[1]);

      for (let i = 0; i < playerList.length; i++) {
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdScore = document.createElement('td');

        // highscoreList.removeChild(highscoreListTr[0].children[i + 1]);
        highscoreList.replaceChildren(tr, highscoreList.children[i]);
        highscoreList.replaceChildren(
          tdName,
          highscoreList.children[i].children[0]
        );
        highscoreList.replaceChildren(
          tdScore,
          highscoreList.children[i].children[1]
        );

        tdName.textContent = playerList[i].name;
        tdScore.textContent = playerList[i].score;
      }

      console.log(highscoreList.children[1]);
    } else if (playerList.length > highscoreList.childElementCount) {
      let tr = document.createElement('tr');
      let tdName = document.createElement('td');
      let tdScore = document.createElement('td');

      tr.appendChild(tdName);
      tr.appendChild(tdScore);
      highscoreList.appendChild(tr);

      tdName.textContent = playerList[playerList.length - 1].name;
      tdScore.textContent = playerList[playerList.length - 1].score;
    }
  }
}

function populateButtons(question) {
  // i could shuffle the answer placement too but meh
  // need a global index for the question pool to keep track of which questions are left so they can be populated.
  for (let i = 0; i < question.answers.length; i++) {
    allAnswerBtn[i].textContent = question.answers[i];
    gameTitle.textContent = question.question[i];
  }
}
//-------------------------eventlisteners
viewHighScoreBtn.addEventListener('click', renderHighscorePage);
mainMenuBtn.addEventListener('click', renderMainPage);
answer1Btn.addEventListener('click', checkAnswers);
answer2Btn.addEventListener('click', checkAnswers);
answer3Btn.addEventListener('click', checkAnswers);
answer4Btn.addEventListener('click', checkAnswers);
nameForm.addEventListener('submit', saveScore);
startBtn.addEventListener('click', startGame);
addEventListener('load', () => {
  clearAllElements();
  renderMainPage();
});
