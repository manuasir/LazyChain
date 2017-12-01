const BrewHTTP = require('./lib/brewHTTP');
const BrewNode = require('./lib/brewNode');

const port = 18070+Math.floor(Math.random()*30);
console.log('starting node on ', port)

const http_port = 3000+Math.floor(Math.random()*10);

let httpserver = new BrewHTTP(http_port,new BrewNode(port));

