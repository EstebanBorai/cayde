<div align="center">
  <img src="https://camo.githubusercontent.com/734a3468bce992fbc3b729562d41c92f4912c99a/68747470733a2f2f7777772e727573742d6c616e672e6f72672f7374617469632f696d616765732f727573742d6c6f676f2d626c6b2e737667" height="120" width="120" />
  <h1>whizzes-server</h1>
  <h4 align="center">Back-End development for whizzes a social network application inspired on Reddit and Twitter</h4>
</div>

## Motivation

The main goal of this project is to design and develop a social network
application inspired on Twitter and Reddit.

## Architecture

<div align="center">
  <img src="https://raw.githubusercontent.com/easycodex/cupboard-monolith/main/docs/flowchart.png" alt="Flowchart" width="600" />
</div>

## Entities

<div align="center">
  <img src="https://raw.githubusercontent.com/easycodex/cupboard-monolith/main/docs/entities.png" alt="Entities" width="600" />
</div>

## Project Scaffold

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

## Database

The database is served through Docker. To run the database execute the
`scripts/docker-run` script.

```bash
./scripts/docker-run
```

This script will create a volume for the database (cupboard-api-volume),
and then will attempt to build the `Dockefile` in the root directory of
the project.

Finally will execute this image exposing it in the localhost on port 5432.

## Contributing

Contributions of any kind are welcome and would be awesome, ideas, bug fixes,
reports, feedback and improvements are always welcome!

## License

Licensed under the MIT License.
