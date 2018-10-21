const LazyHTTP = require('./lib/lazyHTTP')
const LazyNode = require('./lib/lazyNode')

const port = process.env.NODE_PORT || 18070 + Math.floor(Math.random() * 30)
console.log('starting node on ', port)

const httpPort = process.env.HTTP_PORT || 3000 + Math.floor(Math.random() * 10)

let httpServer = new LazyHTTP(httpPort, new LazyNode(port))
console.log('created httpServer at port ', httpServer.http_port)
