const BrewChain = require('./brewChain');
const WebSocket = require('ws');

class BrewNode {
  constructor(port)
  {
    this.brewSockets = [];
    this.brewServer;
    this._port = port
    this.chain = new BrewChain();
    this.REQUEST_CHAIN = "REQUEST_CHAIN";
    this.REQUEST_BLOCK = "REQUEST_BLOCK";
    this.BLOCK = "BLOCK";
    this.CHAIN = "CHAIN";
  }
  init(){
    this.chain.init();
    this.brewServer = new WebSocket.Server({ port: this._port });
    this.brewServer.on('connection', (connection) => {
      console.log('connection in');
      this.initConnection(connection);
    });
  }

  messageHandler(connection){
    connection.on('message', (data) => {
      const msg = JSON.parse(data);
      switch(msg.event){
        case this.REQUEST_CHAIN:
          connection.send(JSON.stringify({ event: this.CHAIN, message: this.chain.getChain()}))
          break;
        case this.REQUEST_BLOCK:
          this.requestLatestBlock(connection);
          break;
        case this.BLOCK:
          this.processedRecievedBlock(msg.message);
          break;
        case this.CHAIN:
          this.processedRecievedChain(msg.message);
          break;

        default:
          console.log('Unknown message ');
      }
    });
  }


  processedRecievedChain(blocks){
    let newChain = blocks.sort((block1, block2) => (block1.index - block2.index))
    if(newChain.length > this.chain.getTotalBlocks() && this.chain.checkNewChainIsValid(newChain)){
      this.chain.replaceChain(newChain);
      console.log('chain replaced');
    }
  }

  processedRecievedBlock (block)  {

    let currentTopBlock = this.chain.getLatestBlock();

    // Is the same or older?
    if(block.index <= currentTopBlock.index){
      console.log('No update needed');
      return;
    }

    //Is claiming to be the next in the chain
    if(block.previousHash === currentTopBlock.hash){
      //Attempt the top block to our chain
      this.chain.addToChain(block);

      console.log('New block added');
      console.log(this.chain.getLatestBlock());
    }else{
      // It is ahead.. we are therefore a few behind, request the whole chain
      console.log('requesting chain');
      this.broadcastMessage(this.REQUEST_CHAIN,"");
    }
  }

  requestLatestBlock (connection)  {
    connection.send(JSON.stringify({ event: this.BLOCK, message: this.chain.getLatestBlock()}))
  }

  broadcastMessage (event, message)  {
    this.brewSockets.forEach(node => node.send(JSON.stringify({ event, message})))
  }

  closeConnection (connection)  {
    console.log('closing connection');
    this.brewSockets.splice(this.brewSockets.indexOf(connection),1);
  }

  initConnection (connection)  {
    console.log('init connection');

    this.messageHandler(connection);

    this.requestLatestBlock(connection);

    this.brewSockets.push(connection);

    connection.on('error', () => this.closeConnection(connection));
    connection.on('close', () => this.closeConnection(connection));
  }

  createBlock (teammember){
    let newBlock = this.chain.createBlock(teammember)
    this.chain.addToChain(newBlock);
    this.broadcastMessage(this.BLOCK, newBlock);
  }

  getStats () {
    return {
      blocks: this.chain.getTotalBlocks()
    }
  }

  addPeer(host, port){
    let connection = new WebSocket(`ws://${host}:${port}`);

    connection.on('error', (error) =>{
      console.log(error);
    });

    connection.on('open', (msg) =>{
      this.initConnection(connection);
    });
  }

}

module.exports = BrewNode;