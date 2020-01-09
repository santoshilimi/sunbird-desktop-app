const gulp = require("gulp");
const download = require("download-git-repo");
const exec = require("child_process").exec;
const fs = require("fs-extra");
const NodeGit = require("nodegit");
const path = require("path");

gulp.task("download:portal", cb => {
  download(
    "Sunbird-Ed/SunbirdEd-portal#release-2.7.0",
    "temp/portal",
    cb
  );
});

gulp.task("client:install", cb => {
  exec(
    "npm install  --prefix ./temp/portal/src/app/client",
    { maxBuffer: Infinity },
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
});

gulp.task("offline-client:dist", cb => {
  exec(
    "npm run offline-prod --prefix ./temp/portal/src/app/client ",
    { maxBuffer: Infinity },
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
});

gulp.task("copy:plugins", cb => {
  fs.move(
    "./temp/portal/src/app/sunbird-plugins/",
    "./public/sunbird-plugins/",
    { overwrite: true },
    err => {
      cb(err);
    }
  );
});

gulp.task("copy:portal", cb => {
  fs.move(
    "./temp/portal/src/app/dist/",
    "./public/portal/",
    { overwrite: true },
    err => {
      cb(err);
    }
  );
});

gulp.task("copy:resource:bundles", cb => {
  fs.copy(
    "./temp/portal/src/app/resourcebundles/json",
    "./openrap-sunbirded-plugin/data/resourceBundles",
    cb
  );
});

gulp.task("clean", cb => {
  fs.emptyDir("./temp", cb);
});

gulp.task(
  "default",
  gulp.series(
    "download:portal",
    "client:install",
    "offline-client:dist",
    "copy:portal",
    "copy:plugins",
    "copy:resource:bundles"
  )
);

// TODO: take data from command prompt for now read from env
// gulp.task("read-build-data", cb => {

// });

gulp.task("download:static-data", cb => {
  const cloneURL = `https://${process.env.GITHUB_ACCESS_TOKEN}:x-oauth-basic@github.com/${process.env.GITHUB_PRIVATE_REPO}`;
  const cloneOptions = {
    fetchOpts: {
      callbacks: {
        certificateCheck: () => {
          return 1;
        },
        credentials: () => {
          return NodeGit.Cred.userpassPlaintextNew(token, "x-oauth-basic");
        }
      }
    }
  };
  NodeGit.Clone(cloneURL, path.join("temp", "staticData"), cloneOptions)
    .then(repository => {
      cb();
    })
    .catch(cb);
});

gulp.task("update-static-data", cb => {
  let targetEnv = process.env.TARGET_ENVIRONMENT;

    // copy data folder to plugin folder
    fs.copySync(
      path.join(path.join("temp", "staticData", targetEnv, "plugins")),
      __dirname
    );

    
  let appConfig = JSON.parse(
    fs.readFileSync(
      path.join("temp", "staticData", targetEnv, "appConfig.json"),
      "utf8"
    )
  );

  // update package.json
  let packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  packageJSON.name = appConfig.APP_NAME;
  packageJSON.description = appConfig.APP_NAME;
  packageJSON.build.appId = appConfig.APP_ID;
  packageJSON.homepage = appConfig.APP_BASE_URL;
  packageJSON.author.name = appConfig.AUTHOR.NAME;
  packageJSON.author.email = appConfig.AUTHOR.EMAIL;
  fs.writeFileSync("./package.json", JSON.stringify(packageJSON));
  // update env.json
  let envJSON = JSON.parse(fs.readFileSync("./env.json", "utf8"));
  envJSON.APP_BASE_URL = appConfig.APP_BASE_URL;
  envJSON.CHANNEL = appConfig.CHANNEL;
  envJSON.TELEMETRY_SYNC_INTERVAL_IN_SECS =
    appConfig.TELEMETRY_SYNC_INTERVAL_IN_SECS;
  envJSON.APP_ID = appConfig.APP_ID;
  envJSON.TELEMETRY_PACKET_SIZE = appConfig.TELEMETRY_PACKET_SIZE;
  envJSON.APP_NAME = appConfig.APP_NAME;
  envJSON.MODE = appConfig.MODE;
  envJSON.DEVICE_REGISTRY_URL = appConfig.DEVICE_REGISTRY_URL;
  envJSON.FAQ_BLOB_URL = appConfig.FAQ_BLOB_URL;
  envJSON.CUSTODIAN_ORG = appConfig.CUSTODIAN_ORG;
  envJSON.RELEASE_DATE = Date.now();
  
  let mainJS = fs.readFileSync("./main.js", 'utf8');
  let envString = new Buffer(JSON.stringify(envJSON)).toString('base64')
  mainJS = mainJS.replace('ENV_STRING_TO_REPLACE', envString)
  fs.unlink("./env.json")
  let rootOrgObj = JSON.parse(fs.readFileSync(
    path.join('./openrap-sunbirded-plugin', "data", "organizations", `${envJSON.CHANNEL}.json`),'utf8'));

  mainJS = mainJS.replace('ROOT_ORG_ID', rootOrgObj.result.response.content[0].rootOrgId)
  mainJS = mainJS.replace('HASH_TAG_ID', rootOrgObj.result.response.content[0].hashTagId)
  fs.writeFileSync("./main.js", mainJS);    


  // update logos

  fs.copySync(
    path.join("temp", "staticData", targetEnv, "appLogo.png"),
    "logo.png"
  );

  fs.copySync(
    path.join("temp", "staticData", targetEnv, "logo.png"),
    path.join("public", "portal", "logo.png")
  );

  //copy help videos and pdfs
  fs.mkdirSync(path.join("public", "portal", "assets", "videos"));
  fs.copySync(
    path.join("temp", "staticData", "help", "videos"),
    path.join("public", "portal", "assets", "videos")
  );
  cb();
});

gulp.task("app:dist", cb => {
  exec("npm run  build", { maxBuffer: Infinity }, function(
    err,
    stdout,
    stderr
  ) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task("clean:portal", cb => {
  fs.emptyDir("./public/portal", cb);
});

gulp.task(
  "dist",
  gulp.series(
    "clean", 
    "clean:portal",
    "app:dist",
    "default",
    "download:static-data",
    "update-static-data",
    "clean"
  )
);
