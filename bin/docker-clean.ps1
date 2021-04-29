Write-Host "Removing cayde-database volume and related Docker containers"

docker volume rm cayde-database; docker-compose rm -fv database
