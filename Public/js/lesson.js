window.onload = async () => {
  const quizForm = document.getElementById("quiz");
  const correctAnswer = "1";

  const progress = await getProgress();

  // Listen for form submission
  quizForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(quizForm);
    const userAnswer = formData.get("answer");

    if (userAnswer === correctAnswer) {
      // If the answer is correct, increment progress
      const updatedProgress = await incrementProgress(progress + 1); // use await here
      console.log(updatedProgress); // Updated progress
    } else {
      // If the answer is not correct, do not change progress
      console.log(progress); // Current progress
    }
  });

  async function getProgress() {
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
    return parseInt(data.progress);
  }

  async function incrementProgress(newProgress) {
    const response = await fetch(
      "http://localhost:3000/courses/english/progress",
      {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ progress: newProgress }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.progress; // Return as is, no need to parse as integer
  }
};
