// In renderer process (web page).
var { ipcRenderer } = require("electron");
var fs = require("fs");
var request = require("request");
var _ = require("lodash");
var async = require("async");
var completed = [];
var progress = [];
var failed = [];
var progressDiv;
var completedDiv;
var failedDiv;

ipcRenderer.on("import", (event, arg, port) => {
  upload(arg, port);
});

function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

function init() {
  progressDiv = new Vue({
    el: "#progressDiv",
    data: {
      items: []
    }
  });

  completedDiv = new Vue({
    el: "#completedDiv",
    data: {
      items: []
    }
  });

  failedDiv = new Vue({
    el: "#failedDiv",
    data: {
      items: []
    }
  });
}

function upload(data, port) {
  var asyncQueue = async.queue(function(task, callback) {
    var path = task.filePath;
    var formData = {
      my_file: fs.createReadStream(path)
    };

    let size = fs.lstatSync(path).size;
    var totalFileSize = bytesToSize(size);
    let filename = _.reverse(_.split(path, "/"));
    filename = filename[0];

    // Calling import API
    var postData = request.post(
      {
        url: `http://localhost:${port}/api/content/v1/import`,
        formData: formData
      },
      function optionalCallback(err, httpResponse, body) {
        clearInterval(calculateProgress);
        if (err) {
          callback(true, {
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
                fileSize: totalFileSize
              });
            } else {
              callback(true, {
                id: task.id,
                filename: filename,
                fileSize: totalFileSize
              });
            }
          } catch (err) {
            callback(true, {
              id: task.id,
              filename: filename,
              fileSize: totalFileSize
            });
          }
        }
      }
    );

    // Calculating percentage downloaded
    var calculateProgress = setInterval(function() {
      var dispatched = postData.req.connection._bytesDispatched;
      var totalDownloadedFileSize = bytesToSize(dispatched);
      let percent = Math.round((dispatched * 100) / size);
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
    }, 250);
  }, 4);

  // After all files are processed
  asyncQueue.drain = function() {
    console.log("All items have been processed");
    progressDiv.items = [];
    setTimeout(() => {
      ipcRenderer.send("import:completed");
    }, 2000);
  };

  // Pushing import items to async queue
  _.forEach(data, value => {
    asyncQueue.push({ filePath: value.filePath, id: value.id }, function(
      err,
      data
    ) {
      // Removing progress items after import is completed/failed
      _.remove(progressDiv.items, n => {
        return data.id === n.id;
      });

      if (err) {
        // Pushing files to failed array for vue js
        failed.push(data);
        failedDiv.items = failed;
      } else {
        // Pushing files to completed array for vue js
        completed.push(data);
        completedDiv.items = completed;
      }
    });
  });
}
