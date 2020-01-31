const startTime = Date.now();
import { app, BrowserWindow, dialog } from "electron";
import * as path from "path";
function logStartupTime(task) {
  console.log(
    `=============-----------${task}, took ${(Date.now() - startTime) / 1000}-----------=============`
  );
}
app.on("ready", loadSplashScreen);
function loadSplashScreen() {
  logStartupTime("loadSplashScreen");
  const windowIcon = path.join(__dirname, "build", "icons", "png", "512x512.png");
  //splash screen
  let splash = new BrowserWindow({
    width: 300,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: windowIcon,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false
    }
  });
  splash.once("show", () => {
    logStartupTime("splash show");
  });
  splash.webContents.once("dom-ready", () => {
    logStartupTime("splash dom-ready");
    let app = require('./appInitializer')
    app.createWindow(splash, startTime);
  })
  splash.loadFile(path.join(__dirname, "loading", "index.html"));
  splash.show();
}
