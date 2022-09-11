//HTML element varibales 
var scores = document.querySelector("#scores");
var timer = document.querySelector("#timer");
var container = document.querySelector("#container");
var title = document.querySelector("#title");
var content = document.querySelector("#content");
var start = document.querySelector("#start");
var answer = document.querySelector("#answer");

// Question Structure
class Question {
    constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
    }
}

let questionList = [];

//All the questions formated into questionList array
const options1 = ["1. script", "2. link", "3. a", "4. href"];
const question1 = new Question("Javasccript is added to an HTML document using this tag?", options1, "1. <script>");
questionList.push(question1);

const options2 = ["1. HTML", "2. Attribute Values", "3. CSS", "4. all of the above"];
const question2 = new Question("Javascript can change what?", options2, "4. all of the above");
questionList.push(question2);

const options3 = ["1. data", "2. var", "3. value", "4. names"];
const question3 = new Question("What is one of ways you can desclare a javascript variable?", options3, "2. var");
questionList.push(question3);

const options4 = ["1. doesn't use quotes", "2. stores text", "3. value", "4. doesn't manipulates"];
const question4 = new Question("Which is true about Primitive types?", options4, "3. value");
questionList.push(question4);

const options5 = ["1. varibales", "2. true or false", "3. operators", "4. none of the above"];
const question5 = new Question("Comparison and Logical operators are used to test for what?", options5, "2. true or false");
questionList.push(question5);

const options6 = ["1. if...else", "2. true", "3. false", "4. arrays"];
const question6 = new Question("What conditional statement do we use to perform differet decisions?", options6, "1. if...else");
questionList.push(question6);

// Variable for question loop function
let optionList = [];
let currentQues = 0;
let score = 0;
let timeLeft = 61;
let isQuizOngoing = false;
let leaderboard = [];
let initials = "";
let isClearingAnswer = false;
let clearingAnswerCode = 0;
let isCorrect = false;

// Init function that makes view scores and start quiz clickable
function init() {
    start.addEventListener("click", questionLoop);
    scores.addEventListener("click", showScores);
}

function questionLoop() {
    runTimer();
    isQuizOngoing = true;
    tart.setAttribute("style", "display: none");
    content.setAttribute("style", "display: none");
    let numOfOptions = questionList[0].options.length;
    for(let i = 0; i < numOfOptions; i++) {
        let option = document.createElement("button");
        container.appendChild(option);
        optionList.push(option);
        option.setAttribute("id", `button${i + 1}`);
    }
    nextQuestion();
}

// Counts down the timer and ends the quiz if time is zero
function runTimer () {
    let clock = setInterval(function() {
        timeLeft--;
        timer.textContent = `Time: ${timeLeft} seconds`;
        if(timeLeft === 0) {
            clearInterval(clock);
            if(title.textContent !== "All Done.") {
                endOfQuiz();
            }
        }
    }, 1000)
}

// Either goes to next question or ends the quiz
function nextQuestion(event) {
    writeAnswer(event);
    if(currentQues < questionList.length) {
        changeQuestion();
    } else {
        endOfQuiz();
    }
}

// if statement for the answer and timer penalty
function writeAnswer(event) {
    if(event !== undefined) {
        if(event.currentTarget.textContent === questionList[currentQues - 1].answer) {
            isCorrect = true;
            answer.textContent = "Correct";
            answer.setAttribute("style", "color: green");
            score += 10;
        } else {
            isCorrect = false;
            answer.textContent = "Incorrect";
            answer.setAttribute("style", "color: red");
            if(timeLeft > 10) {
                timeLeft -= 10;
            } else {
                timeLeft = 1;
            }
            timer.setAttribute("style", "color: red");
            setTimeout(function () {
                timer.setAttribute("style", "color: black");
            },1000);
        }
        clearAnswer();
    }
}

//clear answers and footer and check time
function clearAnswer() {
    if(isClearingAnswer) {
        isClearingAnswer = false;
        clearTimeout(clearingAnswerCode);
        clearAnswer();
    } else {
        isClearingAnswer = true;
        clearingAnswerCode = setTimeout(function() {
            answer.textContent = "";
            isClearingAnswer = false;
        }, 3000);
    }
}


// Change to the next set of questions
function changeQuestion() {
    title.textContent = questionList[currentQues].question;
    for(let i = 0; i < questionList[currentQues].options.length; i++) {
        optionList[i].textContent = questionList[currentQues].options[i];        
        optionList[i].addEventListener("click", nextQuestion);
    }
    currentQues++;
}

