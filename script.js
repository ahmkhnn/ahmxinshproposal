/* =========================================================
   AHMIE SITE — COMPLETE SCRIPT
   Flow:
   Password
   → 9 Questions
   → Ahmie Choice
   → Love Letter
   → Dating Questions
   → Our Memories
   → Fullscreen Viewer
   → Cinematic Animation
   → Final
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const PASSWORD = "2628";

const INSTAGRAM_USERNAME = "AHME-SOLITUDE";

const INSTAGRAM_URL =
  "https://www.instagram.com/AHME-SOLITUDE/";


/* =========================================================
   SCREEN SYSTEM
========================================================= */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (!target) return;

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  createGoldBurst();
}


/* =========================================================
   ELEMENTS
========================================================= */

const passwordScreen =
  document.getElementById("passwordScreen");

const passwordInput =
  document.getElementById("passwordInput");

const unlockButton =
  document.getElementById("unlockButton");

const codeMessage =
  document.getElementById("codeMessage");

const passwordContainer =
  document.querySelector(".password-container");


/* =========================================================
   PASSWORD
========================================================= */

let passwordUnlocked = false;

passwordInput.addEventListener("input", () => {

  passwordInput.value =
    passwordInput.value.replace(/\D/g, "");

  if (passwordInput.value.length === 4) {
    codeMessage.textContent =
      "Ready? ♡";
  } else {
    codeMessage.textContent =
      "Four digits. That's all. ♡";
  }
});


function unlockSite() {

  const entered =
    passwordInput.value.trim();

  if (entered !== PASSWORD) {

    passwordContainer.classList.remove(
      "password-error"
    );

    void passwordContainer.offsetWidth;

    passwordContainer.classList.add(
      "password-error"
    );

    codeMessage.textContent =
      "Not quite... try again. ♡";

    codeMessage.classList.remove(
      "success"
    );

    passwordInput.value = "";

    passwordInput.focus();

    return;
  }


  passwordUnlocked = true;

  codeMessage.textContent =
    "Unlocked. Welcome in. ♡";

  codeMessage.classList.add(
    "success"
  );

  passwordContainer.classList.add(
    "password-success"
  );

  unlockButton.disabled = true;

  createHeartBurst();


  setTimeout(() => {

    unlockButton.disabled = false;

    showScreen("questionsScreen");

    startQuestionSystem();

  }, 1100);
}


unlockButton.addEventListener(
  "click",
  unlockSite
);


passwordInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      event.preventDefault();

      unlockSite();

    }

  }
);


/* =========================================================
   9 QUESTIONS
========================================================= */

const questions = [

  {
    title: "Question One",
    text: "If you could keep one thing forever, what would it be?",
    options: [
      "A beautiful memory ♡",
      "A person who feels like home",
      "A moment that never ends",
      "All of the above"
    ]
  },

  {
    title: "Question Two",
    text: "What's your perfect little escape?",
    options: [
      "A peaceful night",
      "A long drive",
      "Somewhere beautiful together",
      "A cozy place with good vibes"
    ]
  },

  {
    title: "Question Three",
    text: "What makes a moment unforgettable?",
    options: [
      "The person",
      "The feeling",
      "The memories",
      "Everything about it"
    ]
  },

  {
    title: "Question Four",
    text: "Pick the kind of night you'd choose.",
    options: [
      "Stars and silence ✦",
      "Music and talking",
      "City lights",
      "A random adventure"
    ]
  },

  {
    title: "Question Five",
    text: "What matters most between two people?",
    options: [
      "Trust",
      "Understanding",
      "Effort",
      "Never giving up"
    ]
  },

  {
    title: "Question Six",
    text: "If we could go anywhere, where would you go?",
    options: [
      "Mountains",
      "Beach",
      "A beautiful city",
      "Somewhere neither of us has seen"
    ]
  },

  {
    title: "Question Seven",
    text: "Choose one little thing.",
    options: [
      "Late-night conversations",
      "Random pictures",
      "Sharing food",
      "Laughing over nothing"
    ]
  },

  {
    title: "Question Eight",
    text: "What's stronger?",
    options: [
      "Time",
      "Distance",
      "Feelings",
      "A genuine connection"
    ]
  },

  {
    title: "Question Nine",
    text: "And finally... who are you choosing?",
    options: [
      "Someone special",
      "Your favourite person",
      "The person reading this",
      "You already know ♡"
    ]
  }

];


