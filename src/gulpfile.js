const gulp = require("gulp");
const download = require("download-git-repo");
const exec = require("child_process").exec;
const fs = require('fs-extra')


gulp.task("download:portal", (cb) => {
    download("Sunbird-Ed/SunbirdEd-portal#release-2.1.0", "temp/portal", function (err) {
        cb(err)
    })
})

gulp.task("client:install", (cb) => {
    exec("npm install  --prefix ./temp/portal/src/app/client", { maxBuffer: Infinity }, function (err, stdout, stderr) {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
});

gulp.task("offline-client:dist", (cb) => {
    exec("npm run build-offline-prod --prefix ./temp/portal/src/app/client ", { maxBuffer: Infinity }, function (err, stdout, stderr) {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
});

gulp.task("copy:plugins", (cb) => {
    fs.move("./temp/portal/src/app/sunbird-plugins/", "./public/sunbird-plugins/", { overwrite: true }, (err) => {
        cb(err)
    })
})

gulp.task("copy:portal", (cb) => {
    fs.move("./temp/portal/src/app/dist/", "./public/portal/", { overwrite: true }, (err) => {
        cb(err)
    })
})

gulp.task("clean", (cb) => {
    fs.emptyDir("./temp", cb)
})

gulp.task("default", gulp.series("download:portal",
    "client:install",
    "offline-client:dist",
    "copy:portal",
    "copy:plugins",
    "clean"));