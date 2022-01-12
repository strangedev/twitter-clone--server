# twitter-clone--server

A small backend for an example application - a twitter clone.
I use this as an example application to build frontends and test frontend 
technologies.

## Getting started

Install the dependencies:

```shell
npm install
```

Start the database:

```shell
docker-compose up
```

Start the server:

```shell
npm run start
```

The server is now running on port `4000`.

## Executing requests

Take a look at the [Insomnia](https://insomnia.rest/) configuration at [`.
/Insomnia.json`](`.
/Insomnia.json`).

## Inspecting the database

The docker-compose deployment also starts a [mongo-express](https://github.com/mongo-express/mongo-express) instance at [localhost:8001](http://localhost:8001).
