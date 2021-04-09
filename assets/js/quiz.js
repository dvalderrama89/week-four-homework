let viewHighscoresButton = document.querySelector("#viewHighscores");
let startButton = document.querySelector("#startButton");
let introSection = document.querySelector("#introSection");
let question1 = document.querySelector("#question1");
let question2 = document.querySelector("#question2");
let question3 = document.querySelector("#question3");
let question4 = document.querySelector("#question4");
let question5 = document.querySelector("#question5");
let finalScreen = document.querySelector("#finalScreen");
let feedbackSection = document.querySelector("#feedbackSection");
let submitInitialsButton = document.querySelector("#submitInitials");
let homeButton = document.querySelector("#home");
let clearScoresButton = document.querySelector("#clearScores");
let quizComplete = false;
let decrementTimer = null;

// Starts the quiz
startButton.addEventListener("click", function() {
    introSection.style = "display: none";
    question1.style = "display: block";
    quizTimer();
});

question1.addEventListener("click", function(e) {
    if (e.target.textContent !== "alerts") {
        displayIncorrectMessage(1);
    } else {
        displayCorrectMessage(1);
    }

    question1.style = "display: none";
    question2.style = "display: block";
});

question2.addEventListener("click", function(e) {
    if (e.target.textContent !== "curly brackets") {
        displayIncorrectMessage(2);
    } else {
        displayCorrectMessage(2);
    }

    question2.style = "display: none";
    question3.style = "display: block";
});

question3.addEventListener("click", function(e) {
    if (e.target.textContent !== "all of the above") {
        displayIncorrectMessage(3);
    } else {
        displayCorrectMessage(3);
    }

    question3.style = "display: none";
    question4.style = "display: block";
});

question4.addEventListener("click", function(e) {

    if (e.target.textContent !== "quotes") {
        displayIncorrectMessage(4);
    } else {
        displayCorrectMessage(4);
    }

    question4.style = "display: none";
    question5.style = "display: block";
});

question5.addEventListener("click", function(e) {

    if (e.target.textContent !== "console.log") {
        displayIncorrectMessage(5);
    } else {
        displayCorrectMessage(5);
    }

    question5.style = "display: none";
    finalScreen.style = "display: block";

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

homeButton.addEventListener("click", function(e) {
    e.preventDefault();
    highScoreScreen.style = "display: none";
    introSection.style = "display: block";

    // Reset the timer if the quiz was finished
    if (quizComplete) {
        quizComplete = false;
        decrementTimer = null;
        console.log("reload timer");
        let timeRemaining = document.querySelector("#timeRemaining");
        timeRemaining.textContent = "Time: 100";
    }
});

clearScoresButton.addEventListener("click", function(e) {
    localStorage.setItem("highScores", "");
    removeScoreList();
});


// Takes the user to the high score screen
viewHighscoresButton.addEventListener("click", function() {
    let highScoreScreen = document.querySelector("#highScoreScreen");
    let sections = document.querySelectorAll("section");

    // Hides any question that is on the screen (interrupts quiz flow)
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") !== "feedbackSection") {
            sections[i].style = "display: none";
        }
    }

    highScoreScreen.style = "display: block";
    renderHighScores();
});

function quizTimer() {
    let time = 100;
    let timeRemaining = document.querySelector("#timeRemaining");

    if (decrementTimer === null) {
        decrementTimer = setInterval(handleTime, 1000);
    }
}

function handleTime() {
    time = parseInt(timeRemaining.innerHTML.split(" ")[1]);
    time--;
    timeRemaining.textContent = "Time: " + time;

    if (time <= 0 || quizComplete) {
        console.log(quizComplete);
        clearInterval(decrementTimer);
    }
}

// Handles the timer when incorrect answers are selected
function penalizeTime() {
    let timeRemaining = document.querySelector("#timeRemaining");
    time = parseInt(timeRemaining.innerHTML.split(" ")[1]);
    time = time - 10;

    timeRemaining.textContent = "Time: " + ((time < 0) ? 0 : time);
}

