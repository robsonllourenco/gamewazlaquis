const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var contador = 0
let shuffledQuestions, currentQuestionIndex

let somAcerto = document.querySelector('#somAcerto')
let somErro = document.querySelector('#somErro')

function meuMenuToggle() {
  var x = document.getElementById("divAll");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')

  } else {
    startButton.innerText = 'Finish'
    startButton.classList.remove('hide')
    //document.location.reload(true)
    if(startButton.innerText === 'Finish'){
      function resultados() {
        document.getElementById("question-container").style.display = "none"
        document.getElementById("resultados").style.display = "block"
        document.getElementById("span").innerHTML = "" + contador + "";
        
        document.querySelector('#aplausos').play()

        var n = 20;
        var contRegreessiva = document.getElementById("contRegreessiva");
        window.setInterval(function(){
          contRegreessiva.innerHTML = n;
          n--;
        },1000);

        setTimeout(function(){
          window.location.reload();
        }, 20000);
      }
    }
    
    document.getElementById("start-btn").onclick = function() {
      var idOriginal = this.id;
      this.id = "start-btn";
      idOriginal == "start-btn" ? resultados() : '';
    };
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')

    if(element.classList.value == 'correct'){
      contador+=1
      somAcerto.play()
    }
    
  } else {
    element.classList.add('wrong')

    if(element.classList.value == 'wrong'){
      somErro.play()
    }

  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'De acordo com Wazlawick (2021), quantas formas a pesquisa pode ser diferenciada quanto à sua natureza?',
    answers: [
      { text: 'Três', correct: true },
      { text: 'Duas', correct: false },
      { text: 'Quatro', correct: false },
    ]
  },
  {
    question: 'Qual a característica da pesquisa primária de acordo com Wazlawick (2021)?',
    answers: [
      { text: 'Busca responder a questões de pesquisa com dados e resultados de trabalhos publicados.', correct: false },
      { text: 'Obtém informações apenas em trabalhos já publicados.', correct: false },
      { text: 'Busca apresentar conhecimento novo a partir de observações e teorias construídas para explicá-las.', correct: true }
    ]
  },
  {
    question: 'Qual a diferença entre a pesquisa secundária e a pesquisa terciária?',
    answers: [
      { text: 'A pesquisa secundária é uma revisão sistemática sobre revisões sistemáticas, enquanto a pesquisa terciária busca obter informações apenas em trabalhos já publicados.', correct: false },
      { text: 'A pesquisa secundária busca obter informações apenas em trabalhos já publicados, enquanto a pesquisa terciária é uma revisão sistemática sobre revisões sistemáticas.', correct: true },
      { text: 'Não há diferença entre a pesquisa secundária e a pesquisa terciária.', correct: false }
    ]
  },
  {
    question: 'De acordo com Wazlawick (2021), em que momento é interessante realizar uma pesquisa primária?',
    answers: [
      { text: 'Quando ela tem implicação na forma como se entendem os processos e sistemas ou quando tem implicação prática na sua realização.', correct: true },
      { text: 'Quando determinada área de conhecimento já conta com um número significativo de pesquisas secundárias publicadas.', correct: false },
      { text: 'Quando se busca responder a questões de pesquisa com dados e resultados de trabalhos publicados.', correct: false },
    ]
  },
  {
    question: 'Segundo Wazlawick (2021), qual é o objetivo do mapeamento sistemático da literatura?',
    answers: [
      { text: 'Realizar experimentos, entrevistas, observações etc.', correct: false },
      { text: 'Responder a questões de pesquisa com dados e resultados de trabalhos publicados.', correct: false },
      { text: 'Oferecer um panorama da pesquisa, indicando sua evolução e estado atual.', correct: true },
    ]
  },
  {
    question: 'Qual o objetivo da revisão sistemática da literatura?',
    answers: [
      { text: 'Aumentar a compreensão sobre uma área de conhecimento, oferecendo um panorama da pesquisa, indicando sua evolução e estado atual.', correct: false },
      { text: 'Procurar responder a questões de pesquisa com dados e resultados de trabalhos publicados.', correct: true },
      { text: 'Obter informações apenas em trabalhos já publicados.', correct: false },
    ]
  },
  {
    question: 'Segundo Wazlawick (2021), a pesquisa pode ser classificada em relação a diferentes critérios. Em relação à natureza da pesquisa, ela pode ser:',
    answers: [
      { text: 'Qualitativa, quantitativa e mista.', correct: false },
      { text: 'Descritiva, exploratória e explicativa.', correct: false },
      { text: 'Primária, secundária e terciária.', correct: true },
    ]
  },
  {
    question: 'De acordo com Wazlawick (2021), em relação aos objetivos, a pesquisa pode ser:',
    answers: [
      { text: 'Qualitativa, quantitativa e mista.', correct: false },
      { text: 'Exploratória, descritiva, explicativa ou de design.', correct: true },
      { text: 'Primária, secundária e terciária.', correct: false },
    ]
  },
  {
    question: 'O que é pesquisa de design?',
    answers: [
      { text: 'É aquela que busca desenvolver um produto, serviço ou sistema.', correct: true },
      { text: 'É aquela em que o autor tem uma hipótese ou objetivo definido em mente.', correct: false },
      { text: 'É aquela que busca explicar a relação entre variáveis.', correct: false },
    ]
  },
  {
    question: 'O que é pesquisa explicativa?',
    answers: [
      { text: 'É aquela que busca explicar a relação entre variáveis.', correct: true },
      { text: 'É aquela em que o autor tem uma hipótese ou objetivo definido em mente.', correct: false },
      { text: 'É aquela em que o autor não necessariamente tem uma hipótese ou objetivo definido em mente.', correct: false },
    ]
  },
  {
    question: 'Qual a diferença entre a pesquisa primária e secundária?',
    answers: [
      { text: 'Não há diferença entre a pesquisa primária e secundária.', correct: false },
      { text: 'A pesquisa primária busca apresentar conhecimento novo a partir de observações e teorias construídas para explicá-las, enquanto a secundária busca obter informações em trabalhos já publicados.', correct: true },
      { text: 'A pesquisa primária busca obter informações em trabalhos já publicados, enquanto a secundária busca apresentar conhecimento novo a partir de observações e teorias construídas para explicá-las.', correct: false },
    ]
  },
  {
    question: 'O que é característico da pesquisa exploratória, segundo Wazlawick (2021)?',
    answers: [
      { text: 'Busca-se obter dados mais consistentes sobre uma determinada realidade.', correct: false },
      { text: 'Não necessariamente tem uma hipótese ou objetivo definido em mente.', correct: true },
      { text: 'Tem como objetivo explicar as relações de causa e efeito entre variáveis.', correct: false },
    ]
  },
  {
    question: 'Como é definida a pesquisa secundária ou bibliográfica?',
    answers: [
      { text: 'Ela busca apresentar conhecimento novo a partir de observações e teorias construídas para explicá-las.', correct: false },
      { text: 'Ela busca obter informações apenas em trabalhos já publicados.', correct: true },
      { text: 'Ela é uma revisão sistemática sobre revisões sistemáticas.', correct: false },
    ]
  },
  {
    question: 'Quais são as formas usuais de pesquisa secundária?',
    answers: [
      { text: 'Apenas revisão sistemática', correct: false },
      { text: 'Apenas mapeamento sistemático da literatura', correct: false },
      { text: 'Tanto mapeamento sistemático quanto revisão', correct: true },
    ]
  },
  {
    question: 'Em relação aos objetivos, a pesquisa exploratória é definida como:',
    answers: [
      { text: 'Um estudo preliminar de detecção precoce de evasão em cursos de graduação presencial em Computação.', correct: false },
      { text: 'Mais sistemática do que a descritiva, buscando obter dados mais consistentes sobre uma determinada realidade.', correct: false },
      { text: 'O primeiro estágio de um processo de pesquisa mais longo.', correct: true },
    ]
  },
]


