document.addEventListener("DOMContentLoaded", () => {
  const addTab = document.getElementById("add-tab");
  const viewTab = document.getElementById("view-tab");
  const addSection = document.getElementById("add-workout-section");
  const logSection = document.getElementById("log-section");
  const form = document.getElementById("workout-form");
  const logList = document.getElementById("workout-log");

  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

  function saveWorkouts() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  function renderLog() {
    logList.innerHTML = "";
    workouts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach((workout, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${workout.date}:</strong> ${workout.activity} - ${workout.duration} mins, ${workout.calories} cal
          <button onclick="deleteWorkout(${index})">Delete</button>
        `;
        logList.appendChild(li);
      });
  }

  window.deleteWorkout = function (index) {
    workouts.splice(index, 1);
    saveWorkouts();
    renderLog();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const activity = document.getElementById("activity").value.trim();
    const duration = parseInt(document.getElementById("duration").value);
    const calories = parseInt(document.getElementById("calories").value);
    const date = document.getElementById("date").value;

    if (!activity || duration <= 0 || calories <= 0 || !date) {
      alert("Please fill out all fields correctly.");
      return;
    }

    workouts.push({ activity, duration, calories, date });
    saveWorkouts();
    form.reset();
    renderLog();
    logSection.style.display = "block";
    addSection.style.display = "none";
  });

  // 🟢 Tab switching logic
  addTab.addEventListener("click", () => {
    addSection.style.display = "block";
    logSection.style.display = "none";
  });

  viewTab.addEventListener("click", () => {
    addSection.style.display = "none";
    logSection.style.display = "block";
    render
