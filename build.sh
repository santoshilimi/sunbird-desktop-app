#!/bin/bash

#Build 
cd src
npm install
npm run build
cd temp/portal/src/app/client
node --max_old_space_size=4096 ./node_modules/@angular/cli/bin/ng build --project desktop --prod && mv ../dist/index.html ../dist/index.ejs
cd ../../../../../
npm run build-copy-clean
cd ..
tar -czvf src.tar.gz src

