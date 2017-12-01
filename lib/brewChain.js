const Crypto = require('crypto');

class BrewChain{
  constructor() {
    this.chain = [];
    this.currentBlock = {};
    this.genesisBlock = {
      index: 0
      , timestamp: 1511818270000
      , data: 'our genesis data'
      , previousHash: "-1"
      , nonce: 0
    };
  }
  init(){
    this.genesisBlock.hash = createHash(genesisBlock);
    this.chain.push(genesisBlock);
    this.currentBlock = genesisBlock;
  }

  createHash({ timestamp, data, index, previousHash, nonce }) {
    return Crypto.createHash('SHA256').update(timestamp+data+index+previousHash+nonce).digest('hex');
  }

  addToChain(block){
    if(this.checkNewBlockIsValid(block, currentBlock)){
      this.chain.push(block);
      this.currentBlock = block;
      return true;
    }
    return false;
  }

  createBlock(data){
    let newBlock = {
      timestamp: new Date().getTime()
      , data: data
      , index: this.currentBlock.index+1
      , previousHash: this.currentBlock.hash
      , nonce: 0
    };

    newBlock = this.proofOfWork(newBlock);
    return newBlock;
  }

  proofOfWork(block){
    while(true){
      block.hash = this.createHash(block);
      if(block.hash.slice(-3) === "000"){
        return block;
      }else{
        block.nonce++;
      }
    }
  }

  getLatestBlock(){
    return this.currentBlock;
  }

  getTotalBlocks(){
    return this.chain.length;
  }

  getChain(){
    return this.chain;
  }

  replaceChain(newChain){
    this.chain = newChain;
    this.currentBlock = this.chain[chain.length-1];
  }

  checkNewBlockIsValid(block, previousBlock){
    if(this.previousBlock.index + 1 !== this.block.index){
      //Invalid index
      return false;
    }else if (this.previousBlock.hash !== this.block.previousHash){
      //The previous hash is incorrect
      return false;
    }else if(!this.hashIsValid(block)){
      //The hash isn't correct
      return false;
    }

    return true;
  }

  hashIsValid(block){
    return (this.createHash(block) === block.hash);
  }

  checkNewChainIsValid(newChain){
    //Is the first block the genesis block?
    if(this.createHash(newChain[0]) !== this.genesisBlock.hash ){
      return false;
    }

    let previousBlock = newChain[0];
    let blockIndex = 1;

    while(blockIndex < newChain.length){
      let block = newChain[blockIndex];

      if(block.previousHash !== this.createHash(previousBlock)){
        return false;
      }

      if(block.hash.slice(-3) !== "000"){
        return false;
      }

      previousBlock = block;
      blockIndex++;
    }

    return true;
  }
}

module.exports = BrewChain;