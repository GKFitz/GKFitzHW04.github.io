var countDown = document.querySelector(".countDownTimer");
var startQuizBtn = document.querySelector(".start_quizbtn");
var jumbotron = document.querySelector(".jumbotron");




var index = 0;
var questions = [{
    title: "Q1 Commonly used data types DO NOT include...",
    choices: ["String", "Boolean", "Alerts","Numbers"],
    answer: "Alerts",
},
{
    title: "Q2 The condition in an if/else statement is enclosed within _______?",
    choices: [
        "Quotes",
        "Curly Braces",
        "Parenthesis",
        "Square Brackets]"],
    answer: "Curly Braces",
},
{   
    title: "Q3 Arrays in Javascript can be used to store _________",
    choices: [
        "Numbers and Strings",
        "Other Arrays",
        "Booleans",
        "All of the Above"],
    answer: "All of the Above",
},
{
    title: "Q4 String values must be enclose within _________ when being assigned to a variables.",
    choices: [
        "Commas",
        "Curly Brackets",
        "Quotes",
        "Parenthesis"],
        
    answer: "Quotes",

},
{
    title: "Q5 A very useful tool during development and debugging for printing content to the debugger is:",
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

function qResults

// find selected answer
// Create a countdown clock



// Calculate the time remaining.
//lose time if th answer is wrong





// Output the clock data as a reusable object.
// Display the clock on the page, and stop the clock when it reaches zero.








//  record user score and initials: local storage

startQuizBtn.onclick = startQuiz;
