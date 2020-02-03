#!/bin/bash

#Build 
cd src
npm install
npm run build
cd ..
tar -czvf src.tar.gz src