let currentQuestion = 0;

let selectedQuestionAnswer = null;

const questionCounter =
  document.getElementById("questionCounter");

const questionProgress =
  document.getElementById("questionProgress");

const questionTitle =
  document.getElementById("questionTitle");

const questionSubtitle =
  document.getElementById("questionSubtitle");

const questionStage =
  document.getElementById("questionStage");

const questionNext =
  document.getElementById("questionNext");


function startQuestionSystem() {

  currentQuestion = 0;

  selectedQuestionAnswer = null;

  renderQuestion();

}


function renderQuestion() {

  const question =
    questions[currentQuestion];

  if (!question) return;


  selectedQuestionAnswer = null;


  questionCounter.textContent =
    `${currentQuestion + 1} / ${questions.length}`;


  const progress =
    ((currentQuestion + 1) /
      questions.length) * 100;


  questionProgress.style.width =
    `${progress}%`;


  questionTitle.textContent =
    question.title;


  questionSubtitle.textContent =
    question.text;


  questionStage.innerHTML = "";

  questionNext.classList.add(
    "hidden"
  );


  question.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "question-option";

      button.textContent =
        option;


      button.style.animationDelay =
        `${index * 80}ms`;


      button.addEventListener(
        "click",
        () => {

          document
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


          selectedQuestionAnswer =
            index;


          questionNext.classList.remove(
            "hidden"
          );

          createSmallBurst(button);

        }
      );


      questionStage.appendChild(
        button
      );

    }
  );

}


questionNext.addEventListener(
  "click",
  () => {

    if (selectedQuestionAnswer === null) {
      return;
    }


    if (
      currentQuestion <
      questions.length - 1
    ) {

      currentQuestion++;

      renderQuestion();

      return;
    }


    showScreen("choiceScreen");

  }
);


/* =========================================================
   AHMIE CHOICE
========================================================= */

const ahmieButton =
  document.getElementById("ahmieButton");

const nineButton =
  document.getElementById("nineButton");

const choiceMessage =
  document.getElementById("choiceMessage");


let nineStage = 0;


ahmieButton.addEventListener(
  "click",
  () => {

    choiceMessage.textContent =
      "I knew it. ♡";

    ahmieButton.classList.add(
      "choice-success"
    );

    createHeartBurst();


    setTimeout(() => {

      showScreen("letterScreen");

      startLetter();

    }, 1200);

  }
);


/*
   The 9 button stays part of the interaction.
   It changes its message/stage instead of
   simply disappearing.
*/

nineButton.addEventListener(
  "click",
  () => {

    nineStage++;


    if (nineStage === 1) {

      nineButton.textContent =
        "ARE YOU SURE?";

      choiceMessage.textContent =
        "Hmm... think again. ♡";

      nineButton.classList.add(
        "choice-pulse"
      );

      return;
    }


    if (nineStage === 2) {

      nineButton.textContent =
        "NOPE ♡";

      choiceMessage.textContent =
        "That answer doesn't work here. 😌";

      return;
    }


    if (nineStage === 3) {

      nineButton.textContent =
        "TRY AGAIN";

      choiceMessage.textContent =
        "You still have one obvious choice.";

      return;
    }


    nineButton.textContent =
      "CHOOSE AHMIE ♡";

    choiceMessage.textContent =
      "Okay... now you know what to do. ♡";

    nineButton.classList.remove(
      "choice-pulse"
    );

  }
);


/* =========================================================
   LOVE LETTER
========================================================= */

const loveLetterText =
  document.getElementById("loveLetterText");

const letterNext =
  document.getElementById("letterNext");


