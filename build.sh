#!/bin/bash

#Build 
cd src
npm install
npm run build
export NODE_OPTIONS=--max_old_space_size=4096
npm run offline-prod --prefix ./temp/portal/src/app/client
npm run build-copy-clean
cd ..
tar -czvf src.tar.gz src

