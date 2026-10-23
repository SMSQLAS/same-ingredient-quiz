const QUIZ_NAME = "同一成分の落とし穴クイズ（調剤事務向け）";

// 前回のクイズで設定されていた送信先を引き継いでいます。
// 別のスプレッドシートへ送る場合は、対応するApps Scriptの /exec URLに変更してください。
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxCGQdVIRdGYjocIAdfrMA_gUYtxovXCQBj4IDBKXuUZTP7BKx5z0YVRRHIheUsRTI/exec";

const questions = [
  {
    text: `<strong>問題1</strong><br>
処方箋は「<b>ニフェジピンL錠20mg</b>」。<br>
レセコンで「<b>ニフェジピンCR錠20mg</b>」を見つけた。<br>
有効成分も20mgも同じなので、L錠の代わりにCR錠を事務の判断だけで選んでよい。<br><br>
○か×か？`,
    answer: false,
    explanation: `×！<br><b>ニフェジピンL錠とCR錠は、成分・含量が同じでも放出の仕組みが違う製剤です。</b><br>処方箋と違う薬品を自己判断で選ばず、薬剤師に確認しましょう。`
  },
  {
    text: `<strong>問題2</strong><br>
処方箋は「<b>レバミピド錠100mg「トーワ」</b>」。<br>
薬剤師が変更調剤の条件を確認し、「<b>レバミピド錠100mg「サワイ」</b>」で調剤すると決めた。<br>
事務スタッフは、実際に調剤する「サワイ」を選んで入力した。<br><br>
この対応は正しい？`,
    answer: true,
    explanation: `○！<br><b>同じ成分の薬への変更がすべて禁止というわけではありません。</b><br>薬剤師が変更の可否を判断し、決めた薬品を正しくレセコンに入力することが大切です。`
  },
  {
    text: `<strong>問題3</strong><br>
「<b>デパケン錠200mg</b>」と「<b>デパケンR錠200mg</b>」は、<b>有効成分は同じ</b>だが、薬の放出の仕方が異なる。<br><br>
○か×か？`,
    answer: true,
    explanation: `○！<br>どちらも<b>バルプロ酸ナトリウム</b>ですが、デパケンR錠は徐放性製剤です。<br>後ろの「R」も大切な薬品名の一部です。`
  },
  {
    text: `<strong>問題4</strong><br>
「<b>メトグルコ錠250mg</b>」と「<b>グリコラン錠250mg</b>」は、有効成分が異なる薬である。<br><br>
○か×か？`,
    answer: false,
    explanation: `×！<br>両方とも有効成分は<b>メトホルミン塩酸塩</b>です。<br>ただし、承認されている用量などに違いがあるため、同一成分・同じmgだけを根拠に単純な変更はできません。`
  },
  {
    text: `<strong>問題5</strong><br>
「<b>ペンタサ錠</b>」と「<b>アサコール錠</b>」は、どちらもメサラジン製剤だが、薬が放出される仕組みが異なる。<br><br>
○か×か？`,
    answer: true,
    explanation: `○！<br>どちらも<b>メサラジン</b>が有効成分ですが、消化管での放出特性が違います。<br>商品名が異なる場合は「同成分だから同じ」とは判断しないようにしましょう。`
  },
  {
    text: `<strong>問題6</strong><br>
「<b>ヘルベッサー錠</b>」と「<b>ヘルベッサーRカプセル</b>」は、有効成分が同じなので、通常の服用回数も同じである。<br><br>
○か×か？`,
    answer: false,
    explanation: `×！<br>どちらも<b>ジルチアゼム</b>ですが、ヘルベッサー錠は通常1日3回、Rカプセルは通常1日1回です。<br>同じ成分でも用法が違う例です。`
  },
  {
    text: `<strong>問題7</strong><br>
「<b>アムロジピン錠5mg</b>」と「<b>アムロジピンOD錠5mg</b>」は、後ろに「OD」が付くだけで、錠剤の種類（剤形）は完全に同じである。<br><br>
○か×か？`,
    answer: false,
    explanation: `×！<br><b>OD錠は口腔内崩壊錠</b>で、普通錠とは剤形が違います。<br>変更できるケースもありますが、事務スタッフだけで判断して薬品を置き換えないようにしましょう。`
  },
  {
    text: `<strong>問題8</strong><br>
「<b>トラマールOD錠</b>」と「<b>ワントラム錠</b>」は、どちらもトラマドール製剤だが、薬の放出の仕方や通常の服用回数が異なる。<br><br>
○か×か？`,
    answer: true,
    explanation: `○！<br>トラマールOD錠は速放性、ワントラム錠は1日1回型の徐放性製剤です。<br>同じ成分でも、使用目的や用法を確認する必要があります。`
  },
  {
    text: `<strong>問題9</strong><br>
処方箋は「<b>アムロジピンOD錠5mg</b>」。<br>
薬剤師が処方医に確認して普通錠への変更が了承され、実際に「<b>アムロジピン錠5mg</b>」で調剤することになった。<br>
事務スタッフは、<b>変更後の普通錠</b>を選んで入力した。<br><br>
この対応は正しい？`,
    answer: true,
    explanation: `○！<br>処方医への確認が済み、薬剤師から変更後の薬品を指示された場合は、<b>実際に調剤する薬品を正しく入力</b>します。<br>大切なのは「変更を全部禁止する」ことではなく「勝手に判断しない」ことです。`
  },
  {
    text: `<strong>問題10</strong><br>
薬剤師の確認後、処方箋に記載された薬から別の薬品に変更して調剤した。<br>
レセコンには<b>元の薬品名のまま</b>入力されているが、有効成分が同じなら直さなくてよい。<br><br>
○か×か？`,
    answer: false,
    explanation: `×！<br><b>実際に調剤した薬品と、レセコンで選んだ薬品が一致しているか</b>確認しましょう。<br>迷ったら薬剤師へ確認。「同じ成分だから入力は何でもOK」ではありません。`
  }
];

