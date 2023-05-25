window.onload = () => {
  // Random Placement on Click
  document.addEventListener("click", function (event) {
    const notFoundText = document.createElement("span");
    notFoundText.textContent = "404 Page Not Found";
    notFoundText.style.position = "absolute";
    notFoundText.style.top = `${event.clientY}px`;
    notFoundText.style.left = `${event.clientX}px`;
    notFoundText.style.cursor = "default";
    document.body.appendChild(notFoundText);

    setTimeout(function () {
      notFoundText.style.opacity = "0";
      setTimeout(function () {
        notFoundText.remove();
      }, 1000);
    }, 2000);

    event.stopPropagation();
  });

  // Background Change on Spacebar Press
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32) {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      document.body.style.backgroundColor = randomColor;
    }
  });

  // Local Storage Counter
  if (typeof localStorage !== "undefined") {
    let counter = parseInt(localStorage.getItem("counter")) || 0;
    const counterElement = document.createElement("div");
    counterElement.textContent = `Counter: ${counter}`;
    document.body.appendChild(counterElement);

    document.addEventListener("click", function () {
      counter++;
      localStorage.setItem("counter", counter);
      counterElement.textContent = `Counter: ${counter}`;
    });
  }

  // Other Fun Interactions
  setInterval(function () {
    const h1 = document.getElementsByTagName("h1")[0];
    h1.style.transform = "scale(1.2)";
    setTimeout(function () {
      h1.style.transform = "scale(1)";
    }, 1000);

    const exampleString = "This is an example string.";
    console.log(exampleString.toUpperCase());
  }, 3000);
};
