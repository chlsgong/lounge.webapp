#!/bin/bash

REACT_APP_ENV=prod react-scripts build
sudo cp -r ./build /var/www/lounge-webapp/build