let current = 0;
let score = 0;
let answered = false;
const answerLog = [];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startButton = document.getElementById("startButton");
const trueButton = document.getElementById("trueButton");
const falseButton = document.getElementById("falseButton");
const nextButton = document.getElementById("nextButton");
const questionText = document.getElementById("questionText");
const feedback = document.getElementById("feedback");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const scoreText = document.getElementById("scoreText");
const resultForm = document.getElementById("resultForm");
const sendButton = document.getElementById("sendButton");
const sendStatus = document.getElementById("sendStatus");
const formError = document.getElementById("formError");
const retryButton = document.getElementById("retryButton");

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => {
    item.classList.toggle("active", item === screen);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  current = 0;
  score = 0;
  answered = false;
  answerLog.length = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const question = questions[current];

  questionText.innerHTML = question.text;
  progressText.textContent = `問題${current + 1} / ${questions.length}`;
  scoreText.textContent = `正解 ${score}`;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;

  feedback.className = "feedback hidden";
  feedback.innerHTML = "";
  nextButton.classList.add("hidden");

  trueButton.disabled = false;
  falseButton.disabled = false;
}

function answerQuestion(selectedAnswer) {
  if (answered) return;
  answered = true;

  const question = questions[current];
  const isCorrect = selectedAnswer === question.answer;

  if (isCorrect) score += 1;

  answerLog.push({
    number: current + 1,
    selected: selectedAnswer,
    correct: question.answer,
    isCorrect
  });

  trueButton.disabled = true;
  falseButton.disabled = true;
  scoreText.textContent = `正解 ${score}`;

  feedback.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedback.innerHTML = `
    <div class="feedback-title">${isCorrect ? "⭕ 正解！" : "❌ 不正解"}</div>
    <div>${question.explanation}</div>
  `;

  nextButton.textContent =
    current === questions.length - 1 ? "結果を見る" : "次の問題へ";
  nextButton.classList.remove("hidden");
}

function goNext() {
  if (!answered) return;

  if (current < questions.length - 1) {
    current += 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);

  document.getElementById("resultScore").textContent =
    `${score} / ${questions.length}点`;

  resultForm.reset();
  formError.classList.add("hidden");
  sendStatus.classList.add("hidden");
  sendStatus.textContent = "";

  sendButton.disabled = false;
sendButton.textContent = "結果を送信する";

// 結果を送信するまでは再挑戦できない
retryButton.disabled = true;
}

function buildPayload() {
  const difficulty =
    document.querySelector('input[name="difficulty"]:checked')?.value || "";

  const wrongNumbers = answerLog
    .filter((item) => !item.isCorrect)
    .map((item) => `問題${item.number}`);

  return {
    quizName: QUIZ_NAME,
    storeName: document.getElementById("storeName").value.trim(),
    userName: document.getElementById("userName").value.trim(),
    difficulty,
    score,
    total: questions.length,
    scoreDisplay: `${score}/${questions.length}`,
    wrongAnswers: wrongNumbers.length ? wrongNumbers.join("、") : "なし",
    answerDetail: answerLog
      .map((item) =>
        `問題${item.number}:${item.selected ? "○" : "×"}`
      )
      .join("｜")
  };
}

async function submitResult(event) {
  event.preventDefault();

  const payload = buildPayload();

  if (!payload.storeName || !payload.userName || !payload.difficulty) {
    formError.textContent = "店舗名・名前・難易度をすべて入力してください。";
    formError.classList.remove("hidden");
    return;
  }

  formError.classList.add("hidden");

  if (!WEB_APP_URL) {
    sendStatus.innerHTML =
      "Apps ScriptのURLがまだ設定されていません。<br>script.js上部のWEB_APP_URLにURLを入れてください。";
    sendStatus.classList.remove("hidden");
    return;
  }

  sendButton.disabled = true;
  sendButton.textContent = "送信中…";
  retryButton.disabled = true;
  sendStatus.textContent = "送信中です…";
  sendStatus.classList.remove("hidden");

  try {
    const sendData = {
  timestamp: new Date().toISOString(),
  quizTitle: QUIZ_NAME,
  storeName: payload.storeName,
  name: payload.userName,
  difficulty: payload.difficulty,
  score: payload.scoreDisplay,
  answers: payload.wrongAnswers
};

await fetch(WEB_APP_URL, {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "text/plain;charset=utf-8"
  },
  body: JSON.stringify(sendData)
});

sendStatus.textContent = "✅ 送信処理が完了しました！";
sendButton.textContent = "送信済み";
retryButton.disabled = false;
  } catch (error) {
    console.error(error);
    sendStatus.textContent =
      "送信できませんでした。通信状況とApps ScriptのURLを確認してください。";
    sendButton.disabled = false;
sendButton.textContent = "結果を送信する";
retryButton.disabled = true;
  }
}

startButton.addEventListener("click", startQuiz);
trueButton.addEventListener("click", () => answerQuestion(true));
falseButton.addEventListener("click", () => answerQuestion(false));
nextButton.addEventListener("click", goNext);
resultForm.addEventListener("submit", submitResult);
retryButton.addEventListener("click", startQuiz);
