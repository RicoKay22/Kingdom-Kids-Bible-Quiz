// this fetch data from session storage and renders the result page with score, shoutout, and question breakdown.
const questions = JSON.parse(sessionStorage.getItem("quizQuestions"));
const userAnswers = JSON.parse(sessionStorage.getItem("quizAnswers"));

const name = sessionStorage.getItem("name");
const church = sessionStorage.getItem("church");

// dom elements
const scoreText = document.getElementById("user-score");
const shoutoutText = document.getElementById("shoutout");
const resultList = document.getElementById("result-container");
const replayBtn = document.getElementById("replay-btn");
const downloadBtn = document.getElementById("download-btn");

let score = 0;

// for calculating and displaying the kids score
questions.forEach((q, index) => {
  if (userAnswers[index] === q.correctAnswer) {
    score++;
  }
});

scoreText.textContent = `${name}, your score is ${score}/${questions.length}`;
shoutoutText.textContent = `Great job to ${church}! 🎉`;

// rendering question and answers with correct/wrong indicators and explanations(for True/False questions only)
questions.forEach((q, index) => {
  const container = document.createElement("div");
  container.classList.add("result-question");

  const questionEl = document.createElement("h3");
  questionEl.textContent = `${index + 1}. ${q.question}`;
  container.appendChild(questionEl);

  q.options.forEach(option => {
    const opt = document.createElement("p");

    if (option === q.correctAnswer) {
      opt.classList.add("correct");
    }

    if (option === userAnswers[index] && option !== q.correctAnswer) {
      opt.classList.add("wrong");
    }

    opt.textContent = option;
    container.appendChild(opt);
  });

  // shows explanation only for True/False questions that were answered incorrectly and have an explanation provided
  if (q.explanation && userAnswers[index] !== q.correctAnswer) {
    const exp = document.createElement("p");
    exp.classList.add("explanation");
    exp.textContent = `Explanation: ${q.explanation}`;
    container.appendChild(exp);
  }

  resultList.appendChild(container);
});

// perfect score message
if (score === questions.length) {
  shoutoutText.textContent = `🎉 PERFECT SCORE! Well done ${name}!`;
}

// if the kid choose to replay the quiz
replayBtn.onclick = () => {
  sessionStorage.removeItem("quizQuestions");
  sessionStorage.removeItem("quizAnswers");
  window.location.href = "rules.html";
};

// pdf download functionality using html2canvas and jsPDF libraries. It captures the result page as an image and generates a multi-page PDF if necessary, then prompts the user to download it.
downloadBtn.onclick = async () => {
  document.body.classList.add("pdf-mode");

  await new Promise(r => setTimeout(r, 300)); // allow reflow

  const { jsPDF } = window.jspdf;
  const element = document.getElementById("pdf-content");

  const canvas = await html2canvas(element, {
    scale: 3,
    backgroundColor: "#ffffff",
    useCORS: true,
    scrollY: -window.scrollY
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${name}-Bible-Quiz-Result.pdf`);

  document.body.classList.remove("pdf-mode");
};





