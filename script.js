/* =========================================================
   INSHAAL × AHMIE
   COMPLETE WEBSITE SCRIPT
   Premium Interactive Love Experience
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentQuestion = 0;
let currentDatingQuestion = 0;
let currentPhoto = 0;

const PASSWORD = "2628";


/* =========================================================
   BASIC HELPERS
========================================================= */

function $(id) {
  return document.getElementById(id);
}


function showScreen(id) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const screen = $(id);

  if (!screen) return;

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  createParticles();
}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

  const container = $("particles");

  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 45; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.top =
      Math.random() * 100 + "%";

    particle.style.animationDelay =
      Math.random() * 6 + "s";

    particle.style.animationDuration =
      5 + Math.random() * 8 + "s";

    particle.style.opacity =
      0.15 + Math.random() * 0.65;

    container.appendChild(particle);
  }
}


/* =========================================================
   FLOATING GOLD PARTICLES / HEARTS
========================================================= */

function createFloatingHearts(amount = 20) {

  const container = $("floatingHearts");

  if (!container) return;

  for (let i = 0; i < amount; i++) {

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.textContent =
      Math.random() > 0.5 ? "♡" : "✦";

    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.top =
      85 + Math.random() * 15 + "vh";

    heart.style.fontSize =
      10 + Math.random() * 22 + "px";

    heart.style.animationDuration =
      4 + Math.random() * 5 + "s";

    heart.style.animationDelay =
      Math.random() * 2 + "s";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }
}


/* =========================================================
   01 — PREMIUM PASSWORD
========================================================= */

function setupPassword() {

  const input = $("passwordInput");
  const button = $("unlockButton");
  const message = $("codeMessage");

  if (!input || !button) return;


  function resetMessage() {

    setTimeout(() => {

      if (message) {

        message.textContent =
          "Four digits. That's all. ♡";

        message.classList.remove("success");
      }

    }, 1800);
  }


  function unlock() {

    const value =
      input.value.trim();


    /* EMPTY */

    if (!value) {

      message.textContent =
        "Enter the secret code first. ♡";

      input.classList.add("password-error");

      setTimeout(() => {
        input.classList.remove("password-error");
      }, 600);

      return;
    }


    /* WRONG */

    if (value !== PASSWORD) {

      message.textContent =
        "Not quite... try again. ✦";

      message.classList.remove("success");

      input.classList.remove("password-error");

      void input.offsetWidth;

      input.classList.add("password-error");

      input.value = "";

      resetMessage();

      return;
    }


    /* CORRECT */

    message.textContent =
      "Welcome, Ahmie. ♡";

    message.classList.add("success");

    input.classList.add("password-success");

    button.disabled = true;

    createFloatingHearts(35);

    createGoldBurst();


    setTimeout(() => {

      showScreen("questionsScreen");

      currentQuestion = 0;

      loadQuestion();

      input.value = "";

      input.classList.remove("password-success");

      button.disabled = false;

    }, 1600);
  }


  /* BUTTON */

  button.addEventListener(
    "click",
    unlock
  );


  /* ENTER KEY */

  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        event.preventDefault();

        unlock();
      }

    }
  );


  /* ONLY NUMBERS */

  input.addEventListener(
    "input",
    () => {

      input.value =
        input.value.replace(/\D/g, "");

      input.value =
        input.value.slice(0, 4);

    }
  );
}


/* =========================================================
   GOLD BURST
========================================================= */

function createGoldBurst() {

  const container =
    $("floatingHearts");

  if (!container) return;

  for (let i = 0; i < 45; i++) {

    const spark =
      document.createElement("span");

    spark.className =
      "gold-spark";

    spark.textContent =
      Math.random() > 0.5
        ? "✦"
        : "•";

    spark.style.left =
      "50vw";

    spark.style.top =
      "50vh";

    spark.style.setProperty(
      "--x",
      `${Math.random() * 500 - 250}px`
    );

    spark.style.setProperty(
      "--y",
      `${Math.random() * 500 - 250}px`
    );

    container.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 1800);
  }
}


/* =========================================================
   02 — NINE QUESTIONS
========================================================= */

