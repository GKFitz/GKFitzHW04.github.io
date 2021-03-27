//as soon as the index.html loads this will printout the scores list in the view Scores html
var clearListBtn = document.querySelector(".clearListBtn");
var userInitialsHSList = document.querySelector("#userInitialsHSList")
var userInitialsHS = [];


window.addEventListener('load', (event) => {
    event.preventDefault();
    getData();
    userInitialsHSList.innerHTML = "";
    
    viewScoreContainer.classList.remove("hidden");
    
  
    // Render a new li for each new initial
    for (var i = 0; i < userInitialsHS.length; i++) {
      var printUserInitialsHS = userInitialsHS[i];
  
      var li = document.createElement("li");
      li.textContent = `${printUserInitialsHS.initials}: ${printUserInitialsHS.score}`;
      

      userInitialsHSList.appendChild(li);
    }
    
    console.log("window loaded");
    
});

function getData(){
    var data = localStorage.getItem("userInitialsHS");
    if(data) {
        userInitialsHS = JSON.parse(data);

    }else{
        userInitialsHS = [];
    }
    
}

function clearLocalStorage(event) {
    event.preventDefault();
    localStorage.clear();
    viewScoreContainer.classList.add("hidden")
    userInitialsHSList.innerHTML = "";

    
    
}

clearListBtn.addEventListener("click", clearLocalStorage);

