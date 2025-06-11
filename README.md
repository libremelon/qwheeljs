# **QWheel (Progress Tracker)**

A simple Electron-based application that helps visualize subject-wise and cumulative progress for exam preparation.

## **Features**

- 📊 **Cumulative Progress Visualization** using a conic-gradient pie chart.
- 📈 **Subject-Specific Tracking** with dynamic percentage calculations.
- 🔄 **Real-time Data Fetching** from an API (`getmarks.app`).
- 🎨 **Dark Theme UI** with smooth animations and accessibility optimizations.

## **Installation & Setup**

### **Prerequisites**

- Node.js (Ensure it's installed: `node -v`)
- npm (Check: `npm -v`)
- Electron (Installed automatically with `npm install`)

### **Steps**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd progress-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create an `.env` file and add your API token:
   ```bash
   TOKEN=your_api_token_here
   ```
4. Run the application:
   ```bash
   npm start
   ```

## **Project Structure**

```
progress-tracker/
│── index.html        # Main UI file
│── main.js           # Electron app configuration
│── renderer.js       # Handles API fetching & rendering
│── style.css         # Styling for the UI
│── .env              # Environment variables (API token)
│── package.json      # Project metadata & dependencies
└── README.md         # Documentation (You're reading it!)
```

## **Usage**

- Run the app and view **progress charts** for different subjects.
- The **cumulative pie chart** visualizes total completion across all subjects.
- Each subject **displays percentage completion dynamically**.