function saveInitials() {
    let currentInitials = document.querySelector("#initials").value;
    let timeRemaining = document.querySelector("#timeRemaining");
    currentTime = parseInt(timeRemaining.innerHTML.split(" ")[1]);

    // This is the object that's going to get pushed onto the
    // list of high scores if it qualifies as a new entry (new initials, higher score)
    let currentScore = {
        initials: currentInitials,
        score: currentTime
    }

    let highScores = localStorage.getItem("highScores") || [];
    console.log("hs:", highScores);
    if (!isInHighScoreListAndUpdates(currentScore, highScores)) {
        if (highScores.length > 1)
            highScores = JSON.parse(highScores);
        
        highScores.push(currentScore);
        localStorage.setItem("highScores", JSON.stringify(highScores))
    }
    
    renderHighScores();
}

function isInHighScoreListAndUpdates(currentScore, highScores) {
    let isInList = false;
    if (!!highScores && highScores.length > 0) {
        // Searches through all the objects in the highScores object array
        let parsedScores = JSON.parse(highScores);
        parsedScores.find(function(scoreObj, index) {
            if (scoreObj.initials === currentScore.initials) {
                console.log("initials found: " + scoreObj.initials);
                isInList = true;
                // Updates the score if it's a new high score
                if (currentScore.score > parsedScores[index].score) {
                    console.log("new high score: ", currentScore.score);
                    parsedScores[index].score = currentScore.score;
                    localStorage.setItem("highScores", JSON.stringify(parsedScores))
                }
            }
        })
    }

    
    return isInList;
}

// Displays the high score list by sorting the scores object by score ascending
// and then adds that to an unordered list which gets appended to the score section
function renderHighScores() {
    let finalScreen = document.querySelector("#finalScreen");
    let highScoreScreen = document.querySelector("#highScoreScreen");
    let highScores = localStorage.getItem("highScores");
    let answerFeedbackMessage = document.querySelector("#answerFeedbackMessage");

    answerFeedbackMessage.style = "display: none";

    if (!highScores) {
        console.log("return");
        return;
    }

    finalScreen.style = "display: none";
    highScoreScreen.style = "display: block";

    highScores = JSON.parse(highScores);
    highScores.sort((a, b) => b.score - a.score);
    console.log("hs:", highScores);

    removeScoreList();

    let ulElem = document.createElement("ul");
    ulElem.setAttribute("id", "scoreList");

    // Creates the first row of the list that has the headers
    let liHeaderElem = document.createElement("li");
    let spanInitialsHeader = document.createElement("span");
    let spanScoreHeader = document.createElement("span");
    spanInitialsHeader.textContent = "Initials";
    spanScoreHeader.textContent = "Score";
    liHeaderElem.appendChild(spanInitialsHeader);
    liHeaderElem.appendChild(spanScoreHeader);
    ulElem.appendChild(liHeaderElem);
    

    // Creates the html elements that make up the high score list
    for (let index = 0; index < highScores.length; index++) {
        ulElem.appendChild(createScoreHTML(highScores[index]));
        highScoreScreen.appendChild(ulElem);
    }
}

function removeScoreList() {
    // This makes it so we re-render the entire score list every time
    // so that it gets properly sorted
    if (document.getElementById("scoreList")) {
        highScoreScreen.removeChild(document.getElementById("scoreList"));
    }
}

// Makes a score list element that will get added to the high score list
function createScoreHTML(scoreObj) {
    let liRow = document.createElement("li");
    let spanInitials = document.createElement("span");
    let spanScore = document.createElement("span");

    spanInitials.textContent = scoreObj.initials;
    spanScore.textContent = scoreObj.score;
    liRow.appendChild(spanInitials);
    liRow.appendChild(spanScore);
    return liRow;
}

function displayCorrectMessage(questionNumber) {
    feedbackSection.style = "display: block";
    let answerFeedbackMessage = document.querySelector("#answerFeedbackMessage");
    answerFeedbackMessage.style = "display: block";
    answerFeedbackMessage.textContent = `${questionNumber}: Correct answer!`;
}

function displayIncorrectMessage(questionNumber) {
    feedbackSection.style = "display: block";
    let answerFeedbackMessage = document.querySelector("#answerFeedbackMessage");
    answerFeedbackMessage.style = "display: block";
    answerFeedbackMessage.textContent = `${questionNumber}: Incorrect answer!`;
    penalizeTime();
}

function init() {
    introSection.style = "display: block";
}

init();