// All done screen, clear scores and reset questions and scores 
function endOfQuiz() {
    title.textContent = "All Done.";
    timeLeft = 1;
    clearOptions();
    clearAnswer();
    content.setAttribute("style", "display: visible");
    content.textContent = `Your final score is ${score}`;
    inputFields();
}

// Removes option buttons and empties array
function clearOptions() {
    for(let i = 0; i < optionList.length; i++) {
        optionList[i].remove();
    }
    optionList = [];
}

// Creates form and submit event
function inputFields() {
    let initialsForm = document.createElement("form");
    container.appendChild(initialsForm);
    initialsForm.setAttribute("id", "form");
    let label = document.createElement("label");
    initialsForm.appendChild(label);
    label.textContent = "Enter initials: "
    let input = document.createElement("input")
    initialsForm.appendChild(input);
    input.setAttribute("id", "initials");
    let submit = document.createElement("button");
    initialsForm.appendChild(submit);
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";

    title.setAttribute("style", "align-self: start")
    content.setAttribute("style", "align-self: start; font-size: 150%");

    
    input.addEventListener("keydown", stopReload);
    submit.addEventListener("click", addScore);
    
}

//Prevent Default Reload page
function stopReload(event) {
    if(event.key === "Enter") {
        event.preventDefault();
    }
}

// Score and Intitials added
function addScore(event) {
    if(event !== undefined) {
        event.preventDefault();
    }
    let id = document.getElementById("initials");
    if(id.value.length > 3 || id.value.length === 0) {
        invalidInput();
        return;
    }
    isQuizOngoing = false;
    document.getElementById("form").remove();
    saveScore(id);
}

// Save Score to local storage
function saveScore(id) {
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    leaderboard.push(`${score} ${id.value}`);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    showScores();    
}

// Invalid intry prompt for initials
function invalidInput() {
    answer.textContent = "Initials must be entered and three characters or less";
    answer.setAttribute("style", "color: black");
    clearAnswer();
    let submit = document.getElementById("submit");
    submit.addEventListener("click", addScore);
}

// Show Score requirements, Initials, prompts
function showScores() {
    if(!isQuizOngoing) {
        title.textContent = "High Scores";
        // Hides start quiz button if view high scores is clicked at beginning
        start.setAttribute("style", "display: none");
        writeScores();
        createEndButtons();
    } else if(title.textContent === "All Done.") {
        answer.textContent = "Please enter your initials first";
        answer.setAttribute("style", "color: black");
        clearAnswer();
    } else {
        answer.textContent = "Cannot view scores until the quiz is over";
        answer.setAttribute("style", "color: black");
        clearAnswer();
    }
}

// Written score on leaderboard
function writeScores() {
    content.textContent = "";
    content.setAttribute("style", "white-space: pre-wrap; font-size: 150%");
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    leaderboard.sort();
    leaderboard.reverse();
    let limit = 11;
    if(limit > leaderboard.length) {
        limit = leaderboard.length;
    }
    for(let i = 0; i < limit; i++) {
        content.textContent += leaderboard[i] + '\n';
    }
}

// Goback button generated and click listener
function createEndButtons() {
    if(!document.getElementById("restart")) {
        let restartVar = document.createElement("button");
        container.appendChild(restartVar);
        restartVar.textContent = "Go Back";
        restartVar.setAttribute("id", "restart");
        
        let clearScoresVar = document.createElement("button");
        container.appendChild(clearScoresVar);
        clearScoresVar.textContent = "Clear High Scores";
        clearScoresVar.setAttribute("id", "clearScores");
        
        restartVar.addEventListener("click", restart);
        clearScoresVar.addEventListener("click", clearScores)
    }
}

// goback to start content 
function restart() {
    title.setAttribute("style", "align-self: center");
    content.setAttribute("style", "align-self: center; font-size: 110%");
    document.getElementById("restart").remove();
    document.getElementById("clearScores").remove();
    title.textContent = "Coding Quiz Challenge";
    content.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by reducing it by ten seconds.";
    start.setAttribute("style", "display: visible");
    currentQues = 0;
    score = 0;
    timeLeft = 61;
    init();
}

// clears local stoage an array scores 
function clearScores() {
    localStorage.clear();
    content.textContent = "";
    leaderboard = [];
}

init();