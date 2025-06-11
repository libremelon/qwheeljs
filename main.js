const { app, BrowserWindow } = require("electron");
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "ic_content_exam_jee_main.ico"),
    webPreferences: {
      preload: path.join(__dirname, "renderer.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
