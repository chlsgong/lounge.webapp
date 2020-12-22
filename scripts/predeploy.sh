#!/bin/bash

npm run build:prod
sudo rm -rf /var/www/lounge-webapp/build
sudo cp -r ./build /var/www/lounge-webapp/build