const questions = [

  {
    title: "Question One",
    text: "If you could keep one thing forever, what would it be?",
    options: [
      "A beautiful memory",
      "A special person",
      "A feeling that never fades"
    ]
  },

  {
    title: "Question Two",
    text: "What makes a connection truly special?",
    options: [
      "Trust",
      "Understanding",
      "Choosing each other"
    ]
  },

  {
    title: "Question Three",
    text: "What's better?",
    options: [
      "A long conversation at night",
      "Laughing over something stupid",
      "Just being together"
    ]
  },

  {
    title: "Question Four",
    text: "If we could disappear somewhere for one day...",
    options: [
      "A peaceful beach",
      "A beautiful city",
      "Somewhere nobody knows us"
    ]
  },

  {
    title: "Question Five",
    text: "What's your kind of perfect date?",
    options: [
      "A quiet walk",
      "Dinner together",
      "A random adventure"
    ]
  },

  {
    title: "Question Six",
    text: "Would you keep the silly memories too?",
    options: [
      "Of course",
      "Especially those",
      "Every single one"
    ]
  },

  {
    title: "Question Seven",
    text: "What's more important?",
    options: [
      "Words",
      "Actions",
      "Both"
    ]
  },

  {
    title: "Question Eight",
    text: "If someone genuinely chooses you...",
    options: [
      "I'd appreciate it",
      "I'd choose them too",
      "I'd never forget it"
    ]
  },

  {
    title: "Question Nine",
    text: "And if this little story continued...",
    options: [
      "I'd keep reading",
      "Maybe...",
      "Let's see where it goes ♡"
    ]
  }

];


function loadQuestion() {

  const data =
    questions[currentQuestion];

  const title =
    $("questionTitle");

  const subtitle =
    $("questionSubtitle");

  const counter =
    $("questionCounter");

  const progress =
    $("questionProgress");

  const stage =
    $("questionStage");

  const next =
    $("questionNext");


  if (!data) return;


  title.textContent =
    data.title;

  subtitle.textContent =
    data.text;

  counter.textContent =
    `${currentQuestion + 1} / ${questions.length}`;

  progress.style.width =
    `${((currentQuestion + 1) /
       questions.length) * 100}%`;

  stage.innerHTML = "";

  next.classList.add("hidden");


  data.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");

      button.className =
        "question-option";

      button.textContent =
        option;

      button.style.animationDelay =
        `${index * 100}ms`;


      button.addEventListener(
        "click",
        () => {

          stage
            .querySelectorAll(
              ".question-option"
            )
            .forEach(item => {
              item.classList.remove(
                "selected"
              );
            });


          button.classList.add(
            "selected"
          );


          next.classList.remove(
            "hidden"
          );


          createFloatingHearts(5);
        }
      );


      stage.appendChild(button);
    }
  );
}


if ($("questionNext")) {

  $("questionNext").addEventListener(
    "click",
    () => {

      currentQuestion++;


      if (
        currentQuestion >=
        questions.length
      ) {

        showScreen("choiceScreen");

        setupChoice();

        return;
      }


      loadQuestion();
    }
  );
}


/* =========================================================
   03 — INSHAAL / AHMIE CHOICE
========================================================= */

function setupChoice() {

  const ahmie =
    $("ahmieButton");

  const nine =
    $("nineButton");

  const message =
    $("choiceMessage");


  if (!ahmie || !nine) return;


  let phase = 0;


  ahmie.onclick = () => {

    message.textContent =
      "You chose wisely. ♡";

    ahmie.classList.add(
      "choice-success"
    );

    createFloatingHearts(35);


    setTimeout(() => {

      showScreen("letterScreen");

      startLoveLetter();

    }, 1300);
  };


  nine.onclick = () => {

    if (phase === 0) {

      phase = 1;

      message.textContent =
        "Are you really sure? 👀";

      nine.textContent =
        "Are you sure?";

      return;
    }


    if (phase === 1) {

      phase = 2;

      message.textContent =
        "Think again...";

      nine.textContent =
        "ARE YOU REALLY SURE?";

      nine.classList.add(
        "choice-pulse"
      );

      return;
    }


    if (phase === 2) {

      phase = 3;

      message.textContent =
        "Okay okay... one last chance. 😂";

      nine.textContent =
        "ONE LAST TIME";

      return;
    }


    if (phase === 3) {

      message.textContent =
        "Fine... choose Ahmie. ❤️";

      nine.textContent =
        "CHOOSE AHMIE";

      nine.classList.remove(
        "choice-pulse"
      );

      phase = 4;

      return;
    }


    if (phase === 4) {

      ahmie.click();

    }

  };
}


