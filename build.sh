#!/bin/bash

#Build 
cd src
npm install
npm run build
export LIMIT=4096
npm install -g increase-memory-limit
increase-memory-limit
npm run offline-prod --prefix ./temp/portal/src/app/client
npm run build-copy-clean
cd ..
tar -czvf src.tar.gz src

