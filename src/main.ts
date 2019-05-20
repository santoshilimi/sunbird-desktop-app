import { containerAPI } from 'OpenRAP/dist/api/index';
import { app, BrowserWindow } from 'electron';
import * as _ from 'lodash';
import { frameworkAPI } from '@project-sunbird/ext-framework-server/api';
import { logger } from '@project-sunbird/ext-framework-server/logger'
import { frameworkConfig } from './framework.config';
import express from 'express';
import * as bodyParser from 'body-parser'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any;

const expressApp = express();
expressApp.use(bodyParser.json());


// Initialize ext framework
const framework = async () => {

  const subApp = express()
  subApp.use(bodyParser.json({ limit: '50mb' }))
  expressApp.use('/', subApp);
  return new Promise((resolve, reject) => {
    frameworkConfig.db.couchdb.url = process.env.COUCHDB_URL
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
  //bootstrap container
  await containerAPI.bootstrap();
  await framework();
  await startApp();

}

function createWindow() {

  // create admin for the database

  bootstrapDependencies().then(() => {
    win.loadURL(`http://localhost:${process.env.APPLICATION_PORT}`);
  }).catch(err => {
    logger.error('unable to start the app ', err);
  })

  // Create the browser window.
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false
    }
  });
  win.maximize();

  // Open the DevTools.
  //win.webContents.openDevTools();

  win.focus();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