/* =========================================================
   04 — LOVE LETTER
========================================================= */

const loveLetter = `Tum jisey bhi choose karo,
mere liye tum tum hi ho.

Mere liye tum sirf koi ek person nahi ho.
Tum meri woh dost ho jiske saath
main hamesha ek connection feel karta rahunga.

Best Friend Forever. ♡

Aur haan...
is letter ko ignore mat karna.
Aur blush bhi mat karna. :)

Kuch bhi ho jaye,
main tumhe simply chhor kar nahi ja sakta.

Pehle jo hua...
woh meri galtiyon ka bhi hissa tha.

Ek waqt tha jab maine socha tha
ke shayad tum wapas aa jaogi.
Maine wait kiya...
aur jab tum nahi aayi,
toh bohat si baatein dil mein reh gayin.

Lekin ab main sirf words nahi bolna chahta.

Ab main apne efforts se dikhana chahta hoon
ke tum mere liye kitni important ho.

Ab main tumhare saath rahunga.
Tumhare efforts ko appreciate karunga.
Aur apni taraf se bhi effort dikhata rahunga.

Main chahta hoon ke jo bhi ho,
hum ek doosre ke liye genuinely present rahein.

Tumhari choice hamesha tumhari hai.
Main uski respect karunga.

Lekin mere liye ek baat hamesha same rahegi...

Tum tum hi ho.

Aur agar zindagi ne humein
phir se ek beautiful chapter diya,
toh is baar main us chapter ko
sirf dekhna nahi chahta...

main usay properly live karna chahta hoon.

— Inshaal ♡`;


function startLoveLetter() {

  const element =
    $("loveLetterText");

  const next =
    $("letterNext");

  if (!element) return;


  element.textContent = "";

  if (next) {
    next.classList.add("hidden");
  }


  let index = 0;


  const typing =
    setInterval(() => {

      element.textContent +=
        loveLetter[index];

      index++;


      if (
        index >=
        loveLetter.length
      ) {

        clearInterval(typing);


        setTimeout(() => {

          if (next) {
            next.classList.remove(
              "hidden"
            );
          }

          createFloatingHearts(15);

        }, 900);
      }

    }, 16);
}


if ($("letterNext")) {

  $("letterNext").addEventListener(
    "click",
    () => {

      showScreen("datingScreen");

      currentDatingQuestion = 0;

      loadDatingQuestion();

    }
  );
}


/* =========================================================
   05 — DATING QUESTIONS
========================================================= */

const datingQuestions = [

  {
    question:
      "Where should our first little adventure be?",

    options: [
      "A quiet café ☕",
      "A long evening walk 🌙",
      "Somewhere completely random ✨"
    ]
  },

  {
    question:
      "What are we doing first?",

    options: [
      "Getting food 🍕",
      "Taking pictures 📸",
      "Talking for hours"
    ]
  },

  {
    question:
      "What's the perfect evening?",

    options: [
      "City lights 🌃",
      "Stars and silence ✨",
      "Laughing until midnight"
    ]
  },

  {
    question:
      "What should we never forget?",

    options: [
      "The little moments",
      "The stupid jokes 😂",
      "How we started"
    ]
  },

  {
    question:
      "And if the date goes perfectly...",


    options: [
      "One more hour ❤️",
      "One more day",
      "Let's plan the next one"
    ]
  }

];


function loadDatingQuestion() {

  const data =
    datingQuestions[
      currentDatingQuestion
    ];


  const stage =
    $("datingStage");

  const counter =
    $("datingCounter");

  const progress =
    $("datingProgress");

  const next =
    $("datingNext");


  if (!data) return;


  stage.innerHTML = "";

  next.classList.add(
    "hidden"
  );


  counter.textContent =
    `${currentDatingQuestion + 1} / ${datingQuestions.length}`;


  progress.style.width =
    `${((currentDatingQuestion + 1) /
       datingQuestions.length) * 100}%`;


  const heading =
    document.createElement("h3");

  heading.textContent =
    data.question;

  heading.className =
    "dating-question-title";


  stage.appendChild(
    heading
  );


  data.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");

      button.className =
        "dating-option";

      button.textContent =
        option;

      button.style.animationDelay =
        `${index * 100}ms`;


      button.addEventListener(
        "click",
        () => {

          stage
            .querySelectorAll(
              ".dating-option"
            )
            .forEach(item => {

              item.classList.remove(
                "selected"
              );

            });


          button.classList.add(
            "selected"
          );


          next.classList.remove(
            "hidden"
          );


          createFloatingHearts(6);
        }
      );


      stage.appendChild(
        button
      );
    }
  );
}


