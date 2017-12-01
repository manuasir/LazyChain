const express = require('express')
const bodyParser = require('body-parser');

class BrewHTTP{
  constructor(port,node1) {
    this.http_port = port;
    this.firstNode = node1;
    this.app = new express();

    this.app.use(bodyParser.json());
    this.firstNode.init();
    this.app.get('/addNode/:port', (req, res) => {
      console.log('add host: ' + req.params.port)
      node1.addPeer('localhost', req.params.port)

      res.send();
    })

    this.app.get('/spawnBrew/:teammember', (req, res) => {
      let newBlock = node1.createBlock(req.params.teammember);
      console.log('block created');
      res.send();
    })

    this.app.listen(this.http_port, () => {
      console.log(`http server up.. ${this.http_port}`);
    })
  }
}
module.exports = BrewHTTP;