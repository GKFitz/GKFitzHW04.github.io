var questionsContainer = document.querySelector("#questionsContainer");
var intro = document.querySelector("#intro");
var highScoreFormEl = document.querySelector("#highScoreForm");
var initialsInput = document.querySelector("#enterInitials-text");
var timerEl = document.querySelector("#countDownTimer");
var startQuizBtn = document.querySelector(".start_quizbtn");
var jumbotron = document.querySelector(".jumbotron");
var userInitialsHSList = document.querySelector("#userInitialsHSlist")

//var playerScoreSpan = document.querySelector("#userScore-count")
var viewScoreBtn = document.querySelector(".high_score");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var index = 0;


var timeScore = 120;
var userInitialsHS = [];
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
    displayQ();
    startTimer();
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
    //stop the timer once all questions are answered
    stopTimer()
    highScoreForm()
    }

    //call the userhighscore initals form here 
    
}

//this function tracks the correct and the incorrect answers
function answerQ(){
    if(this.value !== questions[index].answer) {
        alert("Wrong!");
        timeScore -= 20;

    }else {
        alert("correct!");
    }

    // if(index < questions.length -1) {
        index++
        displayQ();
    // }
    
}

function stopTimer() {
    clearInterval(interval);
    console.log("stop the timer!")
}

//this should print out the users high score and ask them to input their initials
function highScoreForm() {
    document.getElementById("userScore").innerHTML= "Your Score is" + " " + timeScore + "!";

    console.log(highScoreFormEl);
    highScoreFormEl.classList.remove("hidden");
    console.log(highScoreFormEl);
    var submitInitialsHS = document.querySelector("#submitInitialsHS");
    //submitInitialsHS.onclick
}

function renderUserInitialsHS() {
    userInitialsHSList.innerHTML = "";
    //need to put the timeScore with the initials
    //userScoreSpan.textContent = userInitalsHS.length;
  
    // Render a new li for each new initial
    for (var i = 0; i < userInitalsHS.length; i++) {
      var printUserInitialsHS = userInitialsHS[i];
  
      var li = document.createElement("li");
      li.textContent = printUserInitialsHS;
      li.setAttribute("data-index", i);
  
    //   var initialsHSSubmitButton = document.createElement("button");
    //   button.textContent = "submit";

      userInitialHSList.appendChild(li);
    }
}

function storeUserInitialsHS() {
    // Stringify and set "scores" key in localStorage to todos array
    localStorage.setItem("userInitialsHS", JSON.stringify(userInitialsHS));
}

// When form is submitted...
// highScoreForm.addEventListener("submit", function(event){
//     event.preventDefault();

//     var initialsAndHSText=

//     userInitialsHS.push(initialsAndHSText)


// })









// These two functions are just for making sure the numbers look nice for the html elements
function getFormattedMinutes() {
  
  //var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(timeScore / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" +  + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

function getFormattedSeconds() {

    //the mod operator returns the remainder
  var secondsLeft = (timeScore) % 60;

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
  if (secondsElapsed >= totalSeconds) {
        alert("Time is up!Try Again?");
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
        //secondsElapsed++;
        timeScore--;

        // So renderTime() is called here once every second.
        renderTime();
      }, 1000);
  } 
    
}




// Output the clock data as a reusable object.
// Display the clock on the page, and stop the clock when it reaches zero.


startQuizBtn.onclick = startQuiz;
submitInitialsHS.onclick = submitInitialsHS;






