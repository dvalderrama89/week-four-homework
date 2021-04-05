let viewHighscoresButton = document.querySelector("#viewHighscores");
let startButton = document.querySelector("#startButton");
let introSection = document.querySelector("#introSection");
let question1 = document.querySelector("#question1");
let question2 = document.querySelector("#question2");
let question3 = document.querySelector("#question3");
let question4 = document.querySelector("#question4");
let question5 = document.querySelector("#question5");
let finalScreen = document.querySelector("#finalScreen");

// Starts the quiz
startButton.addEventListener("click", function() {
    introSection.style = "display: none";
    question1.style = "display: block";
    quizTimer();
});

question1.addEventListener("click", function(e) {
    console.log(e.target.textContent);
    
    question1.style = "display: none";
    question2.style = "display: block";
});

question2.addEventListener("click", function() {
    question2.style = "display: none";
    question3.style = "display: block";
});

question3.addEventListener("click", function() {
    question3.style = "display: none";
    question4.style = "display: block";
});

question4.addEventListener("click", function() {
    question4.style = "display: none";
    question5.style = "display: block";
});

question5.addEventListener("click", function() {
    question5.style = "display: none";
    finalScreen.style = "display:block";
});


// Takes the user to the high score screen
viewHighscoresButton.addEventListener("click", function() {
    let highScoreScreen = document.querySelector("#highScoreScreen");
    let sections = document.querySelectorAll("section");

    for (let i = 0; i < sections.length; i++) {
        sections[i].style = "display: none";
    }

    highScoreScreen.style = "display: block";
});

// Handles the timer when incorrect answers are selected
function quizTimer() {
    let time = 100;
    
   
    let timeRemaining = document.querySelector("#timeRemaining");
    let decrementTimer = setInterval(function() {
        time = parseInt(timeRemaining.innerHTML.split(" ")[1]);
        time--;
        timeRemaining.textContent = "Time: " + time;

        if (time <= 0) {
            clearInterval(decrementTimer);
        }
    }, 1000);

}

function init() {
    introSection.style = "display: block";
}

init();