const letterText = `
Ahmie,

I don't really know how to put everything I feel
into a few perfect words, but maybe I don't need
perfect words. Maybe I just need to be honest.

So first of all...

Please don't ignore this.
And please don't blush and run away. ♡

You can choose whoever you want,
you can go wherever you want,
and life can take us in a hundred different directions...

but for me, you are still you.

The person I care about.
The person I can call my best friend.
The person I want to keep as my
best friend forever.

Whatever happens, I don't want to simply
walk away and pretend none of it mattered.

There was a time when you went away.
I made mistakes too.
I thought maybe one day you'd come back,
and when you didn't, I had to understand
that I couldn't just sit there waiting.

But now?

I want to show you my effort.

Not with empty promises.
Not with words that disappear tomorrow.

With consistency.
With time.
With being there.
With actually trying.

I don't want to force anything.
I just don't want to give up on something
that still means this much to me.

So wherever life takes us,
whatever you choose,
I hope you always know one thing:

I'll still be your best friend.

And if you ever look back at this little website,
I hope it makes you smile.

Because I made it for you.

— Inshaal ♡
`;


function startLetter() {

  loveLetterText.textContent = "";

  letterNext.classList.add(
    "hidden"
  );


  typeWriter(
    loveLetterText,
    letterText.trim(),
    18,
    () => {

      setTimeout(() => {

        letterNext.classList.remove(
          "hidden"
        );

      }, 600);

    }
  );

}


function typeWriter(
  element,
  text,
  speed,
  callback
) {

  let index = 0;


  function write() {

    if (index >= text.length) {

      if (callback) callback();

      return;
    }


    element.textContent +=
      text.charAt(index);

    index++;


    let delay = speed;


    if (
      text.charAt(index - 1) === "."
      ||
      text.charAt(index - 1) === "!"
      ||
      text.charAt(index - 1) === "?"
    ) {

      delay = speed * 7;

    }


    setTimeout(
      write,
      delay
    );

  }


  write();

}


letterNext.addEventListener(
  "click",
  () => {

    showScreen("datingScreen");

    startDating();

  }
);


/* =========================================================
   DATING QUESTIONS
========================================================= */

const datingQuestions = [

  {
    question:
      "Where should we go for a first little adventure?",
    options: [
      "A cozy café ☕",
      "A long drive ✦",
      "A beautiful dinner",
      "Somewhere completely random"
    ]
  },

  {
    question:
      "What kind of evening sounds perfect?",
    options: [
      "City lights",
      "Stars and quiet",
      "Movies and food",
      "Walking and talking"
    ]
  },

  {
    question:
      "What should we definitely do?",
    options: [
      "Take pictures",
      "Try new food",
      "Explore somewhere new",
      "Laugh until we forget the time"
    ]
  },

  {
    question:
      "What should our day end with?",
    options: [
      "A sunset",
      "A late-night conversation",
      "Dessert",
      "One more adventure"
    ]
  },

  {
    question:
      "And the most important question...",
    options: [
      "When are we going? ♡",
      "Soon.",
      "Very soon.",
      "You choose the date. ✦"
    ]
  }

];


let currentDatingQuestion = 0;

let selectedDatingAnswer = null;


const datingCounter =
  document.getElementById("datingCounter");

const datingProgress =
  document.getElementById("datingProgress");

const datingStage =
  document.getElementById("datingStage");

const datingNext =
  document.getElementById("datingNext");


function startDating() {

  currentDatingQuestion = 0;

  selectedDatingAnswer = null;

  renderDatingQuestion();

}


function renderDatingQuestion() {

  const item =
    datingQuestions[
      currentDatingQuestion
    ];


  if (!item) return;


  selectedDatingAnswer = null;


  datingCounter.textContent =
    `${currentDatingQuestion + 1} / ${datingQuestions.length}`;


  const progress =
    ((currentDatingQuestion + 1) /
      datingQuestions.length) * 100;


  datingProgress.style.width =
    `${progress}%`;


  datingStage.innerHTML = "";


  const title =
    document.createElement("h2");

  title.className =
    "dating-question-title";

  title.textContent =
    item.question;


  datingStage.appendChild(title);


  item.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "dating-option";

      button.textContent =
        option;


      button.style.animationDelay =
        `${index * 90}ms`;


      button.addEventListener(
        "click",
        () => {

          document
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


          selectedDatingAnswer =
            index;


          datingNext.classList.remove(
            "hidden"
          );

          createSmallBurst(button);

        }
      );


      datingStage.appendChild(
        button
      );

    }
  );


  datingNext.classList.add(
    "hidden"
  );

}


datingNext.addEventListener(
  "click",
  () => {

    if (selectedDatingAnswer === null) {
      return;
    }


    if (
      currentDatingQuestion <
      datingQuestions.length - 1
    ) {

      currentDatingQuestion++;

      renderDatingQuestion();

      return;

    }


    showScreen("memoriesScreen");

    initializeMemories();

  }
);


