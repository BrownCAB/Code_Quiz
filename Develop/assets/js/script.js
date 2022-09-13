let timer = document.querySelector("#timer");

//userName is userInitials
let userInitials = document.querySelector("#userInitials");
//headerText is now introText
let introText = document.querySelector("#introText");
let scoreText = document.querySelector("#scoreText");
let greetingInput = document.querySelector("#greetingInput");
let quiz = document.querySelector("#quiz");
//Qn_button varibales
let qn1Button = document.querySelector("#qn1Button");
let qn2Button = document.querySelector("#qn2Button");
let qn3Button = document.querySelector("#qn3Button");
let qn4Button = document.querySelector("#qn4Button");
// Question id variable
let question = document.querySelector("#question");
// Question Variables
let answerA = document.querySelector("#answerA");
let answerB = document.querySelector("#answerB");
let answerC = document.querySelector("#answerC");
let answerD = document.querySelector("#answerD");
let iterationNumber = 0;
let qnChoice = "";
let score = 0;
let time = 60;
let quizTimer;

//List of Questions List
let questionList = [
  "What is an Objects?",
  "How do you create an Array?",
  "Where can Global Scope be use that Local Scopes can't ?",
  "What is NOT a fundamental of Javascript?",
];

// List of Answers List
let aAnswerList = [
  "Primitive Type",
  "Variable_declared array name = [item1, item2, ...]",
  "Inside a function",
  "Alert",
];

let bAnswerList = [
  "Packages",
  "numbered variables",
  "Outside the function",
  "arrayAdd",
];

let cAnswerList = ["Variable", "Function", "Ordered list", "Local"];
let dAnswerList = [
  "Conditional Statements",
  "Variables",
  "Comparison & Logical operators",
  "Concept",
];

// Hide question & answers
quiz.style.display = "none"; // this has to stay on top
qn1Button.style.display = "none";
qn2Button.style.display = "none";
qn3Button.style.display = "none";
qn4Button.style.display = "none";

//Reset Submits
function reset() {
  //Reset click
  introText.style.display = "none";
  answerA.style.color = "blueviolet";
  answerB.style.color = "blueviolet";
  answerC.style.color = "blueviolet";
  answerD.style.color = "blueviolet";
  // Next Question & Answer list items
  question.innerHTML = questionList[iterationNumber];
  answerA.innerHTML = aAnswerList[iterationNumber];
  answerB.innerHTML = bAnswerList[iterationNumber];
  answerC.innerHTML = cAnswerList[iterationNumber];
  answerD.innerHTML = dAnswerList[iterationNumber];
  setTimeout(function(){
      submitStatus.style.display = "none";
  }, 1000)
}

//Submit greeting button event
function greeting() {
  introText.innerHTML = "";
  introText.innerHTML = "Let's Go " + userInitials.value + "!";
//Save userInitials to localStorage
  const user = userInitials.value 
 localStorage.setItem("user", user);
  greetingInput.style.display = "none";
  quiz.style.display = "block";
  qn1Button.style.display = "block";
  question.innerHTML = questionList[iterationNumber];
  answerA.innerHTML = aAnswerList[iterationNumber];
  answerB.innerHTML = bAnswerList[iterationNumber];
  answerC.innerHTML = cAnswerList[iterationNumber];
  answerD.innerHTML = dAnswerList[iterationNumber];
  quizTimer = setInterval(function () {
    time--;
    timer.textContent = `Time: ${time}`;
    if (time <= 0) {
      submitQn4();
    }
  }, 1000);
}

//Question function styling
function aFunction() {
  answerA.style.color = "violet";
  answerB.style.color = "blueviolet";
  answerC.style.color = "blueviolet";
  answerD.style.color = "blueviolet";
  qnChoice = "a";
}

function bFunction() {
  answerA.style.color = "blueviolet";
  answerB.style.color = "violet";
  answerC.style.color = "blueviolet";
  answerD.style.color = "blueviolet";
  qnChoice = "b";
}

function cFunction() {
  answerA.style.color = "blueviolet";
  answerB.style.color = "blueviolet";
  answerC.style.color = "violet";
  answerD.style.color = "blueviolet";
  qnChoice = "c";
}

function dFunction() {
  answerA.style.color = "blueviolet";
  answerB.style.color = "blueviolet";
  answerC.style.color = "blueviolet";
  answerD.style.color = "violet";
  qnChoice = "d";
}

// Submited Questions
function submitQn1() {
  if (qnChoice == "c") {
    score += 25;
    submitStatus.textContent = "Correct";
  } else {
    time -= 10;
    submitStatus.textContent = "Incorrect";
  }
  qn1Button.style.display = "none";
  // Next Question
  qn2Button.style.display = "block";
  iterationNumber += 1;
  //Run Reset function
  reset();
  submitStatus.style.display = "block";
}

function submitQn2() {
  if (qnChoice == "a") {
    score += 25;
    submitStatus.textContent = "Correct";
  } else {
    time -= 10;
    submitStatus.textContent = "Incorrect";
  }
  qn2Button.style.display = "none";
  // Next Question
  qn3Button.style.display = "block";
  iterationNumber += 1;
  //Run Reset function
  reset();
  submitStatus.style.display = "block";
}

function submitQn3() {
  if (qnChoice == "b") {
    score += 25;
    submitStatus.textContent = "Correct";
  } else {
    time -= 10;
    submitStatus.textContent = "Incorrect";
  }
  qn3Button.style.display = "none";
  // Next Question
  qn4Button.style.display = "block";
  iterationNumber += 1;
  //Run Reset function
  reset();
  submitStatus.style.display = "block";
}

function submitQn4() {
  if (qnChoice == "d") {
    score += 25;
    submitStatus.textContent = "Correct";
  } else {
    time -= 10;
    submitStatus.textContent = "Incorrect";
  }
  // score screen
  iterationNumber += 1;
  scoreText.innerHTML = "Your score is " + score;
  //Save score to localStorage 
  localStorage.setItem("score", score);
  quiz.style.display = "none";
  clearInterval(quizTimer);
  //Run Reset function
  reset();
  submitStatus.style.display = "block";
}
