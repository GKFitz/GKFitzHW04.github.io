var questionsContainer = document.querySelector("#questionsContainer");
var intro = document.querySelector("#intro");
var highScoreFormEl = document.querySelector("#highScoreForm");
var enterInitialsForm = document.querySelector("#enterInitialsForm ");
var initialsInput = document.querySelector("#enterInitials-text");
var timerEl = document.querySelector("#countDownTimer");
var startQuizBtn = document.querySelector(".start_quizbtn");
var jumbotron = document.querySelector(".jumbotron");
var userInitialsHSList = document.querySelector("#userInitialsHSList")
var viewScoresBtn = document.querySelector(".hs_btn");
var clearListBtn = document.querySelector(".clearListBtn");
var viewScoreContainer= document.querySelector("#viewScoreContainer")
var viewScoreBtn = document.querySelector(".high_score");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var index = 0;


var timeScore = 120;
var userInitialsHS = [];


getData();


var questions = [{
    title: "Commonly used data types DO NOT include...",
    choices: [
        "1.String", 
        "2.Boolean", 
        "3.Alerts",
        "4.Numbers"],
    answer: "3.Alerts",
},
{
    title: "The condition in an if/else statement is enclosed within _______?",
    choices: [
        "1.Quotes",
        "2.Curly Braces",
        "3.Parenthesis",
        "4.Square Brackets"],
    answer: "2.Curly Braces",
},
{   
    title: "Arrays in Javascript can be used to store _________",
    choices: [
        "1.Numbers and Strings",
        "2.Other Arrays",
        "3.Booleans",
        "4.All of the Above"],
    answer: "4.All of the Above",
},
{
    title: "String values must be enclose within _________ when being assigned to a variables.",
    choices: [
        "1.Commas",
        "2.Curly Brackets",
        "3.Quotes",
        "4.Parenthesis"],
        
    answer: "3.Quotes",

},
{
    title: "A very useful tool during development and debugging for printing content to the debugger is:",
    choices: [
        "1.Javascript",
        "2.Terminal/bash",
        "3.For loops",
        "4.Console Log"],
        
    answer: "4.Console Log",
},
];


function startQuiz() {
    questionsContainer.innerHTML = "";
    intro.classList.add("hidden");
    viewScoreContainer.classList.add("hidden");
    highScoreFormEl.classList.add("hidden");
    index = 0;
    timeScore = 120;
    displayQ();
    startTimer();
}

function startTimer() {
    setTime();
  
    // We only want to start the timer if totalSeconds is > 0
    if (totalSeconds > 0) {
        interval = setInterval(function() {
          timeScore = Math.max(0, timeScore-1);
            if(timeScore === 0) {
              index = questions.length;
              alert("Uh OH! Time is up! Try Again!")
              startQuiz();
            }
  
  
  
          // So renderTime() is called here once every second.
          renderTime();
        }, 1000);
      } 
      
}


function displayQ() {
    questionsContainer.innerHTML = "";
    var currentQ = questions[index];


    if(currentQ) {
        var titleQ = document.createElement("h2");
        titleQ.textContent = currentQ.title;
        questionsContainer.appendChild(titleQ);
        for(var i = 0; i < currentQ.choices.length; i++) {
            var options = document.createElement("button");
            options.textContent = currentQ.choices[i];
            options.setAttribute("class", "option");
            options.setAttribute("value", currentQ.choices[i]);
            options.onclick = answerQ;
            questionsContainer.appendChild(options);
        }
    }else{
    //stop the timer once all questions are answered, call the initials form
    stopTimer();
    highScoreForm();
    intro.classList.remove("hidden");
    }

    
    
}

//this function tracks the correct and the incorrect answers
function answerQ(){
    if(this.value !== questions[index].answer) {
        alert("Wrong!");
        timeScore = Math.max(0, timeScore-20);

    }else {
        alert("correct!");
        
    }
    index++
    displayQ();
    
    
}

function stopTimer() {
    clearInterval(interval);
}

//this should print out the users high score and ask them to input their initials
function highScoreForm() {
    document.getElementById("userScore").innerHTML= "Your Score is" + " " + timeScore + "!";
    highScoreFormEl.classList.remove("hidden");
    clearInterval(interval);
}

function submitInitialsHS(event) {
    event.preventDefault();
    var initials = document.querySelector("#enterInitials-text").value.trim();
    if(initials) {
        setData(initials,timeScore);
        renderUserInitialsHS(event);
    }


}

//Get initial and score and add it to the initialsHS Array
function setData(initials, score) {
    userInitialsHS.push({initials,score});
    localStorage.setItem("userInitialsHS", JSON.stringify(userInitialsHS));

}

function getData(){
    var data = localStorage.getItem("userInitialsHS");
    if(data) {
        userInitialsHS = JSON.parse(data);

    }else{
        userInitialsHS = [];
    }
    
}

function renderUserInitialsHS(event) {
    event.preventDefault();
    userInitialsHSList.innerHTML = "";
    highScoreFormEl.classList.add("hidden");
    viewScoreContainer.classList.remove("hidden");
    
  
    // Render a new li for each new initial
    for (var i = 0; i < userInitialsHS.length; i++) {
      var printUserInitialsHS = userInitialsHS[i];
  
      var li = document.createElement("li");
      li.textContent = `${printUserInitialsHS.initials}: ${printUserInitialsHS.score}`;
      

      userInitialsHSList.appendChild(li);
    }
    //viewList.appendChild(userInitialsHSList);
}

function clearLocalStorage(event) {
    event.preventDefault();
    localStorage.clear();
    viewScoreContainer.classList.add("hidden")

    intro.classList.remove("hidden");
    
}

function getFormattedMinutes() {
  var minutesLeft = Math.floor(timeScore / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

function getFormattedSeconds() {

    
  var secondsLeft = (timeScore) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}


function setTime() {
  var minutes = 5;

  if (minutes === 0) {
    alert("Time is up! refresh to try again!")
  }
    clearInterval(interval);
    totalSeconds = minutes * 60;
}

// This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();

 // ..and then checks to see if the time has run out
//   if (secondsElapsed >= totalSeconds) {
//         alert("Time is up!Try Again?");
//         startQuiz();
//     } 

}



startQuizBtn.onclick = startQuiz;
enterInitialsForm.addEventListener("submit", submitInitialsHS);
viewScoresBtn.addEventListener("click", renderUserInitialsHS);
clearListBtn.addEventListener("click", clearLocalStorage);








