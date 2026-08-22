const PASSWORD = "2628";

let currentQuestion = 0;
let currentDatingQuestion = 0;
let currentPhoto = 0;


/* =========================
   SCREEN SYSTEM
========================= */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   PASSWORD
========================= */

function unlock() {
  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");

  if (input.value === PASSWORD) {
    showScreen("questionsScreen");
    loadQuestion();
  } else {
    error.textContent = "Wrong code 😭❤️";
    input.value = "";
    input.focus();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("passwordInput")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        unlock();
      }
    });

  loadMemories();
});


/* =========================
   5 QUESTIONS
========================= */

const questions = [
  {
    question: "What makes a moment truly special?",
    options: [
      "The person you're with ❤️",
      "The place ✨",
      "The memories 🥹"
    ]
  },
  {
    question: "If we could go anywhere together, what would you choose?",
    options: [
      "A peaceful beach 🌊",
      "A beautiful city 🌃",
      "Anywhere together ❤️"
    ]
  },
  {
    question: "What's more important in a relationship?",
    options: [
      "Trust 🤝",
      "Love ❤️",
      "Both forever 💕"
    ]
  },
  {
    question: "What's your favorite kind of date?",
    options: [
      "Long walk 🌹",
      "Dinner together 🍽️",
      "Just spending time together 🫶"
    ]
  },
  {
    question: "And finally... who should stay forever?",
    options: [
      "The one who makes you smile ❤️",
      "The one who understands you 🥹",
      "The one who chooses you every day 💍"
    ]
  }
];

function loadQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("questionNumber").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  document.getElementById("questionText").textContent =
    q.question;

  const options =
    document.getElementById("questionOptions");

  options.innerHTML = "";

  q.options.forEach(option => {
    const button = document.createElement("button");

    button.textContent = option;

    button.onclick = function () {
      answerQuestion();
    };

    options.appendChild(button);
  });
}

function answerQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    setTimeout(() => {
      showScreen("chooseScreen");
    }, 250);

    return;
  }

  loadQuestion();
}


/* =========================
   INSHAAL CHOOSES AHMIE
========================= */

function chooseAhmie() {
  document.getElementById("choiceMessage").textContent =
    "Obviously Ahmie. There was never another choice. ❤️";

  createHearts();

  setTimeout(() => {
    showScreen("letterScreen");
    typeLetter();
  }, 1500);
}

function moveChoice() {
  const button = document.getElementById("otherChoice");

  const x =
    Math.random() * 180 - 90;

  const y =
    Math.random() * 120 - 60;

  button.style.transform =
    `translate(${x}px, ${y}px)`;

  document.getElementById("choiceMessage").textContent =
    "Nice try 😭❤️";
}


/* =========================
   LOVE LETTER
========================= */

const loveLetter = `Ahmie,

If you're reading this, then you made it all the way here.

I don't know exactly where every road will take us, but I know that some people make life feel a little more beautiful just by being part of it.

The little conversations, the random moments, the laughs, and even the silly things become memories that are worth keeping.

And if I had to choose someone to make more memories with...

I'd choose you.

Not just for one moment.
Not just for one day.

But for all the little moments that come after.

With love,
Inshaal ❤️`;

function typeLetter() {
  const element =
    document.getElementById("letterText");

  element.textContent = "";

  let index = 0;

  const timer = setInterval(() => {
    element.textContent += loveLetter[index];

    index++;

    if (index >= loveLetter.length) {
      clearInterval(timer);
    }
  }, 18);
}

function showMemories() {
  showScreen("memoriesScreen");
}


/* =========================
   MEMORIES
========================= */

function loadMemories() {
  const grid =
    document.getElementById("memoryGrid");

  if (!grid || !Array.isArray(memories)) {
    return;
  }

  grid.innerHTML = "";

  memories.forEach((photo, index) => {
    const card = document.createElement("div");

    card.className = "memory-card";

    card.innerHTML = `
      <img
        src="${photo}"
        alt="Memory ${index + 1}"
        loading="lazy"
      >

      <div class="memory-number">
        Memory ${index + 1}
      </div>
    `;

    card.onclick = function () {
      openViewer(index);
    };

    grid.appendChild(card);
  });
}


/* =========================
   FULLSCREEN PHOTO VIEWER
========================= */

function openViewer(index) {
  currentPhoto = index;

  document
    .getElementById("viewer")
    .classList.add("active");

  updateViewer();
}

function closeViewer() {
  document
    .getElementById("viewer")
    .classList.remove("active");
}

function updateViewer() {
  const image =
    document.getElementById("viewerImage");

  image.src = memories[currentPhoto];

  document.getElementById("viewerCounter").textContent =
    `${currentPhoto + 1} / ${memories.length}`;
}

function nextPhoto() {
  currentPhoto++;

  if (currentPhoto >= memories.length) {
    currentPhoto = 0;
  }

  updateViewer();
}

function previousPhoto() {
  currentPhoto--;

  if (currentPhoto < 0) {
    currentPhoto = memories.length - 1;
  }

  updateViewer();
}

document.addEventListener("keydown", function (event) {
  const viewer =
    document.getElementById("viewer");

  if (!viewer.classList.contains("active")) {
    return;
  }

  if (event.key === "ArrowRight") {
    nextPhoto();
  }

  if (event.key === "ArrowLeft") {
    previousPhoto();
  }

  if (event.key === "Escape") {
    closeViewer();
  }
});


/* =========================
   DATING QUESTIONS
========================= */

const datingQuestions = [
  {
    question: "Would you go on a late-night walk with me? 🌙",
    options: [
      "Absolutely ❤️",
      "Only if there's food 😂",
      "Maybe 😏"
    ]
  },
  {
    question: "Would you choose a cozy movie night together? 🍿",
    options: [
      "Yes ❤️",
      "Obviously 🫶",
      "Only if I choose the movie 😂"
    ]
  },
  {
    question: "Would you make a memory with me that we'd never forget? 🌹",
    options: [
      "Always ❤️",
      "Of course 🥹",
      "Already planning it 💕"
    ]
  }
];

function showDating() {
  showScreen("datingScreen");
  loadDatingQuestion();
}

function loadDatingQuestion() {
  const q =
    datingQuestions[currentDatingQuestion];

  document.getElementById("datingQuestion").textContent =
    q.question;

  const options =
    document.getElementById("datingOptions");

  options.innerHTML = "";

  q.options.forEach(option => {
    const button = document.createElement("button");

    button.textContent = option;

    button.onclick = function () {
      answerDating();
    };

    options.appendChild(button);
  });
}

function answerDating() {
  currentDatingQuestion++;

  if (currentDatingQuestion >= datingQuestions.length) {
    document.getElementById("datingMessage").textContent =
      "Okay... I think we're ready for the final question. ❤️";

    setTimeout(() => {
      showScreen("finalScreen");
      createHearts();
    }, 1200);

    return;
  }

  loadDatingQuestion();
}


/* =========================
   HEARTS
========================= */

function createHearts() {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");

    heart.textContent = "❤️";

    heart.style.position = "fixed";
    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.top = "100vh";
    heart.style.zIndex = "9999";
    heart.style.pointerEvents = "none";

    heart.style.fontSize =
      Math.random() * 20 + 15 + "px";

    heart.style.transition =
      "transform 2.5s ease, opacity 2.5s ease";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform =
        `translateY(-${window.innerHeight + 150}px)`;

      heart.style.opacity = "0";
    }, 50);

    setTimeout(() => {
      heart.remove();
    }, 2600);
  }
}
