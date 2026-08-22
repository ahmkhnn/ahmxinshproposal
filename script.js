/* =====================================================
   INSHAAL × AHMIE
   MAIN WEBSITE SCRIPT
===================================================== */


/* =====================================================
   GLOBAL
===================================================== */

let currentQuestion = 0;
let currentDatingQuestion = 0;
let currentPhoto = 0;

let selectedCode = [];

const correctCode = ["2", "6", "2", "8"];


/* =====================================================
   SCREEN NAVIGATION
===================================================== */

function showScreen(id) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  createParticles();
}


/* =====================================================
   PARTICLES
===================================================== */

function createParticles() {

  const container = document.getElementById("particles");

  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 35; i++) {

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.animationDuration =
      (5 + Math.random() * 8) + "s";

    particle.style.animationDelay =
      Math.random() * 5 + "s";

    particle.style.opacity =
      Math.random();

    container.appendChild(particle);
  }
}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createFloatingHearts(amount = 18) {

  const container =
    document.getElementById("floatingHearts");

  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < amount; i++) {

    const heart = document.createElement("span");

    heart.textContent =
      Math.random() > .5 ? "♡" : "✦";

    heart.style.position = "fixed";

    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.top =
      (70 + Math.random() * 30) + "vh";

    heart.style.color =
      "#d4af37";

    heart.style.fontSize =
      (10 + Math.random() * 18) + "px";

    heart.style.opacity =
      .2 + Math.random() * .6;

    heart.style.pointerEvents =
      "none";

    heart.style.zIndex = "50";

    heart.style.transition =
      "transform 5s ease, opacity 5s ease";

    container.appendChild(heart);

    setTimeout(() => {

      heart.style.transform =
        `translateY(-${window.innerHeight + 200}px)
         translateX(${Math.random() * 100 - 50}px)
         rotate(${Math.random() * 90 - 45}deg)`;

      heart.style.opacity = "0";

    }, 100 + i * 80);
  }

  setTimeout(() => {
    container.innerHTML = "";
  }, 6500);
}


/* =====================================================
   01 — PASSWORD
===================================================== */

function setupPassword() {

  const orbs =
    document.querySelectorAll(".code-orb");

  const selected =
    document.querySelectorAll(".selected-code span");

  const message =
    document.getElementById("codeMessage");

  const unlock =
    document.getElementById("unlockButton");


  orbs.forEach(orb => {

    orb.addEventListener("click", () => {

      if (selectedCode.length >= 4) {
        return;
      }

      const number =
        orb.dataset.number;


      /*
        Wrong number
      */

      if (
        number !== correctCode[selectedCode.length]
      ) {

        orb.classList.remove("wrong");

        void orb.offsetWidth;

        orb.classList.add("wrong");

        message.textContent =
          "Not that one... try again. ♡";

        message.style.color =
          "#9d5757";

        setTimeout(() => {
          message.textContent =
            "Choose the numbers in order.";

          message.style.color =
            "";
        }, 1000);

        return;
      }


      /*
        Correct number
      */

      selectedCode.push(number);

      orb.classList.add("selected");


      selected[selectedCode.length - 1]
        .textContent = number;


      message.textContent =
        "Yes... keep going. ✦";


      /*
        Complete code
      */

      if (selectedCode.length === 4) {

        message.textContent =
          "You remembered. ❤️";

        message.classList.add("success");

        unlock.classList.remove("hidden");

        createFloatingHearts(25);

        orbs.forEach(item => {
          item.style.pointerEvents = "none";
        });
      }
    });
  });


  unlock.addEventListener("click", () => {

    unlock.style.transform =
      "scale(.95)";

    setTimeout(() => {

      showScreen("questionsScreen");

      loadQuestion();

    }, 250);
  });
}


/* =====================================================
   02 — NINE QUESTIONS
===================================================== */

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
    text: "If we could disappear somewhere for a day...",
    options: [
      "Beach 🌊",
      "Beautiful city 🌃",
      "Somewhere nobody knows us"
    ]
  },

  {
    title: "Question Five",
    text: "What's the best kind of date?",
    options: [
      "A peaceful walk 🌙",
      "Dinner together 🍽️",
      "A completely random adventure"
    ]
  },

  {
    title: "Question Six",
    text: "Would you keep the silly memories too?",
    options: [
      "Of course 😂",
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
      "Let's see where it goes ❤️"
    ]
  }

];


