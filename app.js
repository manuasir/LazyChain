const LazyHTTP = require('./lib/lazyHTTP')
const LazyNode = require('./lib/lazyNode')

const port = 18070 + Math.floor(Math.random() * 30)
console.log('starting node on ', port)

const httpPort = 3000 + Math.floor(Math.random() * 10)

let httpServer = new LazyHTTP(httpPort, new LazyNode(port))
console.log('created httpServer at port ', httpServer.http_port)
