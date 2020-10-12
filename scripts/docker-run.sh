#!bin/bash
docker volume create --name cupboard-api-volume

docker-compose up --build