function loadQuestion() {

  const question =
    questions[currentQuestion];

  const stage =
    document.getElementById("questionStage");

  const title =
    document.getElementById("questionTitle");

  const subtitle =
    document.getElementById("questionSubtitle");

  const counter =
    document.getElementById("questionCounter");

  const progress =
    document.getElementById("questionProgress");

  const next =
    document.getElementById("questionNext");


  title.textContent =
    question.title;

  subtitle.textContent =
    question.text;

  counter.textContent =
    `${currentQuestion + 1} / ${questions.length}`;

  progress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;


  stage.innerHTML = "";

  next.classList.add("hidden");


  question.options.forEach(option => {

    const button =
      document.createElement("button");

    button.className =
      "question-option";

    button.textContent =
      option;


    button.addEventListener("click", () => {

      stage
        .querySelectorAll(".question-option")
        .forEach(item => {
          item.classList.remove("correct");
        });

      button.classList.add("correct");

      next.classList.remove("hidden");

      createFloatingHearts(5);
    });


    stage.appendChild(button);
  });
}


document
  .getElementById("questionNext")
  .addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

      showScreen("choiceScreen");

      setupChoice();

      return;
    }

    loadQuestion();
  });


/* =====================================================
   03 — PLAYFUL 9 CHOICE
===================================================== */

function setupChoice() {

  const ahmie =
    document.getElementById("ahmieButton");

  const nine =
    document.getElementById("nineButton");

  const message =
    document.getElementById("choiceMessage");


  let phase = 0;


  /*
    First click: 9
  */

  nine.onclick = () => {

    if (phase === 0) {

      phase = 1;

      message.textContent =
        "Are you sure? 👀";

      nine.textContent =
        "Are you sure?";

      nine.classList.remove("dark-button");

      nine.classList.add("gold-button");

      ahmie.style.opacity = "0.65";

      return;
    }


    /*
      Second click
    */

    if (phase === 1) {

      phase = 2;

      message.textContent =
        "Okay... then press this. 😭";

      nine.textContent =
        "ARE YOU REALLY SURE?";

      nine.style.transform =
        "scale(1.08)";

      return;
    }


    /*
      Third click
    */

    if (phase === 2) {

      phase = 3;

      message.textContent =
        "Fine. You win. 😂❤️";

      nine.textContent =
        "CHOOSE AHMIE";

      nine.style.transform =
        "scale(1)";

      return;
    }


    /*
      Final click
    */

    if (phase === 3) {

      message.textContent =
        "Exactly what I thought. ❤️";

      createFloatingHearts(35);

      setTimeout(() => {

        showScreen("letterScreen");

        startLoveLetter();

      }, 1400);
    }

  };


  ahmie.onclick = () => {

    message.textContent =
      "You didn't even hesitate... ❤️";

    createFloatingHearts(35);

    setTimeout(() => {

      showScreen("letterScreen");

      startLoveLetter();

    }, 1200);
  };
}


/* =====================================================
   04 — LOVE LETTER
===================================================== */

const loveLetter = `Tum jisey bhi choose karo,
mere liye tum tum hi ho.

Mere liye tum sirf koi ek person nahi ho.
Tum meri woh dost ho jiske saath
main hamesha ek connection feel karta rahunga.

Best friend forever.

Aur haan...
is letter ko ignore mat karna,
aur blush bhi mat karna. ♡

Kuch bhi ho jaye,
main tumhari life se bas yun hi gayab
hone wala nahi hoon.

Pehle jo hua...
usmein meri bhi galtiyan thi.

Ek waqt tha jab maine socha tha
ke shayad tum wapas aa jaogi,
aur jab tum nahi aayi,
toh bahut si baatein andar reh gayi.

Lekin ab main sirf words nahi bolna chahta.

Ab main apne efforts se dikhana chahta hoon
ke tum mere liye kitni important ho.

Main tumhare saath rahunga,
tumhare liye better banne ki koshish karunga,
aur jo keh raha hoon,
woh actions se prove karunga.

Tumhe apni choice hamesha khud karni hai.
Main tumhari choice ki respect karunga.

Bas itna zaroor hai...

Agar tum kabhi peeche mud kar dekho,
toh main chahta hoon ke tumhe
ek aisa dost mile jo genuinely tumhare liye tha.

Aur agar story ka agla chapter
hum dono ke naam hua...

toh shayad woh sabse khoobsurat chapter hoga.

— Inshaal ♡`;


