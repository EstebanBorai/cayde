# cupboard-monolith
Cupboard POC Application for a Monolith in Fastify

## Motivation

Write an REST API implementing the _Monolithic architecture_ with Fastify.

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

Each component of the application (_ingredients service_, _recipes service_ or _user service_) will have
its own models, routes and business logic related files.

Reusable logic, such as database connection is exposed at the first level of the project scaffold.

```
.
├── ingredients
|   ├──index.ts
|   ├──routes.ts
|   └── models.ts
├── recipes
|   ├──index.ts
|   ├──routes.ts
|   └── models.ts
```

## Database

The database is served through Docker. To run the database execute the `scripts/docker-run.sh` script.

```bash
bash ./scripts/docker-run.sh
```

This script will create a volume for the database (cupboard-api-volume), and then will
attempt to build the `Dockefile` in the root directory of the project.

Finally will execute this image exposing it in the localhost on port 5432.
