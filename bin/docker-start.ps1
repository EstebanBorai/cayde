Write-Host "Setting up cayde-database volume and running docker-compose"

docker volume create --name cayde-database; docker-compose up --build