function startLoveLetter() {

  const element =
    document.getElementById("loveLetterText");

  const next =
    document.getElementById("letterNext");

  element.textContent = "";

  next.classList.add("hidden");

  let index = 0;


  const typing =
    setInterval(() => {

      element.textContent +=
        loveLetter[index];

      index++;


      if (index >= loveLetter.length) {

        clearInterval(typing);

        setTimeout(() => {

          next.classList.remove("hidden");

          createFloatingHearts(12);

        }, 800);
      }

    }, 18);
}


document
  .getElementById("letterNext")
  .addEventListener("click", () => {

    showScreen("datingScreen");

    loadDatingQuestion();

  });


/* =====================================================
   05 — DATING QUESTIONS
===================================================== */

const datingQuestions = [

  {
    question: "Where should our first little adventure be?",
    options: [
      "A quiet café ☕",
      "A long evening walk 🌙",
      "Somewhere completely random ✨"
    ]
  },

  {
    question: "What are we doing first?",
    options: [
      "Getting food 🍕",
      "Taking pictures 📸",
      "Talking for hours"
    ]
  },

  {
    question: "What's the perfect evening?",
    options: [
      "City lights 🌃",
      "Stars and silence ✨",
      "Laughing until midnight"
    ]
  },

  {
    question: "What should we never forget?",
    options: [
      "The little moments",
      "The stupid jokes 😂",
      "How we started"
    ]
  },

  {
    question: "And if the date goes perfectly...",
    options: [
      "One more hour ❤️",
      "One more day",
      "Let's plan the next one"
    ]
  }

];


function loadDatingQuestion() {

  const question =
    datingQuestions[currentDatingQuestion];

  const stage =
    document.getElementById("datingStage");

  const counter =
    document.getElementById("datingCounter");

  const progress =
    document.getElementById("datingProgress");

  const next =
    document.getElementById("datingNext");


  stage.innerHTML = "";

  next.classList.add("hidden");


  counter.textContent =
    `${currentDatingQuestion + 1} / ${datingQuestions.length}`;


  progress.style.width =
    `${((currentDatingQuestion + 1) /
       datingQuestions.length) * 100}%`;


  const heading =
    document.createElement("h3");

  heading.textContent =
    question.question;

  heading.style.marginBottom =
    "25px";

  heading.style.fontSize =
    "26px";

  stage.appendChild(heading);


  question.options.forEach(option => {

    const button =
      document.createElement("button");

    button.className =
      "dating-option";

    button.textContent =
      option;


    button.addEventListener("click", () => {

      stage
        .querySelectorAll(".dating-option")
        .forEach(item => {
          item.classList.remove("selected");
        });

      button.classList.add("selected");

      next.classList.remove("hidden");

      createFloatingHearts(5);
    });


    stage.appendChild(button);
  });
}


document
  .getElementById("datingNext")
  .addEventListener("click", () => {

    currentDatingQuestion++;


    if (
      currentDatingQuestion >=
      datingQuestions.length
    ) {

      showScreen("memoriesScreen");

      loadMemories();

      return;
    }


    loadDatingQuestion();
  });


/* =====================================================
   06 — MEMORIES
===================================================== */

function loadMemories() {

  const grid =
    document.getElementById("memoryGrid");

  if (!grid) return;

  grid.innerHTML = "";


  if (
    typeof memories === "undefined" ||
    !Array.isArray(memories)
  ) {

    grid.innerHTML = `
      <p style="
        grid-column:1/-1;
        color:#d4af37;
      ">
        Memories are waiting to be added...
      </p>
    `;

    return;
  }


  memories.forEach((photo, index) => {

    const card =
      document.createElement("div");

    card.className =
      "memory-card";


    card.innerHTML = `
      <img
        src="${photo}"
        alt="Memory ${index + 1}"
        loading="lazy"
      >

      <span class="memory-number">
        MEMORY ${String(index + 1).padStart(2, "0")}
      </span>
    `;


    card.addEventListener("click", () => {

      openViewer(index);

    });


    grid.appendChild(card);
  });
}


