let viewHighscoresButton = document.querySelector("#viewHighscores");
let startButton = document.querySelector("#startButton");
let introSection = document.querySelector("#introSection");
let question1 = document.querySelector("#question1");
let question2 = document.querySelector("#question2");
let question3 = document.querySelector("#question3");
let question4 = document.querySelector("#question4");
let question5 = document.querySelector("#question5");
let finalScreen = document.querySelector("#finalScreen");
let submitInitialsButton = document.querySelector("#submitInitials");
let quizComplete = false;
let decrementTimer;

// Starts the quiz
startButton.addEventListener("click", function() {
    introSection.style = "display: none";
    question1.style = "display: block";
    quizTimer();
});

question1.addEventListener("click", function(e) {
    
    if (e.target.textContent !== "alerts") {
        displayIncorrectMessage();
    } else {
        displayCorrectMessage();
    }

    question1.style = "display: none";
    question2.style = "display: block";
});

question2.addEventListener("click", function(e) {

    if (e.target.textContent !== "curly brackets") {
        displayIncorrectMessage();
    } else {
        displayCorrectMessage();
    }

    question2.style = "display: none";
    question3.style = "display: block";
});

question3.addEventListener("click", function(e) {

    if (e.target.textContent !== "all of the above") {
        displayIncorrectMessage();
    } else {
        displayCorrectMessage();
    }

    question3.style = "display: none";
    question4.style = "display: block";
});

question4.addEventListener("click", function(e) {

    if (e.target.textContent !== "quotes") {
        displayIncorrectMessage();
    } else {
        displayCorrectMessage();
    }

    question4.style = "display: none";
    question5.style = "display: block";
});

question5.addEventListener("click", function(e) {

    if (e.target.textContent !== "console.log") {
        displayIncorrectMessage();
    } else {
        displayCorrectMessage();
    }

    question5.style = "display: none";
    finalScreen.style = "display:block";

    // Stop the timer when the user gets to the final screen
    quizComplete = true;
});

submitInitialsButton.addEventListener("click", function(e) {
    e.preventDefault();
    let initials = document.querySelector("#initials").value;

    let errorElem = document.querySelector("#errorMessage");
    if (initials.length < 1) {
        errorElem.textContent = "Error: Submit more than one character";
    } else {
        errorElem.textContent = "";
        saveInitials();
    }
    
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

function quizTimer() {
    let time = 100;
    let timeRemaining = document.querySelector("#timeRemaining");
    decrementTimer = setInterval(handleTime, 1000);

}

function handleTime() {
    time = parseInt(timeRemaining.innerHTML.split(" ")[1]);
    time--;
    timeRemaining.textContent = "Time: " + time;

    if (time <= 0 || quizComplete) {
        clearInterval(decrementTimer);
    }
}

// Handles the timer when incorrect answers are selected
function penalizeTime() {
    let timeRemaining = document.querySelector("#timeRemaining");
    time = parseInt(timeRemaining.innerHTML.split(" ")[1]);
    time = time - 10;
    timeRemaining.textContent = "Time: " + time;
}

function saveInitials() {
    let currentInitials = document.querySelector("#initials").value;
    let timeRemaining = document.querySelector("#timeRemaining");
    currentTime = parseInt(timeRemaining.innerHTML.split(" ")[1]);

    // This is the object that's going to get pushed onto the
    // list of high scores if it qualifies
    let currentScore = {
        initials: currentInitials,
        score: currentTime
    }

    let highScores = localStorage.getItem("highScores") || [];
    console.log("hs:", highScores);
    if (!!highScores && isInHighScoreList()) {
        updateHighScores();
    } else if (!isInHighScoreList()){
        if (highScores.length > 1)
            highScores = JSON.parse(highScores);
        
        highScores.push(currentScore);
        
    }

    localStorage.setItem("highScores", JSON.stringify(highScores))
    renderHighScores();

}

function updateHighScores() {

}

function isInHighScoreList() {
    isInList = false;
    return isInList;
}

function renderHighScores() {
    let finalScreen = document.querySelector("#finalScreen");
    let highScoreScreen = document.querySelector("#highScoreScreen");
    let highScores = localStorage.getItem("highScores");

    if (!highScores) {
        console.log("return");
        return;
    }

    finalScreen.style = "display: none";
    highScoreScreen.style = "display: block";

    highScores = JSON.parse(highScores);
    highScores.sort((a, b) => b.score - a.score);
    console.log("hs:", highScores);
    for (let index = 0; index < highScores.length; index++) {

    }
}

function displayCorrectMessage() {

}

function displayIncorrectMessage() {
    penalizeTime();
}

function init() {
    introSection.style = "display: block";
}

init();