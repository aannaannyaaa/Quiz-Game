const triviaQuestions = [
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answers: [
        { text: "Brazil", correct: false },
        { text: "Germany", correct: false },
        { text: "France", correct: true },
        { text: "Argentina", correct: false }
    ]
},
{
    question: "Who is the all-time leading goal scorer in the English Premier League?",
    answers: [
        { text: "Thierry Henry", correct: false },
        { text: "Alan Shearer", correct: true },
        { text: "Wayne Rooney", correct: false },
        { text: "Sergio Agüero", correct: false }
    ]
},
{
    question: "Which football club has won the UEFA Champions League the most times?",
    answers: [
        { text: "Real Madrid", correct: true },
        { text: "Barcelona", correct: false },
        { text: "Manchester United", correct: false },
        { text: "Bayern Munich", correct: false }
    ]
},
{
    question: "Who won the FIFA Ballon d'Or award in 2020?",
    answers: [
        { text: "Lionel Messi", correct: false },
        { text: "Cristiano Ronaldo", correct: false },
        { text: "Robert Lewandowski", correct: true },
        { text: "Neymar Jr", correct: false }
    ]
}];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;

function startTrivia() {
  nextButton.addEventListener('click', handleNextQuestion);
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentTriviaQuestion = triviaQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentTriviaQuestion.question;

  currentTriviaQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerHTML = answer.text;
      button.classList.add('button');
      answerButtonsElement.appendChild(button);
      if (answer.correct) {
          button.dataset.correct = answer.correct;
      }

      button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) {
      score++;
      selectedButton.classList.add('correct');
  } else {
      selectedButton.classList.add('incorrect');
  }
  Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === 'true') {
          button.classList.add('correct');
      }
      button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function handleNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < triviaQuestions.length) {
      showQuestion();
  } else {
      showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = "You scored " + score + " out of " + triviaQuestions.length + "!";
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = 'block';
  nextButton.addEventListener('click', startTrivia);
}

startTrivia();
