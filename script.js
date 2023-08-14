const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");

//Make an Array of objects that stores questions, choices and answers
const quiz = [
  {
    question:
      "Q. Which of the following are valid ways to represent a colour in CSS?",
    choices: [
      "A valid color name",
      "RGB values",
      "HEX values",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "Q. Which of the following components of the CSS box model are transparent?",
    choices: ["Padding", "Margin", "Both A and B", "Content"],
    answer: "Both A and B",
  },
  {
    question: "Q. What is the function of the HTML style attribute?",
    choices: [
      "It is used to add styles to an HTML element",
      "It is used to uniquely identify some specific styles of some element",
      "Both A and B",
      "None of the above",
    ],
    answer: "It is used to add styles to an HTML element",
  },
  {
    question:
      "Q. Which of the following are examples of block-level elements in HTML?",
    choices: ["<div>", "<p>", "<h1>", "All of the above"],
    answer: "All of the above",
  },
];

//Making variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

//Arrow function to show Questions
const showQuestions = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question; //it will give only ques

  choicesBox.textContent = ""; //to clear the choices
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div"); //method to create element in JS
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add("choice"); //to add class to any element
    choicesBox.appendChild(choiceDiv); //appendChild shows add at last

    choiceDiv.addEventListener("click", () => {
      if (choiceDiv.classList.contains("selected")) {
        choiceDiv.classList.remove("selected");
      } else {
        choiceDiv.classList.add("selected");
      }
    });
  }

  if (currentQuestionIndex < quiz.length) {
    startTimer();
  }
};

//Function to check answers
const checkAnswer = () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    // alert("correct answer");
    displayAlert("Correct Answer!");
    score++;
  } else {
    //alert("wrong answer!");
    displayAlert(
      `Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`
    );
  }
  timeLeft = 15;
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestions();
  } else {
    showScore();
    stopTimer();
  }
};

//Function to show score
const showScore = () => {
  questionBox.textContent = "";
  choicesBox.textContent = "";
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
  displayAlert("You have completed this Quiz !");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timer.style.display = "none";
};

//function to display Alert
const displayAlert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

//Function to start timer
const startTimer = () => {
  clearInterval(timerID); //check for any exist timer;
  timer.textContent = timeLeft;

  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      const confirmUser = confirm(
        "Time Up!!! Do you want to play the quiz again"
      );
      if (confirmUser === true) {
        timeLeft = 15;
        startQuiz();
      } else {
        startBtn.style.display = "block";
        container.style.display = "none";
      }
    }
  };
  timerID = setInterval(countDown, 1000); //it will run the timer at every 1sec
};

//Function to stop timer
const stopTimer = () => {
  clearInterval(timerID);
};

//Function to start quiz
const startQuiz = () => {
  timeLeft = 15;
  timer.style.display = "flex";
  shuffleQuestions(); //it means without clicking on nextBtn, show questions
};

//Function to shuffle question
const shuffleQuestions = () => {
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
};

//Adding Event listner to start button
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz();
});

nextBtn.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (!selectedChoice && nextBtn.textContent === "Next") {
    //alert("Select your answer");
    displayAlert("Select Your Answer");
    return;
  }
  if (quizOver) {
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    showQuestions();
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
});
