// In renderer process (web page).
var { ipcRenderer } = require("electron");
var fs = require("fs");
var request = require("request");
var _ = require("lodash");
var async = require("async");
var path = require("path");
var completed = [];
var progress = [];
var failed = [];
var progressDiv;
var failedDiv;
var totalImportedCount = 1;
var totalFileCount = 0;
var asyncQueue;
let processedImportPaths = [];

ipcRenderer.on("content:import", (event, content, url) => {
  logging(
    "Requested contents for import through upload window = ",
    `Total contents = ${content.length}, Content object = ${JSON.stringify(
      content
    )}`,
    "INFO"
  );

  let toBeImported = []
  _.forEach(content, data => {
    if (!_.includes(processedImportPaths, data.filePath)) {
      processedImportPaths.push(data.filePath);
      toBeImported.push(data);
    }
  })
  totalFileCount = processedImportPaths.length;
  upload(toBeImported, url);
});

function upload(data, url) {
  if (!asyncQueue) {
    initAsyncQueue(url);
  }

  // Pushing import items to async queue
  asyncQueue.push(data, (err, response) => {
    totalImportedCount++;
    _.remove(progressDiv.items, n => {
      return response.id === n.id;
    });
    if (err === null) {
      logging("Import successful for content through upload window = ", JSON.stringify(response), "INFO");
      // Pushing files to completed array for vue js
      completed.push(response);
    } else {
      // Pushing files to failed array for vue js
      failed.push(response);
      failedDiv.totalFailedCount = failed.length;
      failedDiv.items = failed;
      var x = document.getElementById("close-btn");
      x.style.display = "block";
      logging(
        "Error received for import through upload window = ", `Error = ${JSON.stringify(err)}, response = ${JSON.stringify(response)}`, "ERROR");
    }
  });
}

function initAsyncQueue(url) {
  asyncQueue = async.queue((task, callback) => {
    var filePath = task.filePath;
    var formData = {
      my_file: fs.createReadStream(filePath)
    };
    let size = fs.lstatSync(filePath).size;
    var totalFileSize = bytesToSize(size);
    let filename = path.basename(filePath);
    // Calling import API
    var postData = request.post(
      {
        url: `${url}/api/content/v1/import`,
        formData: formData
      },
      function optionalCallback(err, httpResponse, body) {
        clearInterval(calculateProgress);
        if (err) {
          callback(err, {
            id: task.id,
            filename: filename,
            fileSize: totalFileSize
          });
        } else {
          try {
            body = JSON.parse(body);
            if (body.success === true) {
              callback(null, {
                id: task.id,
                filename: filename,
                fileSize: totalFileSize,
                content: body.content
              });
            } else {
              callback({ err: 'Got error while parsing' }, {
                id: task.id,
                filename: filename,
                fileSize: totalFileSize
              });
            }
          } catch (err) {
            callback(err, {
              id: task.id,
              filename: filename,
              fileSize: totalFileSize
            });
          }
        }
      }
    );

    // Calculating percentage downloaded
    var calculateProgress = setInterval(() => {
      var dispatched = postData.req.connection._bytesDispatched;
      var totalDownloadedFileSize = bytesToSize(dispatched);
      let percent = Math.round((dispatched * 100) / size);
      if (percent >= 100) {
        percent = 100;
      }
      progress.push({
        id: task.id,
        filename: filename,
        percent: percent,
        fileSize: totalFileSize,
        totalDownloadedFileSize: totalDownloadedFileSize
      });
      // Updating downloaded size and percent for progress items
      _.filter(progress, o => {
        if (o.id === task.id) {
          o.totalDownloadedFileSize = totalDownloadedFileSize;
          o.percent = percent;
          return o;
        }
      });
      progress = _.uniqBy(progress, "id");
      // Pushing files to progress array for vue js
      progressDiv.items = progress;
      if (document.getElementById("files-downloaded") !== null) {
        document.getElementById(
          "files-downloaded"
        ).innerHTML = `Copying ${totalImportedCount}/${totalFileCount}`;
      }
    }, 250);
  }, 1);

  asyncQueue.drain = () => {
    progressDiv.items = [];
    var totalCount = completed.length + failed.length;
    logging("All items processed in upload window =", `totalFileCount = ${totalFileCount}, completedCount = ${completed.length}, failedCount = ${failed.length}`, "INFO");
    if (_.isEmpty(failed) && totalCount === totalFileCount) {
      ipcRenderer.send("content:import:completed", {
        totalFileCount: totalFileCount,
        completed: completed
      });
    }
  };
}

/* Init method is called from html file on body onload*/
function init() {
  // Initialising vue js objects
  progressDiv = new Vue({
    el: "#progressDiv",
    data: {
      items: [],
      totalRequestedCount: 0,
      totalImportedCount: 0
    }
  });

  failedDiv = new Vue({
    el: "#failedDiv",
    data: {
      items: [],
      totalFailedCount: 0
    }
  });
}

function logging(message, details, logType) {
  ipcRenderer.send("child:logging", {
    message: message,
    details: details,
    logType: logType
  });
}

function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

function onClose() {
  ipcRenderer.send("content:import:completed", {
    totalFileCount: totalFileCount,
    completed: completed
  });
}

function toggle() {
  var x = document.getElementById("failedListDiv");
  var y = document.getElementById("failedIcon");
  y.classList.toggle("active");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
