var questions = [
    {
        number: 0,
    },
    {
        number: 1,
        question: "Which of the following files is a JavaScript file?",
        options: [
            { text: "index.html", correct: false },
            { text: "style.css", correct: false },
            { text: "index.js", correct: true },
            { text: "sillycat.gif", correct: false },
        ]
    },
    {
        number: 2,
        question: "Which symbols are used to call a function?",
        options: [
            { text: "<>", correct: false },
            { text: "()", correct: true },
            { text: "{}", correct: false },
            { text: "[]", correct: false },
        ]
    },
    {
        number: 3,
        question: "Which symbols are used to store an array of objects?",
        options: [
            { text: "<>", correct: false },
            { text: "()", correct: false },
            { text: "{}", correct: false },
            { text: "[]", correct: true },
        ]
    },
    {
        number: 4,
        question: "Which JavaScript tag is not used to store an object?",
        options: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "root", correct: true },
            { text: "const", correct: false },
        ]
    },
    {
        number: 5,
        question: "Which is NOT a data type in JavaScript?",
        options: [
            { text: "loop", correct: true },
            { text: "string", correct: false },
            { text: "boolean", correct: false },
            { text: "number", correct: false },
        ]
    },
    {
        number: 6,
        question: "Which of the following lines of code will return a 'truthy' boolean value?",
        options: [
            { text: " 'four' == 4", correct: false },
            { text: "'4' =! 4", correct: false },
            { text: " '4' == 4", correct: true },
            { text: "'4' === 4", correct: false },
        ]
    },
    {
        number: 8,
        question: "Which of the following arguments increments 'i' by 1?",
        options: [
            { text: "i+", correct: false },
            { text: "i++", correct: true },
            { text: "i+1", correct: false },
            { text: "i*1", correct: false },

        ]
    },
    {
        number: 7,
        question: "What argument can be used to convert a string value to a number value?",
        options: [
            { text: "parseInt", correct: true },
            { text: "parseFloat", correct: false },
            { text: "convertNum", correct: false },
            { text: "JSON.parse", correct: false },

        ]
    },
    {
        number: 9,
        question: "What does 'DOM' stand for?",
        options: [
            { text: "data ordering manual", correct: false },
            { text: "dichotomous operating module", correct: false },
            { text: "delicate object modifaction", correct: false},
            { text: "document object model", correct: true },

        ]
    },
    {
        number: 10,
        question: "Which of the following programs can be used to simplify the JavaScript syntax?",
        options: [
            { text: "bootstrap", correct: false },
            { text: "JSON", correct: false },
            { text: "jquery", correct: true },
            { text: "node", correct: false },

        ]
    },
];

var questionEl = document.getElementById("quiz-question");
var highscoreEl = document.getElementById("high-score");
var playerScoreEl = document.getElementById("player-score");
var answerBtn = document.getElementById("quiz-options");
var nextBtn = document.getElementById("next");
var startScreen = document.querySelector(".start-box");
var quizScreen = document.querySelector(".quiz-box");
var scoreScreen = document.querySelector(".score-box");
var timer = document.querySelector(".timer");
var count;
let questionIndex = 0
let score = 0;
let highScore = localStorage.getItem("high score") || 0;

function countdownTimer() {
    timer.classList.replace("hidden", "show");
    let timeLeft = 20;
    count = setInterval(() => {
        timer.textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(count);
            crunchScore();
        };   
    }, 1000)
};

function startQuiz() {
    startScreen.classList.replace("show", "hidden");
    quizScreen.classList.replace("hidden", "show");
    scoreScreen.classList.replace("show", "hidden");
    nextBtn.textContent = `NEXT`;
    questionIndex = 1;
    score = 0;
    countdownTimer();
    showQuestion();
};

function resetQuestion() {
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
};

function selectAnswer(event) {
    var selectedBtn = event.target;
    var isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        clearInterval(count);
        countdownTimer();
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
};

function showQuestion() { 
    resetQuestion();
    let currentQuestion = questions[questionIndex];
    var questionNum = questionIndex;
    questionEl.innerHTML = questionNum + ". " + currentQuestion.question;
    currentQuestion.options.forEach(options => {
        const button = document.createElement('button');
        button.textContent = options.text;
        button.classList.add("option");
        answerBtn.appendChild(button);
        if (options.correct) {
            button.dataset.correct = options.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function crunchScore() {
    timer.classList.replace("show", "hidden");
    questionIndex = 11;
    timeLeft = 0;
    if (highScore < score) {
        localStorage.setItem("high score", score)
    };
    quizScreen.classList.replace("show", "hidden");
    scoreScreen.classList.replace("hidden", "show");
    highScore = localStorage.getItem("high score");
    playerScoreEl.textContent = `You scored ${score} out of ${(questions.length - 1)}`;
    highscoreEl.textContent = `Your high score is ${highScore} out of ${(questions.length - 1)}`;
    nextBtn.textContent = `RESTART`;
};
    

function handleNextBtn() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion();
    }
    else {
        localStorage.setItem("score", score);
        crunchScore();
    }
};

nextBtn.addEventListener("click", () => {
    if (questionIndex <= 0 || questionIndex >= 11) {
        startQuiz();
    }
    else if (questionIndex < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
});

//startQuiz();