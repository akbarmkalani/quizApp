import formatData from "./helper.js"

const level  = localStorage.getItem("level") || "medium";

console.log(formatData);
const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerText = document.querySelectorAll(".answer-text")
const scoreTExt = document.getElementById("scores")
const nextBtn = document.getElementById("next-btn")
const finishBtn = document.getElementById("finish-btn")
 const questionNumber = document.getElementById("question-number")

  const error = document.getElementById("erorr")


const COREECT_BONUS = 10
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;  // 

let questionIndex = 0

let formattedData = null;
let correctAnswer = null
let score = 0
let isAccepted = true

const fetchData = async () => {
  try{
    const response = await fetch(URL);  // Corrected variable name
    const json = await response.json();
    formattedData = formatData(json.results);  // Corrected property name
    start();
   } catch(err) {
    loader.style.display = "none";
    error.style.display = "block";
   }
};

const start = () => {
  showQuestion()
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
   questionNumber.innerText = questionIndex + 1;
  const { question, answer, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
   console.log(correctAnswer);
  questionText.innerHTML = question;
  answerText.forEach((btn, index) => {
    btn.innerText = answer[index]
  })

}

const checkAnswer = (event, index) => {
  if (!isAccepted) return
  isAccepted = false
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct")
    score += COREECT_BONUS;
    scoreTExt.innerText = score
  } else {
    event.target.classList.add("incorrect")
    answerText[correctAnswer].classList.add("correct")

  }
}

const nextHandler = () => {
  questionIndex++;
   if(questionIndex < formattedData.length - 1) {
     isAccepted  = true
     removeClass();
    showQuestion();
   } else{
       finishHandler()
   }

}
  const finishHandler = () => {
    localStorage.setItem("score", JSON.stringify(score));
    window.location.assign("end.html")
  }



 const removeClass = () => {
  answerText.forEach((btn) => btn.className = "answer-text")
 }



window.addEventListener("load", fetchData);
nextBtn.addEventListener("click", nextHandler)
finishBtn.addEventListener("click", finishHandler)
answerText.forEach((btn, index) => {

  btn.addEventListener("click", (event) => checkAnswer(event, index));
})


