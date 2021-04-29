#!/bin/bash

docker volume create --name cayde-database && docker-compose up --build
