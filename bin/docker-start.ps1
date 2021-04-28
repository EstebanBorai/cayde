Write-Host "Setting up teatime-database volume and running docker-compose"

docker volume create --name teatime-database; docker-compose up --build
