[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

# LazyChain
NodeJS Blockchain implementation - Protecting the tea making ledger from unscrupulous colleagues  

This is a rough working example, contains a LazyNode, a LazyChain and an HTTP server

## How to get start

### Docker
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
