/* bugs:
- timer not stopping when game ends
- highscores button showing upon pressing "go back"
- answerPrompt permanently showing if questions are answered too fast
*/
var questionText = document.querySelector("#question_text");
var quizBtns = document.querySelector("#options");
var quizBtn1 = document.querySelector("#quiz_btn1");
var quizBtn2 = document.querySelector("#quiz_btn2");
var quizBtn3 = document.querySelector("#quiz_btn3");
var quizBtn4 = document.querySelector("#quiz_btn4");

var timerElement = document.querySelector("#timer");
var timer;
var timerCount;
var isWin = false;
//var isEnd = false;
var winCounter = 0;
var loseCounter = 0;

var initialsField = document.querySelector("#initials");
var initialsBox = document.querySelector("#initials-box");
var answerPrompt = document.querySelector("#answer-prompt");
var startBtn = document.querySelector("#start-btn");
var scoresBtn = document.querySelector("#scores_btn");
var backBtn = document.querySelector("#back_btn");
var clearBtn = document.querySelector("#clear_btn");

changeDisplay(1);

// start the game
function startGame() {
  isWin = false;
  timerCount = 75;
  //startBtn.disabled = true;
  changeDisplay(2);
  startTimer();
  saveScores();
}

function changeDisplay(displayType) {
  if (displayType === 1) { // initializing first menu
    backBtn.style.display = "none";
    clearBtn.style.display = "none";
    scoresBtn.style.display = "none";
    initialsBox.style.display = "none";
    quizBtns.style.display = "none";
    answerPrompt.style.display = "none";
    timerElement.style.display = "none";
    startBtn.style.display = "block";
  } else if (displayType === 2) { // starting game
    startBtn.style.display = "none";
    quizBtns.style.display = "block";
    timerElement.style.display = "block";
  } else if (displayType === 3) { // ending game
    quizBtns.style.display = "none";
    backBtn.style.display = "block";
    scoresBtn.style.display = "block";
    initialsBox.style.display = "block";
  } else if (displayType === 4) { // view highscores

  }
}

startBtn.addEventListener("click", startGame);

// start the countdown timer
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      if (isWin && timerCount > 0) {
        clearInterval(timer);
        endGame(true);
      }
    }
    if (timerCount === 0) {
      clearInterval(timer);
      endGame(false);
    }
    /*if (isWin === false && isEnd === true) {
      clearInterval(timer);
      endGame(false);
    } */
  }, 1000);
}

function saveScores() {
  score = timerCount;
  initials = initialsField.textContent;
  console.log(timerCount);
  console.log(initials);
}

// clear scores
function clearScores() {
  winCounter = 0;
  loseCounter = 0;
  //setWins();
  //setLosses();
}

function goBack() {
  changeDisplay(1);
}

clearBtn.addEventListener("click", clearScores);
backBtn.addEventListener("click", goBack);

function endGame(isWon) {
  //isEnd = true;
  questionText.textContent = "won: " + winCounter + " || lost: " + loseCounter;
  changeDisplay(3);
  if (isWon === true) {
    console.log("Winner!");
  } else {
    console.log("Loser!");
  }
}

// define correct answer and each question/answers
var questionContent = [[".", "#", "$", ".", "&", "What icon does a css class start with?"],
["<p>", "<img>", "<div>", "<ul>", "<p>", "Which of these indicates a simple block of text in html?"],
["===", "===", "==", "!=", "=", "how do you signify a true comparison in javascript?"]];
var qCI = 0; //questionContentIndex
var qciMAX = 3;
var correctAns = "Choice 1";
function newQuestion(answer, q1, q2, q3, q4, qText) {
  correctAns = answer;
  quizBtn1.textContent = q1;
  quizBtn2.textContent = q2;
  quizBtn3.textContent = q3;
  quizBtn4.textContent = q4;
  questionText.textContent = qText
}


// add an event.restoredefault() thing here to prevent it not updating when clicking too fast
function displayAnswerPrompt(correct) {
  var promptTimer = 250;
  timer = setInterval(function () {
    promptTimer--;
    if (correct === true) {
      answerPrompt.textContent = "Correct!";
      answerPrompt.style.display = "block";
    } else if (correct === false) {
      answerPrompt.textContent = "Inorrect";
      answerPrompt.style.display = "block";
    }
    if (promptTimer === 0) {
      clearInterval(timer);
      answerPrompt.style.display = "none";
    }
  }, 1);
}

// retrieve quiz button choice and compare with correct answer, then cycle questions
quizBtns.addEventListener("click", getQuestionOptions);
function getQuestionOptions(event) {
  if (!event.target.matches('options')) {
    if (qCI < qciMAX) {
      if (event.target.textContent === correctAns && qCI < qciMAX) {
        newQuestion(questionContent[qCI][0], questionContent[qCI][1], questionContent[qCI][2],
          questionContent[qCI][3], questionContent[qCI][4], questionContent[qCI][5]);
        displayAnswerPrompt(true);
        winCounter++;
        qCI++;

      } else if (event.target.textContent != correctAns && qCI < qciMAX) {
        newQuestion(questionContent[qCI][0], questionContent[qCI][1], questionContent[qCI][2],
          questionContent[qCI][3], questionContent[qCI][4], questionContent[qCI][5]);
        displayAnswerPrompt(false);
        loseCounter++;
        qCI++;

      }
    } else if (qCI === qciMAX) {
      isWin = true;
      console.log('CORR' + qCI);
    }

    return;
  }
}



