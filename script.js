var timerEl = document.querySelector(".countDownTimer");
var startQuizBtn = document.querySelector(".start_quizbtn");
var jumbotron = document.querySelector(".jumbotron");

var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var index = 0;
var questions = [{
    title: "Commonly used data types DO NOT include...",
    choices: ["String", "Boolean", "Alerts","Numbers"],
    answer: "Alerts",
},
{
    title: "The condition in an if/else statement is enclosed within _______?",
    choices: [
        "Quotes",
        "Curly Braces",
        "Parenthesis",
        "Square Brackets]"],
    answer: "Curly Braces",
},
{   
    title: "Arrays in Javascript can be used to store _________",
    choices: [
        "Numbers and Strings",
        "Other Arrays",
        "Booleans",
        "All of the Above"],
    answer: "All of the Above",
},
{
    title: "String values must be enclose within _________ when being assigned to a variables.",
    choices: [
        "Commas",
        "Curly Brackets",
        "Quotes",
        "Parenthesis"],
        
    answer: "Quotes",

},
{
    title: "A very useful tool during development and debugging for printing content to the debugger is:",
    choices: [
        "Javascript",
        "Terminal/bash",
        "For loops",
        "Console Log"],
        
    answer: "Console Log",
},
];


function startQuiz() {
    jumbotron.innerHTML = "";
    displayQ();
}

function displayQ() {
    jumbotron.innerHTML = "";
    var currentQ = questions[index];
    var titleQ = document.createElement("h2");
    titleQ.textContent = currentQ.title;
    jumbotron.appendChild(titleQ);
    for(var i = 0; i < currentQ.choices.length; i++) {
        var options = document.createElement("button");
        options.textContent = currentQ.choices[i];
        options.setAttribute("class", "option");
        options.setAttribute("value", currentQ.choices[i]);
        options.onclick = answerQ;
        jumbotron.appendChild(options);


    }

}

function answerQ(){
    if(this.value !== questions[index].answer) {
        alert("Wrong!");

    }else {
        alert("correct!");
    }
    index++
    displayQ();
    
}

// function timer() {
//     var timeLeft = 60;
  
//     var timeInterval = setInterval(function() {
//       timerEl.textContent = timeLeft + "remaining";
//       timeLeft--;
  
//       if (timeLeft === 0) {
//         timerEl.textContent = "";
//         clearInterval(timeInterval);
//       }
  
//     }, 1000);
// }

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;


// This launches the app by calling setTime() and renderTime()
//getTimePreferences();

// These two functions are just for making sure the numbers look nice for the html elements
function getFormattedMinutes() {
  //
  var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(secondsLeft / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

/* This function retrieves the values from the html input elements; Sort of
   getting run in the background, it sets the totalSeconds variable which
   is used in getFormattedMinutes/Seconds() and the renderTime() function.
   It essentially resets our timer */
function setTime() {
  var minutes = 5;

  if (minutes === 0) {
    alert("Time is up! See score your!")
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
  if (secondsElapsed >= totalSeconds) {
        alert("Time is up!");
    } 

    
  
}

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
  setTime();

  // We only want to start the timer if totalSeconds is > 0
  if (totalSeconds > 0) {
    /* The "interval" variable here using "setInterval()" begins the recurring increment of the
       secondsElapsed variable which is used to check if the time is up */
      interval = setInterval(function() {
        secondsElapsed++;

        // So renderTime() is called here once every second.
        renderTime();
      }, 1000);
  } else {
    
}




// Output the clock data as a reusable object.
// Display the clock on the page, and stop the clock when it reaches zero.


startQuizBtn.onclick = startQuiz;




