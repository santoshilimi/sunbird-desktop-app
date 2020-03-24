#!/bin/bash

#Build 
cd src
export NODE_OPTIONS=--max_old_space_size=3012
npm install
npm run build
cd client
npm install
npm run offline-prod 
cd ..
npm run build-copy-clean
rm -rf client
rm -rf resourcebundles
cd ..
tar -czvf src.tar.gz src

