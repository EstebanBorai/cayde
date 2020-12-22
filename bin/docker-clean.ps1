Write-Host "Removing whizzes-database volume and related Docker containers"

docker volume rm whizzes-database; docker-compose rm -fv database
