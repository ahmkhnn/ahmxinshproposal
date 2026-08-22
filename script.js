/* =========================================================
   AHMIE SITE — COMPLETE JS
   PASSWORD → 9 QUESTIONS → CHOICE → LETTER
   → DATING → MEMORIES → VIEWER → ANIMATION → FINAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     SETTINGS
  ======================================================= */

  const PASSWORD = "2628";

  const INSTAGRAM_USERNAME = "AHME-SOLITUDE";


  /* =======================================================
     SCREEN SYSTEM
  ======================================================= */

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


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const passwordInput =
    document.getElementById("passwordInput");

  const unlockButton =
    document.getElementById("unlockButton");

  const codeMessage =
    document.getElementById("codeMessage");

  const passwordContainer =
    document.querySelector(".password-container");


  /* =======================================================
     PASSWORD
  ======================================================= */

  if (passwordInput) {

    passwordInput.addEventListener("input", () => {

      /* Only numbers */
      passwordInput.value =
        passwordInput.value.replace(/\D/g, "");

      /* Maximum 4 digits */
      passwordInput.value =
        passwordInput.value.slice(0, 4);

      if (passwordInput.value.length === 4) {

        codeMessage.textContent =
          "Ready? Press UNLOCK. ♡";

      } else {

        codeMessage.textContent =
          "Four digits. That's all. ♡";

      }

    });


    passwordInput.addEventListener("keydown", event => {

      if (event.key === "Enter") {

        event.preventDefault();

        unlockSite();

      }

    });

  }


  if (unlockButton) {

    unlockButton.addEventListener(
      "click",
      unlockSite
    );

  }


  function unlockSite() {

    if (!passwordInput) return;

    const entered =
      passwordInput.value.trim();


    /* WRONG PASSWORD */

    if (entered !== PASSWORD) {

      if (passwordContainer) {

        passwordContainer.classList.remove(
          "password-error"
        );

        void passwordContainer.offsetWidth;

        passwordContainer.classList.add(
          "password-error"
        );

      }

      if (codeMessage) {

        codeMessage.textContent =
          "Wrong code... try again. ♡";

        codeMessage.classList.remove(
          "success"
        );

      }

      passwordInput.value = "";

      passwordInput.focus();

      return;

    }


    /* CORRECT PASSWORD */

    if (codeMessage) {

      codeMessage.textContent =
        "Unlocked. Welcome in. ♡";

      codeMessage.classList.add(
        "success"
      );

    }


    if (passwordContainer) {

      passwordContainer.classList.add(
        "password-success"
      );

    }


    if (unlockButton) {

      unlockButton.disabled = true;

    }


    createHeartBurst();


    /* DIRECT NEXT PAGE */

    setTimeout(() => {

      if (unlockButton) {
        unlockButton.disabled = false;
      }

      showScreen("questionsScreen");

      startQuestionSystem();

    }, 900);

  }


  /* =======================================================
     9 QUESTIONS
  ======================================================= */

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


    questionProgress.style.width =
      `${((currentQuestion + 1) / questions.length) * 100}%`;


    questionTitle.textContent =
      question.title;


    questionSubtitle.textContent =
      question.text;


    questionStage.innerHTML = "";

    questionNext.classList.add("hidden");


    question.options.forEach((option, index) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "question-option";

      button.textContent =
        option;

      button.style.animationDelay =
        `${index * 80}ms`;


      button.addEventListener("click", () => {

        document
          .querySelectorAll(".question-option")
          .forEach(item => {
            item.classList.remove("selected");
          });


        button.classList.add("selected");

        selectedQuestionAnswer = index;

        questionNext.classList.remove("hidden");

        createSmallBurst(button);

      });


      questionStage.appendChild(button);

    });

  }


  questionNext.addEventListener("click", () => {

    if (selectedQuestionAnswer === null) {
      return;
    }


    if (currentQuestion < questions.length - 1) {

      currentQuestion++;

      renderQuestion();

      return;

    }


    showScreen("choiceScreen");

  });


  /* =======================================================
     CHOOSE AHMIE
  ======================================================= */

  const ahmieButton =
    document.getElementById("ahmieButton");

  const nineButton =
    document.getElementById("nineButton");

  const choiceMessage =
    document.getElementById("choiceMessage");


  let nineStage = 0;


  ahmieButton.addEventListener("click", () => {

    choiceMessage.textContent =
      "I knew it. ♡";

    ahmieButton.classList.add(
      "choice-success"
    );

    createHeartBurst();


    setTimeout(() => {

      showScreen("letterScreen");

      startLetter();

    }, 1000);

  });


  nineButton.addEventListener("click", () => {

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

  });


  /* =======================================================
     LOVE LETTER
  ======================================================= */

  const loveLetterText =
    document.getElementById("loveLetterText");

  const letterNext =
    document.getElementById("letterNext");


  const letterText = `
Ahmie,

Please don't ignore this.

And please don't blush and run away. ♡

I wanted to make this little world for you because
sometimes normal words just don't feel like enough.

You can choose whoever you want.
You can go wherever you want.
Life can take us in different directions.

But for me, you're still you.

No matter who you choose,
for me, you will always be you.

My favourite person.
My best friend.
And someone I want to keep in my life forever.

There was a time when you went away.
I made mistakes too.
I thought maybe you would come back,
but you didn't.

Maybe I didn't understand things properly back then.

But this time I don't want to just sit there
and wait for something to happen.

I want to show you my effort.

Not just with words.

With consistency.
With time.
With care.
With being there.
With actually trying.

Whatever happens,
I don't want to simply leave
and pretend that you never mattered.

Because you do.

And even if life changes,
I still want to be your best friend forever.

So please don't ignore this little letter.

And yes...

you can blush. ♡

I made this entire little world
just so you could smile for a moment.

— Inshaal ♡
`;


  function startLetter() {

    loveLetterText.textContent = "";

    letterNext.classList.add("hidden");


    typeWriter(
      loveLetterText,
      letterText.trim(),
      15,
      () => {

        setTimeout(() => {

          letterNext.classList.remove(
            "hidden"
          );

        }, 500);

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

      const char =
        text.charAt(index - 1);


      if (
        char === "." ||
        char === "!" ||
        char === "?"
      ) {

        delay = speed * 5;

      }


      setTimeout(write, delay);

    }


    write();

  }


  letterNext.addEventListener("click", () => {

    showScreen("datingScreen");

    startDating();

  });


  /* =======================================================
     DATING
  ======================================================= */

  const datingQuestions = [

    {
      question:
        "Where should we go for our first little adventure?",
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
      datingQuestions[currentDatingQuestion];

    if (!item) return;


    selectedDatingAnswer = null;


    datingCounter.textContent =
      `${currentDatingQuestion + 1} / ${datingQuestions.length}`;


    datingProgress.style.width =
      `${((currentDatingQuestion + 1) / datingQuestions.length) * 100}%`;


    datingStage.innerHTML = "";

    datingNext.classList.add("hidden");


    const title =
      document.createElement("h2");

    title.className =
      "dating-question-title";

    title.textContent =
      item.question;

    datingStage.appendChild(title);


    item.options.forEach((option, index) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "dating-option";

      button.textContent =
        option;

      button.style.animationDelay =
        `${index * 90}ms`;


      button.addEventListener("click", () => {

        document
          .querySelectorAll(".dating-option")
          .forEach(item => {
            item.classList.remove("selected");
          });


        button.classList.add("selected");

        selectedDatingAnswer = index;

        datingNext.classList.remove("hidden");

        createSmallBurst(button);

      });


      datingStage.appendChild(button);

    });

  }


  datingNext.addEventListener("click", () => {

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

  });


  /* =======================================================
     MEMORIES
  ======================================================= */

  const memoryGrid =
    document.getElementById("memoryGrid");

  const memoriesNext =
    document.getElementById("memoriesNext");


  let memoriesInitialized = false;


  function initializeMemories() {

    if (memoriesInitialized) return;

    memoriesInitialized = true;

    renderMemories();

  }


  function renderMemories() {

    memoryGrid.innerHTML = "";


    if (
      typeof memories === "undefined" ||
      !Array.isArray(memories)
    ) {

      memoryGrid.innerHTML = `
        <div style="
          grid-column:1/-1;
          padding:40px;
          color:rgba(245,234,208,.6);
        ">
          Add your 30 JPEG photos to the
          <strong>our-memories</strong> folder.
        </div>
      `;

      return;

    }


    memories.forEach((src, index) => {

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
        index < 6 ? "eager" : "lazy";


      image.addEventListener("error", () => {

        card.classList.add(
          "memory-error"
        );

      });


      const overlay =
        document.createElement("div");

      overlay.className =
        "memory-overlay";


      const number =
        document.createElement("span");

      number.className =
        "memory-number";

      number.textContent =
        String(index + 1).padStart(2, "0");


      card.appendChild(image);

      card.appendChild(overlay);

      card.appendChild(number);


      card.addEventListener("click", () => {

        openMemory(index);

      });


      memoryGrid.appendChild(card);

    });

  }


  memoriesNext.addEventListener("click", () => {

    showScreen("animationScreen");

    startCinematic();

  });


  /* =======================================================
     FULLSCREEN MEMORY VIEWER
  ======================================================= */

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


  let currentMemoryIndex = 0;


  function openMemory(index) {

    if (
      typeof memories === "undefined" ||
      !memories[index]
    ) return;


    currentMemoryIndex = index;

    updateMemoryViewer();

    memoryViewer.classList.add("active");

    document.body.style.overflow =
      "hidden";

  }


  function updateMemoryViewer() {

    const src =
      memories[currentMemoryIndex];


    viewerImage.style.opacity = "0";

    viewerImage.src = src;


    viewerImage.onload = () => {

      viewerImage.style.opacity = "1";

    };


    viewerCounter.textContent =
      `${String(currentMemoryIndex + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;

  }


  function closeMemoryViewer() {

    memoryViewer.classList.remove("active");

    document.body.style.overflow = "";

  }


  function nextMemory() {

    if (
      typeof memories === "undefined" ||
      !memories.length
    ) return;


    currentMemoryIndex =
      (currentMemoryIndex + 1) %
      memories.length;


    updateMemoryViewer();

  }


  function previousMemory() {

    if (
      typeof memories === "undefined" ||
      !memories.length
    ) return;


    currentMemoryIndex =
      (currentMemoryIndex - 1 + memories.length) %
      memories.length;


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


  memoryViewer.addEventListener("click", event => {

    if (event.target === memoryViewer) {
      closeMemoryViewer();
    }

  });


  document.addEventListener("keydown", event => {

    if (
      !memoryViewer.classList.contains("active")
    ) return;


    if (event.key === "Escape") {
      closeMemoryViewer();
    }

    if (event.key === "ArrowRight") {
      nextMemory();
    }

    if (event.key === "ArrowLeft") {
      previousMemory();
    }

  });


  /* =======================================================
     CINEMATIC ANIMATION
  ======================================================= */

  function startCinematic() {

    const text =
      document.getElementById("animationText");

    if (!text) return;


    const lines = [
      "Some memories are meant to stay.",
      "Some people become part of us.",
      "And some stories are only beginning. ♡"
    ];


    let index = 0;

    text.style.opacity = "0";


    function changeText() {

      text.style.opacity = "0";


      setTimeout(() => {

        text.innerHTML =
          lines[index]
            .replace(/\n/g, "<br>");

        text.style.opacity = "1";

        index++;

        if (index < lines.length) {

          setTimeout(
            changeText,
            3000
          );

        } else {

          setTimeout(() => {

            showScreen("finalScreen");

            setupInstagram();

          }, 3500);

        }

      }, 700);

    }


    changeText();

  }


  /* =======================================================
     INSTAGRAM
  ======================================================= */

  function setupInstagram() {

    const link =
      document.getElementById("instagramLink");

    if (!link) return;


    /*
      Instagram usernames cannot normally contain
      hyphens. Keep the displayed ID exactly as requested,
      but don't force an invalid profile URL.
    */

    link.textContent =
      `@${INSTAGRAM_USERNAME}`;

  }


  /* =======================================================
     GOLD PARTICLES
  ======================================================= */

  function createGoldBurst() {

    const container =
      document.getElementById("particles");

    if (!container) return;


    for (let i = 0; i < 18; i++) {

      const spark =
        document.createElement("span");

      spark.className =
        "gold-spark";

      spark.textContent =
        "✦";


      spark.style.left =
        "50%";

      spark.style.top =
        "50%";


      spark.style.setProperty(
        "--x",
        `${(Math.random() - .5) * 500}px`
      );

      spark.style.setProperty(
        "--y",
        `${(Math.random() - .5) * 500}px`
      );


      container.appendChild(spark);


      setTimeout(() => {
        spark.remove();
      }, 1800);

    }

  }


  function createSmallBurst(element) {

    if (!element) return;


    const rect =
      element.getBoundingClientRect();


    const container =
      document.getElementById("particles");

    if (!container) return;


    for (let i = 0; i < 8; i++) {

      const spark =
        document.createElement("span");

      spark.className =
        "gold-spark";

      spark.textContent =
        "✦";


      spark.style.left =
        `${rect.left + rect.width / 2}px`;

      spark.style.top =
        `${rect.top + rect.height / 2}px`;


      spark.style.setProperty(
        "--x",
        `${(Math.random() - .5) * 180}px`
      );

      spark.style.setProperty(
        "--y",
        `${(Math.random() - .5) * 140}px`
      );


      container.appendChild(spark);


      setTimeout(() => {
        spark.remove();
      }, 1700);

    }

  }


  function createHeartBurst() {

    const container =
      document.getElementById("floatingHearts");

    if (!container) return;


    for (let i = 0; i < 18; i++) {

      const heart =
        document.createElement("span");

      heart.className =
        "floating-heart";

      heart.textContent =
        Math.random() > .5
          ? "♡"
          : "✦";


      heart.style.left =
        `${Math.random() * 100}%`;

      heart.style.bottom =
        "-30px";


      heart.style.fontSize =
        `${12 + Math.random() * 22}px`;


      heart.style.animationDelay =
        `${Math.random() * .5}s`;


      container.appendChild(heart);


      setTimeout(() => {
        heart.remove();
      }, 7500);

    }

  }


  /* =======================================================
     BACKGROUND PARTICLES
  ======================================================= */

  function createBackgroundParticles() {

    const container =
      document.getElementById("particles");

    if (!container) return;


    for (let i = 0; i < 45; i++) {

      const particle =
        document.createElement("span");

      particle.className =
        "particle";


      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;


      particle.style.animationDelay =
        `${Math.random() * 8}s`;


      particle.style.animationDuration =
        `${5 + Math.random() * 8}s`;


      container.appendChild(particle);

    }

  }


  createBackgroundParticles();


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  showScreen("passwordScreen");


  /* Auto-focus password */

  setTimeout(() => {

    if (passwordInput) {
      passwordInput.focus();
    }

  }, 500);

});
