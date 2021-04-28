#!/bin/bash

docker volume create --name teatime-database && docker-compose up --build
