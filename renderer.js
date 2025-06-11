// Load environment variables
require("dotenv").config();

// URL and token
const url =
  "https://web.getmarks.app/api/v4/marks-selected/exam/6798bb6e82630c9a169a8118/module/67a36cf5b1e9494e871ea105/subjects";
const token = process.env.TOKEN; // Load token from .env file

// Fetch data from the API
async function fetchSubjects() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed! Status Code: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Data:", data); // Debugging: Print the response data
    displaySubjects(data);
    displayCumulativeProgress(data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Display subjects in the progress bar
function displaySubjects(data) {
  const subjects = data?.data?.subjects?.subjects || [];
  const progressContainer = document.getElementById("progress-container");

  if (!progressContainer) {
    console.error("Progress container not found!");
    return;
  }

  // Clear existing progress bars to prevent duplicates
  progressContainer.innerHTML = "";

  subjects.forEach((subject) => {
    const title = subject.title || "No title found";
    const total = subject.analysis?.total || 1; // Avoid division by zero
    const completed = subject.analysis?.completed || 0;
    const progress = (completed / total) * 100;

    const progressItem = document.createElement("div");
    progressItem.className = "progress-item";

    const progressCircle = document.createElement("div");
    progressCircle.className = "progress-circle";

    // Assign colors based on subject
    let progressColor = "lightgray"; // Default fallback color
    if (title.toLowerCase().includes("chemistry"))
      progressColor = "#4caf50"; // Green for chemistry
    else if (title.toLowerCase().includes("physics"))
      progressColor = "#2196f3"; // Blue for physics
    else if (title.toLowerCase().includes("math")) progressColor = "#ff9800"; // Orange for maths

    progressCircle.style.background = `conic-gradient(
        ${progressColor} 0%,
        ${progressColor} ${progress}%,
        rgba(255, 255, 255, 0.1) ${progress}%,
        rgba(255, 255, 255, 0.1) 100%
      )`;

    // Delay the fade-in effect to apply smoothly
    setTimeout(() => {
      progressCircle.style.opacity = "1";
    }, 100); // A 100ms delay ensures a smooth effect

    const progressText = document.createElement("div");
    progressText.className = "progress-text";
    progressText.textContent = `${Math.round(progress)}%`;

    progressCircle.appendChild(progressText);

    const subjectTitle = document.createElement("div");
    subjectTitle.className = "subject-title";
    subjectTitle.textContent = title; // Display the subject title

    const progressValues = document.createElement("div");
    progressValues.className = "progress-values";
    progressValues.textContent = `(${completed} / ${total})`; // Display the progress values

    progressItem.appendChild(progressCircle);
    progressItem.appendChild(subjectTitle);
    progressItem.appendChild(progressValues);
    progressContainer.appendChild(progressItem);
  });
}

// Display cumulative progress chart
function displayCumulativeProgress(data) {
  const subjects = data?.data?.subjects?.subjects || [];
  const cumulativeContainer = document.getElementById(
    "cumulative-progress-container"
  );

  if (!cumulativeContainer) {
    console.error("Cumulative progress container not found!");
    return;
  }

  const pieChartContainer = document.getElementById("cumulative-pie-chart");
  pieChartContainer.innerHTML = ""; // Clear previous pie chart content

  let totalQuestions = 0;
  let totalCompleted = 0;

  // Compute total questions and completed questions for all subjects
  const subjectSegments = subjects.map((subject) => {
    const title = subject.title || "Unknown";
    const total = subject.analysis?.total || 0;
    const completed = subject.analysis?.completed || 0;

    totalQuestions += total;
    totalCompleted += completed;

    return {
      title: title,
      completed: completed,
    };
  });

  // Calculate percentages for conic-gradient
  let currentPercentage = 0;
  const segments = [];

  // Add completed progress for each subject
  subjectSegments.forEach((segment) => {
    const completedPercentage = (segment.completed / totalQuestions) * 100;

    segments.push({
      color: segment.title.toLowerCase().includes("chemistry")
        ? "#4caf50" // Green for chemistry
        : segment.title.toLowerCase().includes("physics")
        ? "#2196f3" // Blue for physics
        : segment.title.toLowerCase().includes("math")
        ? "#ff9800" // Orange for maths
        : "lightgray", // Default fallback color
      start: currentPercentage,
      end: currentPercentage + completedPercentage,
    });

    currentPercentage += completedPercentage;
  });

  // Add remaining (uncompleted) progress as grey
  if (currentPercentage < 100) {
    segments.push({
      color: "rgba(255, 255, 255, 0.1)", // Transparent gray for remaining progress
      start: currentPercentage,
      end: 100,
    });
  }

  // Generate the conic-gradient style
  const gradientStops = segments
    .map((segment) => `${segment.color} ${segment.start}% ${segment.end}%`)
    .join(", ");
  pieChartContainer.style.background = `conic-gradient(${gradientStops})`;

  // Make the pie chart visible after setting the background
  pieChartContainer.style.opacity = "1"; // Add this line here

  // Add total percentage to the center of the pie chart
  const percentageDone = Math.round((totalCompleted / totalQuestions) * 100);
  const progressText = document.createElement("div");
  progressText.className = "progress-text";
  progressText.textContent = `${percentageDone}%`; // Display total percentage done

  pieChartContainer.appendChild(progressText); // Append text to the pie chart container

  // Create cumulative title and done/total elements dynamically
  const cumulativeTitle = document.createElement("div");
  cumulativeTitle.className = "subject-title";
  cumulativeTitle.textContent = "Cumulative"; // Display "Cumulative"

  const cumulativeValues = document.createElement("div");
  cumulativeValues.className = "progress-values";
  cumulativeValues.textContent = `(${totalCompleted} / ${totalQuestions})`; // Display "(done / total)"

  const cumulativeTextContainer = document.createElement("div");
  cumulativeTextContainer.className = "cumulative-text"; // Container for cumulative text
  cumulativeTextContainer.appendChild(cumulativeTitle);
  cumulativeTextContainer.appendChild(cumulativeValues);

  cumulativeContainer.appendChild(cumulativeTextContainer); // Append cumulative text below pie chart
}

// Fetch and render subjects on page load
fetchSubjects();
