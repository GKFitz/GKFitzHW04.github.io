var questionsContainer = document.querySelector("#questionsContainer");
var intro = document.querySelector("#intro");
var highScoreFormEl = document.querySelector("#highScoreForm");
var initialsInput = document.querySelector("#enterInitials-text");
var timerEl = document.querySelector(".countDownTimer");
var startQuizBtn = document.querySelector(".start_quizbtn");
var jumbotron = document.querySelector(".jumbotron");
var userInitialList = document.querySelector("#userInitialsHS_list")
var playerScoreSpan = document.querySelector("#userScore-count")
var HighScoreBtn = document.querySelector(".high_score");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var index = 0;


var timeScore = 100;
var userinitialsHS = [];
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

//want to start with a score of 5 and sub
// function quizScore() {
//     var score = currentQ * 5;
//     if(currentQ !== "correct!") {
//         score--

//     }
//     answerQ();
// }
 

//creates the list that gets stored for the player's initals and scores
function renderUserInitialsHS() {
    userInitialsHSList.innerHTML = "";
    userScoreSpan.textContent = userInitalsHS.length;
  
    // Render a new li for each 
    for (var i = 0; i < userInitalsHS.length; i++) {
      var score = userInitialsHS[i];
  
      var li = document.createElement("li");
      li.textContent = score;
      li.setAttribute("data-index", i);
  
      var initialsHSSubmitButton = document.createElement("button");
      button.textContent = "submit";
  
      li.appendChild(initialsHSSubmitButton);
      userInitialList.appendChild(li);
    }
  }

function storeUserInitialsHS() {
    // Stringify and set "scores" key in localStorage to todos array
    localStorage.setItem("highScoreForm", JSON.stringify(scores));
}
enterInitialsForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var todoText = todoInput.value.trim();
  
    // Return from function early if submitted todoText is blank
    if (Text === "") {
      return;
    }
  
    // Add new  user inital to the userInitialsHSList array, clear the input
    scores.push(initialsInput);
    initialsInput.value = "";
  
    // Store updated scores in localStorage, re-render the list
    storeUserInitialsHS();
    renderUserInitalsHS();
});

// function enterInitials() {
//     jumbotron.innerHTML = "";

//     if("time is up") {
    
//     }
//     displayQ();
// }



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



// This launches the app by calling setTime() and renderTime()
//getTimePreferences();

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