/* =========================================================
   MEMORIES
========================================================= */

const memoryGrid =
  document.getElementById("memoryGrid");

const memoriesNext =
  document.getElementById("memoriesNext");


let memoriesInitialized = false;

let currentMemoryIndex = 0;


/*
   memories.js must provide:

   const memories = [
      "our-memories/Photo01.jpeg",
      ...
   ];
*/


function initializeMemories() {

  if (memoriesInitialized) {
    return;
  }


  memoriesInitialized = true;

  renderMemories();

}


function renderMemories() {

  memoryGrid.innerHTML = "";


  if (
    typeof memories === "undefined"
    ||
    !Array.isArray(memories)
  ) {

    const error =
      document.createElement("p");

    error.textContent =
      "Memory photos are waiting to be added.";

    error.style.color =
      "rgba(245,234,208,.55)";

    error.style.gridColumn =
      "1 / -1";

    memoryGrid.appendChild(
      error
    );

    return;

  }


  memories.forEach(
    (src, index) => {

      const card =
        document.createElement("button");

      card.type = "button";

      card.className =
        "memory-card";


      const image =
        document.createElement("img");

      image.src = src;

      image.alt =
        `Our Memory ${index + 1}`;

      image.loading =
        index < 6
          ? "eager"
          : "lazy";


      image.addEventListener(
        "error",
        () => {

          card.classList.add(
            "memory-error"
          );

          image.alt =
            "Memory image unavailable";

        }
      );


      const overlay =
        document.createElement("div");

      overlay.className =
        "memory-overlay";


      const number =
        document.createElement("span");

      number.className =
        "memory-number";

      number.textContent =
        String(index + 1)
          .padStart(2,"0");


      card.appendChild(image);

      card.appendChild(overlay);

      card.appendChild(number);


      card.addEventListener(
        "click",
        () => {

          openMemory(index);

        }
      );


      memoryGrid.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   MEMORY VIEWER
========================================================= */

const memoryViewer =
  document.getElementById("memoryViewer");

const viewerImage =
  document.getElementById("viewerImage");

const viewerCounter =
  document.getElementById("viewerCounter");

const viewerClose =
  document.getElementById("viewerClose");

const viewerPrevious =
  document.getElementById("viewerPrevious");

const viewerNext =
  document.getElementById("viewerNext");


function openMemory(index) {

  if (
    typeof memories === "undefined"
    ||
    !memories[index]
  ) {
    return;
  }


  currentMemoryIndex =
    index;


  updateMemoryViewer();


  memoryViewer.classList.add(
    "active"
  );


  document.body.style.overflow =
    "hidden";

}


function updateMemoryViewer() {

  const src =
    memories[currentMemoryIndex];


  viewerImage.style.opacity =
    "0";


  viewerImage.src =
    src;


  viewerImage.onload = () => {

    viewerImage.style.opacity =
      "1";

  };


  viewerCounter.textContent =
    `${String(currentMemoryIndex + 1).padStart(2,"0")} / ${String(memories.length).padStart(2,"0")}`;

}


function closeMemoryViewer() {

  memoryViewer.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";

}


function nextMemory() {

  if (
    typeof memories === "undefined"
    ||
    !memories.length
  ) {
    return;
  }


  currentMemoryIndex =
    (currentMemoryIndex + 1)
    % memories.length;


  updateMemoryViewer();

}


function previousMemory() {

  if (
    typeof memories === "undefined"
    ||
    !memories.length
  ) {
    return;
  }


  currentMemoryIndex =
    (
      currentMemoryIndex -
      1 +
      memories.length
    )
    % memories.length;


  updateMemoryViewer();

}


viewerClose.addEventListener(
  "click",
  closeMemoryViewer
);


viewerNext.addEventListener(
  "click",
  nextMemory
);


viewerPrevious.addEventListener(
  "click",
  previousMemory
);


memoryViewer.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      memoryViewer
    ) {

      closeMemoryViewer();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      !memoryViewer.classList.contains(
        "active"
      )
    ) {
      return;
    }


    if (event.key === "Escape") {

      closeMemoryViewer();

    }


    if (event.key === "ArrowRight")
