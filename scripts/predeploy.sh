#!/bin/bash

npm run build:prod
sudo cp -r ./build /var/www/lounge-webapp/build
