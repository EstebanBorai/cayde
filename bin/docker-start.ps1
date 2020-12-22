Write-Host "Setting up whizzes-database volume and running docker-compose"

docker volume create --name whizzes-database; docker-compose up --build
