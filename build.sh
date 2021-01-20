#!/bin/bash
mkdir -p screenshots
rm -rf screenshots/*.png
decktape  --screenshots --screenshots-directory screenshots --screenshots-size 1920x1080 impress file://`pwd`/index.html?showPopover=true hc-spring-batch-cours.pdf
rm hc-spring-batch-cours.pdf
cd screenshots
convert `ls -1v` ../hc-spring-batch-cours.pdf
cd ..