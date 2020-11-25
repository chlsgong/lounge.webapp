#!/bin/bash

if [ "$1" -eq "-r" ]
  then
    sudo systemctl reload nginx
    exit
fi
sudo systemctl start nginx
exit
