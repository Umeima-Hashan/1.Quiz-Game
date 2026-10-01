// DOM ELEMENTS
const startScreen = document.getElementById("start-screen"); //div
const quizScreen = document.getElementById("quiz-screen"); //div
const resultScreen = document.getElementById("result-screen"); //div
const startButton = document.getElementById("start-btn"); //button
const questionText = document.getElementById("question-text"); //h2
const answersContainer = document.getElementById("answers-container"); // div
const currentQuestionSpan = document.getElementById("current-question"); //<span> 1 </span>
const totalQuestionsSpan = document.getElementById("total-questions"); //<span id="total-questions"> 5 </span>
const scoreSpan = document.getElementById("score"); //<span id="score">0</span>
const finalScoreSpan = document.getElementById("final-score"); //<span id="final-score"> 0 </span>
const maxScoreSpan = document.getElementById("max-score"); //  <span id="max-score"> 5 </span>
const resultMessage = document.getElementById("result-message"); //<div id="result-message"> Good Job! </div>
const restartButton = document.getElementById("restart-btn"); // <button id="restart-btn">Restart Quiz</button>
const progress = document.getElementById("progress"); //<div id="progress"></div>

const quizQestions = [
  {
    question: "what is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "london", correct: false },
    ],
  },
//   {
//     question: "which planet is known as Red planet?",
//     answers: [
//       { text: "venus", correct: false },
//       { text: "mars", correct: true },
//       { text: "jupiter", correct: false },
//       { text: "saturn", correct: false },
//     ],
//   },
//   {
//     question: "which of these is not a programming language?",
//     answers: [
//       { text: "java", correct: false },
//       { text: "python", correct: false },
//       { text: "banana", correct: true },
//       { text: "javascript", correct: false },
//     ],
//   },
//   {
//     question: "which is the largest ocean on earth?",
//     answers: [
//       { text: "atlantic ocean", correct: false },
//       { text: "indian ocean", correct: false },
//       { text: "arctic ocean", correct: false },
//       { text: "pacific ocean", correct: true },
//     ],
//   },
//   {
//     question: "what is the chemical symbol of gold?",
//     answers: [
//       { text: "Go", correct: false },
//       { text: "Gd", correct: false },
//       { text: "Au", correct: true },
//       { text: "Ag", correct: false },
//     ],
//   },
];

// QUIZ STATE VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQestions.length;
maxScoreSpan.textContent = quizQestions.length;

// EVENT LISTENERS
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset variables
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;
  let answerDisabled = false

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset variable
  answerDisabled = false;
  let currentQuestion = quizQestions[currentQuestionIndex]; //quizQuestions[0] === 1st {} object
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQestions.length) * 100;
  progress.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text; //1st answer ==> berlin then 2nd answer ==> paris ...
    button.classList.add("answer-btn");

    //
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  //the event contains information about what happend. for example "which button did the user click?"
  if (answerDisabled) return;

  answerDisabled = true; //now answers are disabled, because after selecting an answer, we don't want the user clicking multiple answers.

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true"; //The dataset value is stored as text. here "true" or "false"

  Array.from(answersContainer.children).forEach((button) => {
    //answersContainer.children ===> gives all the buttons inside, it's a collection of elements.      Array.from(...) converts that collection into a normal array.==> [london,berlin,paris,madrid]
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if(button === selectedButton){
      button.classList.add("incorrect");
    }
  });
  if(isCorrect){
    score = score +1;
    scoreSpan.textContent = score;
  }

  setTimeout(()=>{
    currentQuestionIndex++;

    if(currentQuestionIndex <quizQestions.length){
        showQuestion();
    }else{
        showResult()
    }

  },1000)
}

function showResult(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQestions.length)*100;

    if(percentage===100){ //100
        resultMessage.textContent = "Perfect!";
    }else if (percentage >=80){ //80-99
        resultMessage.textContent = "Great Job!";
    }else if (percentage >=60){ //60-79
        resultMessage.textContent= "Good effort!";
    }else if(percentage >=40){  //40-59
        resultMessage.textContent = "Not bad!";
    }else{
        resultMessage.textContent= "Keep studying!"
    }

}

function restartQuiz() {
    resultScreen.classList.remove("active")
    startQuiz()

}

