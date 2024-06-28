const questions = [
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Camel Path Unit", correct: false },
            { text: "Central Processing Unit", correct: true },
            { text: "Central Path Unit", correct: false },
            { text: "Center Press Unit", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "High Tension Malware Language", correct: false },
            { text: "Hyper Text Malware Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tire Markup Length", correct: false }
        ]
    },
    {
        question: "What is JavaScript?",
        answers: [
            { text: "JavaScript is a client-side scripting language", correct: true },
            { text: "JavaScript is a server-side scripting language", correct: false },
            { text: "JavaScript is a browser-side scripting language", correct: false },
            { text: "JavaScript is a user-side scripting language", correct: false }
        ]
    },
    {
        question: "_____ is the process of finding errors and fixing them within a program.",
        answers: [
            { text: "Compiling", correct: false },
            { text: "Debugging", correct: true },
            { text: "Scanning", correct: false },
            { text: "Executing", correct: false }
        ]
    }
];

const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsEl.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtonsEl.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Restart";
    nextBtn.style.display = "block";
    nextBtn.addEventListener("click", reloadPage);
}

function reloadPage() {
    location.reload();
}

startQuiz();