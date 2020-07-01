#!/bin/bash

# docker rmi $(docker images -a -q)
docker-compose build 
docker-compose up

