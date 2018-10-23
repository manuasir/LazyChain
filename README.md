[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

# LazyChain

NodeJS Blockchain implementation - Protecting the tea making ledger from unscrupulous colleagues  

This is a rough working example, contains a LazyNode, a LazyChain and an HTTP server

<!-- TOC -->

- [LazyChain](#lazychain)
  - [How to get start](#how-to-get-start)
    - [Docker](#docker)
  - [APIs](#apis)
    - [HTTP Server](#http-server)
      - [Add Node](#add-node)
      - [Create Block](#create-block)
    - [Postman](#postman)

<!-- /TOC -->

## How to get start

### Docker

To install Docker, visit [Docker Official Sites](https://www.docker.com/products/docker-desktop).

To build the container

```js
docker build -t lazychain:latest .
```

To run the container

```sh
docker run -t -p <LOCAL_PORT>:3000 -p <LOCAL_PORT>:17080 lazychain:latest

# e.g.
docker run -t -p 3001:3000 -p 17080:17080 lazychain:latest
# you can access the http server via 127.0.0.1:3001 and blockchain node via 127.0.0.1:17080
```

To list running container

```js
docker ps
```

To stop a container

```js
docker stop <CONTAINER_ID>
```

## APIs

### HTTP Server

#### Add Node

```js
{{domain}}:{{http_port}}/addNode/{{node_port}}
```

This API is to add a node into the blockchain network.

**Cases**

1. Status 200: init connection
2. Status 200: ECONNREFUSED

**P.S.** Currently, the system will show any messages in the debug console instead of HTTP response.

#### Create Block

```js
{{domain}}:{{http_port}}/spawnLazy/{{message}}
```

This API is to create a block inside the blockchain with the message specified.

**Cases**

1. Status 200

### Postman
You can get the postman [collection](docs/LazyChain.postman_collection.json) and [environment](docs/LazyChain_Sample.postman_environment.json) files from [docs](docs/).