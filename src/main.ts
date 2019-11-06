import { containerAPI } from "OpenRAP/dist/api/index";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as _ from "lodash";
import * as path from "path";
import * as fs from "fs";
import * as fse from "fs-extra";
import { frameworkAPI } from "@project-sunbird/ext-framework-server/api";
import { EventManager } from "@project-sunbird/ext-framework-server/managers/EventManager";
import { logger } from "@project-sunbird/ext-framework-server/logger";
import { frameworkConfig } from "./framework.config";
import express from "express";
import portscanner from "portscanner";
import * as bodyParser from "body-parser";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HTTPService } from "@project-sunbird/ext-framework-server/services";
import * as os from "os";
const { URL } = require("url");
const uuid = require("uuid/v4");
let envs = {};
const windowIcon = path.join(__dirname, "build", "icons", "png", "512x512.png");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any;
let child: any;
let openFileContents = [];
let appBaseUrl;
let isAppBootstrapped = false;

const expressApp = express();
expressApp.use(bodyParser.json());
let fileSDK = containerAPI.getFileSDKInstance('');

const reloadUiOnFileChange = () => {
  const subject = new Subject<any>();
  subject.pipe(debounceTime(2500)).subscribe(data => {
    let currentURL = win.webContents.getURL();
    console.log('portal file changed- reloading screen with current url', currentURL);
    fs.rename(path.join('public', 'portal','index.html'), path.join('public', 'portal','index.ejs'), (err) => {
      if ( err ) console.log('ERROR: ' + err);
        win.loadURL('http://localhost:9000/' || currentURL);
    });
  });
  fileSDK.watch([path.join('public', 'portal')])
  .on('add', path => subject.next(path))
  .on('change', path => subject.next(path))
  .on('unlink', path => subject.next(path));
}
if (!app.isPackaged) {
  reloadUiOnFileChange();
}
expressApp.use('/dialog/content/import', (req, res) => {
  res.send({ message: 'SUCCUSS', responseCode: 'OK'});
  importContent();
});

const importContent = () => {
  const path = dialog.showOpenDialog({ 
    properties: ['openFile', 'multiSelections'], 
    filters: [{ name: 'Custom File Type', extensions: ['ecar'] }] 
  });
  if(path){
    makeImportApiCall(path);
  }
}

const getFilesPath = () => {
  if (_.startsWith(_.toLower(envs["APP_ID"]), "local")) {
    return __dirname;
  } else {
    return path.join(app.getPath("userData"), "." + envs["APP_NAME"]);
  }
};

// set the env
const initializeEnv = () => {
  envs = JSON.parse(
    fs.readFileSync(path.join(__dirname, "env.json"), { encoding: "utf-8" })
  );
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
  if (!_.startsWith(_.toLower(envs["APP_ID"]), "local")) {
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

// this will check whether all the plugins are initialized using event from each plugin which should emit '<pluginId>:initialized' event

const checkPluginsInitialized = () => {
  //TODO: for now we are checking one plugin need to change once plugin count increases
  return new Promise(resolve => {
    EventManager.subscribe("openrap-sunbirded-plugin:initialized", () => {
      resolve();
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
  await checkPluginsInitialized();

  //to handle the unexpected navigation to unknown route

  expressApp.all("*", (req, res) => res.redirect("/"));
};

function createWindow() {
  //splash screen
  let splash = new BrowserWindow({
    width: 300,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: windowIcon
  });


  splash.once('show', () => {
      // Create the main window.
      win = new BrowserWindow({
        titleBarStyle: "hidden",
        show: false,
        minWidth: 700,
        minHeight: 500,
        webPreferences: {
          nodeIntegration: false
        },
        icon: windowIcon
      });

      win.webContents.once('dom-ready', () => {
        splash.destroy();
        win.show();
        win.maximize();
        });

        // create admin for the database
        bootstrapDependencies()
        .then(() => {
            appBaseUrl = `http://localhost:${process.env.APPLICATION_PORT}`;
            win.loadURL(appBaseUrl);
            win.focus();
            // Open the DevTools.
            // win.webContents.openDevTools();
            isAppBootstrapped = true;
            checkForOpenFileInWindows();
            if (openFileContents.length > 0) {
              makeImportApiCall(openFileContents);
            }
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
  });
  splash.loadFile(path.join(__dirname, "loading", "index.html"));
  splash.show();
}

let gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    logger.info(
      `trying to open second-instance of the app ${JSON.stringify(commandLine)}`
    );
    // if the OS is windows file open call will come here when app is already open
    checkForOpenFileInWindows(commandLine);
    if (openFileContents.length > 0 && (child || isAppBootstrapped)) {
      makeImportApiCall(openFileContents);
    }
    // if user open's second instance, we should focus our window
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
  logger.info(`trying to open content with path ${path}`);
  if (_.endsWith(_.toLower(path), ".ecar")) {
    //open child window if not opened

    //send the message to import the file
    openFileContents.push(path);
    // when the app already open and we are trying to open content
    if (child || isAppBootstrapped) {
      makeImportApiCall(openFileContents);
    }
  }
});

const makeImportApiCall = async (contents: Array<string>) => {
  await HTTPService.post(`${appBaseUrl}/api/content/v1/import`, contents).toPromise()
  .then(data => logger.info('Content import started successfully', contents))
  .catch(error => logger.error('Content import failed with', error, 'for contents', contents));
};

// to handle ecar file open in windows
const checkForOpenFileInWindows = (files?: string[]) => {
  let contents = files || process.argv;
  if (
    (os.platform() === "win32" || os.platform() === "linux") &&
    !_.isEmpty(contents)
  ) {
    _.forEach(contents, file => {
      if (_.endsWith(_.toLower(file), ".ecar")) {
        openFileContents.push(file);
      }
    });
    logger.info(
      `Got request to open the  ecars : ${JSON.stringify(openFileContents)}`
    );
  }
};


