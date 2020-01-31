#!/bin/bash

#Build 
cd src
npm install
npm run build
tar -czvf src.tar.gz src

