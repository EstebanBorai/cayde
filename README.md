<div align="center">
  <img src="https://raw.githubusercontent.com/EstebanBorai/whizzes-server/main/assets/logo.png" height="120" width="120" />
  <h1>whizzes-server</h1>
  <h4 align="center">Back-End development for whizzes a social network application inspired on Reddit and Twitter</h4>
</div>

## Index

* [Motivation](#motivation)
* [Architechture](#architecture)
  * [Project Scaffold](#project-scaffold)
* [Development](#development)
  * [Database](#database)
  * [Environment Variables](#environment-variables)
* [Contributing](#contributing)
* [License](#license)

## Motivation

The main goal of this project is to design and develop a social network
application inspired on Twitter and Reddit.

## Architecture

### Project Scaffold

This application is written using the [Loose Coupling](https://en.wikipedia.org/wiki/Loose_coupling)
architechture pattern (also called _system design_).

Each component of the application (_user service_, _post service_) will have
its own models, routes and business logic related files in a single directory.

Reusable logic, such as database connection is exposed at the root level of
the project module tree.

```
.
├── server.ts
├── database.ts
├── service-name-1\
|   ├──index.ts
|   ├──routes.ts
|   └── models.ts
├── service-name-2\
|   ├──index.ts
|   ├──routes.ts
|   └── models.ts
```

## Development

### Database

The database is served through Docker. To run the database execute the
`scripts/docker-run` script.

```bash
./scripts/docker-start
```

This script will create a volume for the database (cupboard-api-volume),
and then will attempt to build the `Dockefile` in the root directory of
the project.

Finally will execute this image exposing it in the localhost on port `5432`.

### Environment Variables

Create a `.env` file on the root directory with the following
environment variables.

A `.env.sample` file is also available with predefined values for simplicity.

| Name                  | Description                      |
| --------------------- | ---------------------------------|
| `PORT`                | HTTP Port for the server         |
| `POSTGRES_USER`       | PostgreSQL connection username   |
| `POSTGRES_PASSWORD`   | PostgreSQL connection password   |
| `POSTGRES_DB`         | PostgreSQL connection database   |

## Contributing

Contributions of any kind are welcome and would be awesome, ideas, bug fixes,
reports, feedback and improvements are always welcome!

## License

Licensed under the MIT License.
