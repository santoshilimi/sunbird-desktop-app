#!/bin/bash

#Build 
cd src
export NODE_OPTIONS=--max_old_space_size=3012
npm install
npm run build
cd temp/portal/src/app/client
npm run offline-prod 
cd ../../../../../
npm run build-copy-clean
cd ..
tar -czvf src.tar.gz src

