# Welcome to structize-api 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Features

- Swagger documentation generator for Fastify https://github.com/fastify/fastify-swagger
- Generates swagger/openapi specification based on jsDoc comments and YAML files. https://github.com/Surnet/swagger-jsdoc
- Mercurius is a GraphQL adapter for Fastify https://mercurius.dev/
- Code-GraphQL Nexus
  Declarative, Code-First GraphQL Schemas for JavaScript/TypeScript https://nexusjs.org
- Log and tracking with [hyperdxio/hyperdx](https://github.com/hyperdxio/hyperdx)
- And some useful plugins as https://github.com/fastify/fastify-env, https://github.com/fastify/fastify-cors, https://github.com/fastify/fastify-helmet

## Install

```sh
pnpm install
```

## Run locally with hot reload

```sh
pnpm run dev
```

## Run locally

```sh
pnpm start
```

## Swagger UI

Open below link on your browser with localhost
http://localhost:3000/documentation

![https://gyazo.com/6cf6c02cb36f9d4fababdde1ad071aba.gif](https://gyazo.com/6cf6c02cb36f9d4fababdde1ad071aba.gif)

## GraphQL Client IDE

Open below link on your browser with localhost
http://localhost:3000/altair

![https://gyazo.com/49e9af06a6a13390abefd5c58a1296f7.png](https://gyazo.com/49e9af06a6a13390abefd5c58a1296f7.png)

## GraphQL

Run below command in your terminal/CLI

```sh
curl -H "Content-Type:application/graphql" -XPOST -d "query { hello }" http://localhost:3000/graphql | jq .
```

Output:

```
{
  "data": {
    "hello": "Hello World!"
  }
}
```

## Run tests

```sh
pnpm test
```

## Pre-commit hooks

This project uses [Pre-commit](https://pre-commit.com/) to enforce code quality. You can install it by running:

```sh
pre-commit install
```

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc.
