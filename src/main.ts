import { containerAPI } from 'OpenRAP/dist/api/index';
import { app, BrowserWindow } from 'electron';
import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import { frameworkAPI } from '@project-sunbird/ext-framework-server/api';
import { logger } from '@project-sunbird/ext-framework-server/logger'
import { frameworkConfig } from './framework.config';
import express from 'express';
import portscanner from 'portscanner';
import * as bodyParser from 'body-parser';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any;

const expressApp = express();
expressApp.use(bodyParser.json());


// set the env
const initializeEnv = () => {
  let envs = JSON.parse(fs.readFileSync(path.join(__dirname, 'env.json'), { encoding: 'utf-8' }));
  _.forEach(envs, (value, key) => {
    process.env[key] = value;
  });
  process.env.DATABASE_PATH = path.join(__dirname, 'database');
  if (!fs.existsSync(process.env.DATABASE_PATH)) {
    fs.mkdirSync(process.env.DATABASE_PATH);
  }
}


// get available port from range(9000-9100) and sets it to run th app

const setAvailablePort = async () => {
  let port = await portscanner.findAPortNotInUse(9000, 9100)
  process.env.APPLICATION_PORT = port;
}

// Initialize ext framework
const framework = async () => {

  const subApp = express()
  subApp.use(bodyParser.json({ limit: '100mb' }))
  expressApp.use('/', subApp);
  return new Promise((resolve, reject) => {
    frameworkConfig.db.pouchdb.path = process.env.DATABASE_PATH;
    frameworkAPI
      .bootstrap(frameworkConfig, subApp).then(() => {
        resolve()
      }).catch((error: any) => {
        resolve()
      })
  });
}

// start the APP

const startApp = async () => {
  return new Promise((resolve, reject) => {
    expressApp.listen(process.env.APPLICATION_PORT, (error: any) => {
      if (error) {
        logger.error(error);
        reject(error)
      }
      else {
        logger.info("listening on " + process.env.APPLICATION_PORT);
        resolve()
      }
    })

  })
}


const bootstrapDependencies = async () => {
  initializeEnv()
  await setAvailablePort()
  await framework();
  await containerAPI.bootstrap();
  await startApp();
}

function createWindow() {


  //splash screen
  let splash = new BrowserWindow({ width: 300, height: 300, transparent: true, frame: false, alwaysOnTop: true });
  splash.loadFile(path.join(__dirname, "loading", "index.html"));

  // Create the main window.
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    show: false,
    minWidth: 700,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: false
    }
  });

  // create admin for the database

  bootstrapDependencies().then(() => {
    setTimeout(() => {
      splash.destroy();
      win.loadURL(`http://localhost:${process.env.APPLICATION_PORT}`);
      win.show();
      win.maximize();
      // Open the DevTools.
      // win.webContents.openDevTools();
      win.focus();
    }, 10000)
  }).catch(err => {
    logger.error('unable to start the app ', err);
  })



  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}



let gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // if user open's second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})