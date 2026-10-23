const QUIZ_NAME = "同一成分の落とし穴クイズ（調剤事務向け）";

// 前回のクイズで設定されていた送信先を引き継いでいます。
// 別のスプレッドシートへ送る場合は、対応するApps Scriptの /exec URLに変更してください。
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxCGQdVIRdGYjocIAdfrMA_gUYtxovXCQBj4IDBKXuUZTP7BKx5z0YVRRHIheUsRTI/exec";

const questions = [
  {
    text: `<strong>問題1</strong><br>
処方箋は「<b>ニフェジピンL錠20mg</b>」。<br>
レセコンで「<b>ニフェジピンCR錠20mg</b>」が見つかった。<br>
成分も20mgも同じなので、薬剤師への確認なしでCR錠を選んで入力した。<br><br>
この対応は正しい？`,
    answer: false,
    explanation: `同じニフェジピンでも、<b>L錠とCR錠では薬の放出特性や通常の服用回数が違います。</b><br>同じ20mgでも、そのまま置き換えて入力しないで薬剤師に確認しましょう。`
  },
  {
    text: `<strong>問題2</strong><br>
処方箋には「<b>デパケン錠200mg</b>」。<br>
レセコンで「<b>デパケンR錠200mg</b>」を見つけた。<br>
「R」が付いただけなので、同じ薬としてそのまま入力した。<br><br>
この対応は正しい？`,
    answer: false,
    explanation: `<b>デパケン錠とデパケンR錠は別の製剤です。</b><br>R錠は徐放性（ゆっくり放出される）の製剤。商品名の「R」も見逃さず、薬剤師へ確認しましょう。`
  },
  {
    text: `<strong>問題3</strong><br>
処方箋は「<b>メトグルコ錠250mg</b>」。<br>
検索すると「<b>グリコラン錠250mg</b>」も出てきた。<br>
同じメトホルミンでも別の商品なので、入力を確定する前に薬剤師に確認した。<br><br>
この対応は正しい？`,
    answer: true,
    explanation: `その対応でOK！<br><b>メトグルコとグリコランは同じ成分・規格でも、承認されている用量などが異なります。</b><br>事務スタッフだけで変更を判断せず、薬剤師に確認しましょう。`
  },
  {
    text: `<strong>問題4</strong><br>
処方箋は「<b>ペンタサ錠</b>」。<br>
レセコンの候補に「<b>アサコール錠</b>」が出てきた。<br>
どちらもメサラジンなので、同じ薬として好きな方を選んで入力してよい。<br><br>
この考え方は正しい？`,
    answer: false,
    explanation: `<b>ペンタサとアサコールは成分が同じでも、薬を放出する仕組みや適応に違いがあります。</b><br>処方された薬品名・規格を確認し、勝手に別製剤を入力しないようにしましょう。`
  },
  {
    text: `<strong>問題5</strong><br>
「<b>ヘルベッサー錠</b>」を入力しようとしたら、「<b>ヘルベッサーRカプセル</b>」も見つかった。<br>
成分名がどちらもジルチアゼムなので、違いを確認せず入力してよい。<br><br>
この考え方は正しい？`,
    answer: false,
    explanation: `<b>ヘルベッサー錠とヘルベッサーRカプセルは、通常の服用回数などが違います。</b><br>同じ成分でも「錠」「Rカプセル」の違いは重要です。薬剤師に確認しましょう。`
  },
  {
    text: `<strong>問題6</strong><br>
処方箋は「<b>セレニカR錠200mg</b>」。<br>
候補に「<b>デパケンR錠200mg</b>」が出てきた。<br>
どちらもバルプロ酸の徐放製剤だが、同じように入力していいか薬剤師に確認した。<br><br>
この対応は正しい？`,
    answer: true,
    explanation: `その対応でOK！<br><b>両方ともバルプロ酸の徐放製剤ですが、通常の用法や製剤の特徴が異なります。</b><br>「R」が同じでも、勝手に同一製剤と判断しないことが大切です。`
  },
  {
    text: `<strong>問題7</strong><br>
処方箋は「<b>トラマールOD錠</b>」。<br>
同じトラマドール成分の「<b>ワントラム錠</b>」が検索で見つかった。<br>
成分が同じなので、事務の判断でワントラムに変更して入力してよい。<br><br>
この考え方は正しい？`,
    answer: false,
    explanation: `<b>トラマールOD錠は速放性、ワントラム錠は1日1回型の徐放性製剤です。</b><br>同一成分でも使い方が違います。変更の判断は薬剤師に確認しましょう。`
  },
  {
    text: `<strong>問題8</strong><br>
処方箋は「<b>レバミピド錠100mg「トーワ」</b>」。<br>
薬剤師が変更調剤の可否を確認して、「<b>レバミピド錠100mg「サワイ」</b>」で調剤すると決めた。<br>
その連絡を受けて、実際に調剤する薬を正しく入力した。<br><br>
この対応は正しい？`,
    answer: true,
    explanation: `その対応でOK！<br><b>同一成分の変更がすべて禁止なわけではありません。</b><br>必要な確認を薬剤師が行い、決定した薬品名で正しく入力することが大切です。`
  },
  {
    text: `<strong>問題9</strong><br>
処方箋は「<b>アムロジピンOD錠5mg</b>」。<br>
レセコンには「<b>アムロジピン錠5mg</b>」もあった。<br>
成分と5mgが同じなので、事務の判断だけで普通錠に変更して入力した。<br><br>
この対応は正しい？`,
    answer: false,
    explanation: `<b>普通錠とOD錠は剤形が違います。</b><br>変更可能な場合もありますが、事務が独断で変更して入力するのは避けましょう。薬剤師に確認してください。`
  },
  {
    text: `<strong>問題10</strong><br>
レセコンの薬品候補に、似た名前の薬がいくつか並んだ。<br>
「L」「CR」「R」「OD」などの文字や規格を見直し、処方箋と違う場合は薬剤師に確認してから入力する。<br><br>
この対応は正しい？`,
    answer: true,
    explanation: `その対応でOK！<br><b>成分が同じでも、製剤・規格・使い方が違うことがあります。</b><br>迷ったら自己判断せず、薬剤師に確認。これがこのクイズで一番伝えたいポイントです！`
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