if ($("datingNext")) {

  $("datingNext").addEventListener(
    "click",
    () => {

      currentDatingQuestion++;


      if (
        currentDatingQuestion >=
        datingQuestions.length
      ) {

        showScreen(
          "memoriesScreen"
        );

        loadMemories();

        return;
      }


      loadDatingQuestion();
    }
  );
}


/* =========================================================
   06 — OUR MEMORIES
========================================================= */

function loadMemories() {

  const grid =
    $("memoryGrid");

  if (!grid) return;


  grid.innerHTML = "";


  if (
    typeof memories ===
      "undefined" ||
    !Array.isArray(memories) ||
    memories.length === 0
  ) {

    grid.innerHTML = `
      <div class="memory-empty">
        <span>♡</span>
        <p>Our memories are waiting...</p>
      </div>
    `;

    return;
  }


  memories.forEach(
    (photo, index) => {

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "memory-card";


      card.innerHTML = `

        <img
          src="${photo}"
          alt="Memory ${index + 1}"
          loading="lazy"
        >

        <span class="memory-overlay"></span>

        <span class="memory-number">
          MEMORY
          ${String(index + 1)
            .padStart(2, "0")}
        </span>

      `;


      card.addEventListener(
        "click",
        () => {

          openViewer(index);

        }
      );


      grid.appendChild(card);
    }
  );
}


/* =========================================================
   FULLSCREEN MEMORY VIEWER
========================================================= */

function openViewer(index) {

  if (
    typeof memories ===
      "undefined" ||
    !memories[index]
  ) {
    return;
  }


  currentPhoto =
    index;


  const viewer =
    $("memoryViewer");


  viewer.classList.add(
    "active"
  );


  document.body.style.overflow =
    "hidden";


  updateViewer();
}


function closeViewer() {

  const viewer =
    $("memoryViewer");

  if (!viewer) return;


  viewer.classList.remove(
    "active"
  );


  document.body.style.overflow =
    "";
}


function updateViewer() {

  if (
    typeof memories ===
      "undefined" ||
    !memories[currentPhoto]
  ) {
    return;
  }


  const image =
    $("viewerImage");

  const counter =
    $("viewerCounter");


  image.style.opacity =
    "0";


  image.src =
    memories[currentPhoto];


  image.onload = () => {

    image.style.transition =
      "opacity .45s ease";

    image.style.opacity =
      "1";

  };


  counter.textContent =
    `${String(currentPhoto + 1)
      .padStart(2, "0")} / ${
      String(memories.length)
        .padStart(2, "0")
    }`;
}


function nextPhoto() {

  if (
    typeof memories ===
      "undefined" ||
    memories.length === 0
  ) {
    return;
  }


  currentPhoto++;

  if (
    currentPhoto >=
    memories.length
  ) {
    currentPhoto = 0;
  }


  updateViewer();
}


function previousPhoto() {

  if (
    typeof memories ===
      "undefined" ||
    memories.length === 0
  ) {
    return;
  }


  currentPhoto--;

  if (
    currentPhoto < 0
  ) {
    currentPhoto =
      memories.length - 1;
  }


  updateViewer();
}


if ($("viewerClose")) {

  $("viewerClose").addEventListener(
    "click",
    closeViewer
  );
}


if ($("viewerNext")) {

  $("viewerNext").addEventListener(
    "click",
    nextPhoto
  );
}


if ($("viewerPrevious")) {

  $("viewerPrevious")
    .addEventListener(
      "click",
      previousPhoto
    );
}


if ($("memoryViewer")) {

  $("memoryViewer")
    .addEventListener(
      "click",
      event => {

        if (
          event.target ===
          $("memoryViewer")
        ) {

          closeViewer();

        }

      }
    );
}


/* =========================================================
   PHOTO SWIPE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;


if ($("memoryViewer")) {

  $("memoryViewer")
    .addEventListener(
      "touchstart",
      event => {

        touchStartX =
          event.changedTouches[0]
            .screenX;

      },
      {
        passive: true
      }
    );


  $("memoryViewer")
    .addEventListener(
      "touchend",
      event => {

        touchEndX =
          event.change
