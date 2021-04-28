Write-Host "Removing teatime-database volume and related Docker containers"

docker volume rm teatime-database; docker-compose rm -fv database