/* =====================================================
   FULLSCREEN VIEWER
===================================================== */

function openViewer(index) {

  if (
    typeof memories === "undefined" ||
    !memories[index]
  ) {
    return;
  }

  currentPhoto = index;

  const viewer =
    document.getElementById("memoryViewer");

  viewer.classList.add("active");

  updateViewer();

  document.body.style.overflow =
    "hidden";
}


function closeViewer() {

  document
    .getElementById("memoryViewer")
    .classList.remove("active");

  document.body.style.overflow =
    "";
}


function updateViewer() {

  const image =
    document.getElementById("viewerImage");

  const counter =
    document.getElementById("viewerCounter");


  image.style.opacity = "0";


  setTimeout(() => {

    image.src =
      memories[currentPhoto];

    image.onload = () => {

      image.style.transition =
        "opacity .4s ease";

      image.style.opacity =
        "1";
    };

  }, 100);


  counter.textContent =
    `${String(currentPhoto + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
}


function nextPhoto() {

  currentPhoto++;

  if (
    currentPhoto >= memories.length
  ) {
    currentPhoto = 0;
  }

  updateViewer();
}


function previousPhoto() {

  currentPhoto--;

  if (currentPhoto < 0) {
    currentPhoto =
      memories.length - 1;
  }

  updateViewer();
}


document
  .getElementById("viewerClose")
  .addEventListener(
    "click",
    closeViewer
  );


document
  .getElementById("viewerNext")
  .addEventListener(
    "click",
    nextPhoto
  );


document
  .getElementById("viewerPrevious")
  .addEventListener(
    "click",
    previousPhoto
  );


document
  .getElementById("memoryViewer")
  .addEventListener("click", event => {

    if (
      event.target.id ===
      "memoryViewer"
    ) {
      closeViewer();
    }

  });


/* Keyboard only for PHOTO VIEWER.
   Password does NOT use keyboard. */

document.addEventListener(
  "keydown",
  event => {

    const viewer =
      document.getElementById(
        "memoryViewer"
      );

    if (
      !viewer.classList.contains("active")
    ) {
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
  }
);


/* =====================================================
   SWIPE SUPPORT FOR PHOTOS
===================================================== */

let touchStartX = 0;
let touchEndX = 0;


const viewer =
  document.getElementById("memoryViewer");


viewer.addEventListener(
  "touchstart",
  event => {

    touchStartX =
      event.changedTouches[0].screenX;

  },
  { passive: true }
);


viewer.addEventListener(
  "touchend",
  event => {

    touchEndX =
      event.changedTouches[0].screenX;

    const difference =
      touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {
      return;
    }


    if (difference > 0) {
      nextPhoto();
    } else {
      previousPhoto();
    }

  },
  { passive: true }
);


/* =====================================================
   07 — CINEMATIC ANIMATION
===================================================== */

function startCinematicAnimation() {

  showScreen("animationScreen");

  createFloatingHearts(40);


  setTimeout(() => {

    showScreen("finalScreen");

    createFloatingHearts(50);

  }, 6500);
}


/* =====================================================
   MEMORIES → CINEMATIC
===================================================== */

document
  .getElementById("memoriesNext")
  .addEventListener("click", () => {

    startCinematicAnimation();

  });


/* =====================================================
   INSTAGRAM
===================================================== */

const instagramLink =
  document.getElementById("instagramLink");


/*
  IMPORTANT:
  Instagram usernames cannot contain "-".
  Replace the username below with the exact
  real Instagram username once confirmed.
*/

const instagramUsername =
  "AHME-SOLITUDE";


instagramLink.textContent =
  "@" + instagramUsername;

instagramLink.href =
  "https://www.instagram.com/" +
  instagramUsername;


/* ==============
