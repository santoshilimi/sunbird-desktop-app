import { containerAPI } from "OpenRAP/dist/api/index";
import { app, BrowserWindow, ipcMain } from "electron";
import * as _ from "lodash";
import * as path from "path";
import * as fs from "fs";
import * as fse from "fs-extra";
import { frameworkAPI } from "@project-sunbird/ext-framework-server/api";
import { logger } from "@project-sunbird/ext-framework-server/logger";
import { frameworkConfig } from "./framework.config";
import express from "express";
import portscanner from "portscanner";
import * as bodyParser from "body-parser";
import * as os from "os";
const uuid = require("uuid/v4");
const envs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "env.json"), { encoding: "utf-8" })
);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any;

const expressApp = express();
expressApp.use(bodyParser.json());

const getFilesPath = () => {
  if (_.startsWith(_.toLower(envs.APP_ID), "local")) {
    return __dirname;
  } else {
    return path.join(app.getPath("userData"), "." + envs.APP_NAME);
  }
};

// set the env
const initializeEnv = () => {
  _.forEach(envs, (value, key) => {
    process.env[key] = value;
  });
  process.env.DATABASE_PATH = path.join(getFilesPath(), "database");
  process.env.FILES_PATH = getFilesPath();
  console.log(`FILES_PATH for the app is ${process.env.FILES_PATH}`);
  if (!fs.existsSync(process.env.DATABASE_PATH)) {
    fse.ensureDirSync(process.env.DATABASE_PATH);
  }
};

const copyPluginsMetaData = async () => {
  if (!_.startsWith(_.toLower(envs.APP_ID), "local")) {
    for (const plugin of frameworkConfig.plugins) {
      await fse.copy(
        path.join(__dirname, plugin.id),
        path.join(getFilesPath(), plugin.id)
      );
    }
  }
};

// get available port from range(9000-9100) and sets it to run th app
const setAvailablePort = async () => {
  let port = await portscanner.findAPortNotInUse(9000, 9100);
  process.env.APPLICATION_PORT = port;
};

// Initialize ext framework
const framework = async () => {
  const subApp = express();
  subApp.use(bodyParser.json({ limit: "100mb" }));
  expressApp.use("/", subApp);
  return new Promise((resolve, reject) => {
    frameworkConfig.db.pouchdb.path = process.env.DATABASE_PATH;
    frameworkConfig["logBasePath"] = getFilesPath();
    frameworkAPI
      .bootstrap(frameworkConfig, subApp)
      .then(() => {
        resolve();
      })
      .catch((error: any) => {
        resolve();
      });
  });
};

// start the express app to load in the main window
const startApp = async () => {
  return new Promise((resolve, reject) => {
    expressApp.listen(process.env.APPLICATION_PORT, (error: any) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        logger.info("app is started on port " + process.env.APPLICATION_PORT);
        resolve();
      }
    });
  });
};

// start loading all the dependencies
const bootstrapDependencies = async () => {
  initializeEnv();
  await copyPluginsMetaData();
  await setAvailablePort();
  await framework();
  await containerAPI.bootstrap();
  await startApp();
};

function createWindow() {
  //splash screen
  let splash = new BrowserWindow({
    width: 300,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  });
  splash.loadFile(path.join(__dirname, "loading", "index.html"));

  // Create the main window.
  win = new BrowserWindow({
    titleBarStyle: "hidden",
    show: false,
    minWidth: 700,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: false
    }
  });

  // create admin for the database

  bootstrapDependencies()
    .then(() => {
      setTimeout(() => {
        splash.destroy();
        win.loadURL(`http://localhost:${process.env.APPLICATION_PORT}`);
        win.show();
        win.maximize();
        // Open the DevTools.
        // win.webContents.openDevTools();
        win.focus();
      }, 10000);
    })
    .catch(err => {
      logger.error("unable to start the app ", err);
    });

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

let gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // if user open's second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// below code is to handle the ecar file open event from different os's

// to handle ecar file open in MAC OS
app.on("open-file", (e, path) => {
  e.preventDefault();
  if (_.endsWith(_.toLower(path), ".ecar")) {
    //open child window if not opened

    //send the message to import the file
    ipcMain.emit("import-file", [
      {
        filePath: path,
        id: uuid()
      }
    ]);
  }
});

// to handle ecar file open in windows
const checkForOpenFileInWindows = () => {
  if (os.platform() === "win32" && !_.isEmpty(process.argv)) {
    let ecarFiles = _.map(process.argv, file => {
      if (_.endsWith(_.toLower(file), ".ecar")) {
        return file;
      }
    });
    ecarFiles = _.compact(ecarFiles);
    if (!_.isEmpty(ecarFiles)) {
      // open chile window if not opened

      // send ipc message to child window
      const ecarFileWithId = _.map(ecarFiles, file => ({
        filePath: file,
        id: uuid()
      }));
      ipcMain.emit("import-file", ecarFileWithId);
    }
    logger.info(`Got request to open the th ecars : ${ecarFiles}`);
  }
};
checkForOpenFileInWindows();
