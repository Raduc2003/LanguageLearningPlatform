window.onload = () => {
  const progress = 3;
  const noLessons = 5;
  const lessonRack = document.createElement("div");
  lessonRack.classList.add("roadmap");

  // Adăugați o bară de progres
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  lessonRack.appendChild(progressBar);

  // Adăugați fiecare lecție ca o carte de lecție
  const lessonTitles = [
    "Say Hello!",
    "Understanding Words",
    "Grammar",
    "Speaking",
    "Listening",
  ];
  for (let i = 0; i < noLessons; i++) {
    const aref = document.createElement("a");
    aref.href = `english/${i + 1}`;
    const lessonCard = document.createElement("div");
    lessonCard.classList.add("lessonCard");
    // Adăugați simbolul pentru fiecare carte de lecție
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

    // Adăugați numele lecției
    const lessonTitle = document.createElement("span");
    lessonTitle.innerText = `Lesson ${i + 1}: ${lessonTitles[i]}`;
    lessonCard.appendChild(lessonTitle);
  }

  // Actualizați bara de progres pentru a reflecta progresul
  const progressWidth = (progress / noLessons) * 100;
  const progressIndicator = document.createElement("div");
  progressIndicator.classList.add("progress");
  progressIndicator.style.width = `${progressWidth}%`;
  progressBar.appendChild(progressIndicator);

  document.querySelector("main").appendChild(lessonRack);
};
