window.onload = async () => {
  const lessonRack = document.createElement("div");
  lessonRack.classList.add("roadmap");

  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  lessonRack.appendChild(progressBar);

  const lessonTitles = [
    "Say Hello!",
    "Understanding Words",
    "Grammar",
    "Speaking",
    "Listening",
  ];

  const renderProgress = (progress) => {
    lessonRack.innerHTML = ""; // Clear existing content

    for (let i = 0; i < lessonTitles.length; i++) {
      const aref = document.createElement("a");
      aref.href = `english/${i + 1}`;
      const lessonCard = document.createElement("div");
      lessonCard.classList.add("lessonCard");
      const symbol = document.createElement("span");
      symbol.classList.add("symbol");

      if (i < progress) {
        symbol.classList.add("symbol-unlocked");
        lessonCard.classList.add("unlocked");
        aref.appendChild(lessonCard);
        lessonRack.appendChild(aref);
      } else {
        symbol.classList.add("symbol-locked");
        lessonCard.classList.add("locked");
        lessonRack.appendChild(lessonCard);
      }

      lessonCard.appendChild(symbol);

      const lessonTitle = document.createElement("span");
      lessonTitle.innerText = `Lesson ${i + 1}: ${lessonTitles[i]}`;
      lessonCard.appendChild(lessonTitle);
    }

    const progressWidth = (progress / lessonTitles.length) * 100;
    const progressIndicator = document.createElement("div");
    progressIndicator.classList.add("progress");
    progressIndicator.style.width = `${progressWidth}%`;
    progressBar.appendChild(progressIndicator);
  };

  const updateProgress = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/courses/english/progress",
        {
          method: "GET",
          credentials: "same-origin",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const progress = parseInt(data.progress);
      renderProgress(progress);
    } catch (error) {
      console.log(
        "There was a problem with your fetch operation: " + error.message
      );
    }
  };

  updateProgress(); // Initial progress update

  // Listen for progress updates using WebSocket or other real-time mechanisms
  // and call updateProgress() whenever the progress changes

  document.querySelector("main").appendChild(lessonRack);
};
