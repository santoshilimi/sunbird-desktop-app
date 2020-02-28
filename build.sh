#!/bin/bash

#Build 
cd src
npm install
npm run build
export LIMIT=12096
npm install -g increase-memory-limit
cd temp/portal/src/app/client
increase-memory-limit
npm run offline-prod 
cd ../../../../../
npm run build-copy-clean
cd ..
tar -czvf src.tar.gz src

