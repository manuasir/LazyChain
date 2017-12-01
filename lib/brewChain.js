const Crypto = require('crypto');

const BrewChain = function() {
	let chain = [];
	let currentBlock = {};
	let genesisBlock = {};

	function init(){
		genesisBlock = { 
            index: 0
		  , timestamp: 1511818270000
		  , data: 'our genesis data'
		  , previousHash: "-1"
		  , nonce: 0
		};

		genesisBlock.hash = createHash(genesisBlock);
		chain.push(genesisBlock);
		currentBlock = genesisBlock; 
	}

  createHash({ timestamp, data, index, previousHash, nonce }) {
    return Crypto.createHash('SHA256').update(timestamp+data+index+previousHash+nonce).digest('hex');
  }

  addToChain(block){

    if(checkNewBlockIsValid(block, currentBlock)){
      chain.push(block);
      currentBlock = block;
      return true;
    }

    return false;
  }

  createBlock(data){
    let newBlock = {
      timestamp: new Date().getTime()
      , data: data
      , index: currentBlock.index+1
      , previousHash: currentBlock.hash
      , nonce: 0
    };

    newBlock = proofOfWork(newBlock);

    return newBlock;
  }

  proofOfWork(block){

    while(true){
      block.hash = createHash(block);
      if(block.hash.slice(-3) === "000"){
        return block;
      }else{
        block.nonce++;
      }
    }
  }

  getLatestBlock(){
    return currentBlock;
  }

  getTotalBlocks(){
    return chain.length;
  }

  getChain(){
    return chain;
  }

  replaceChain(newChain){
    chain = newChain;
    currentBlock = chain[chain.length-1];
  }

  checkNewBlockIsValid(block, previousBlock){
    if(previousBlock.index + 1 !== block.index){
      //Invalid index
      return false;
    }else if (previousBlock.hash !== block.previousHash){
      //The previous hash is incorrect
      return false;
    }else if(!hashIsValid(block)){
      //The hash isn't correct
      return false;
    }

    return true;
  }

  hashIsValid(block){
    return (createHash(block) == block.hash);
  }

  checkNewChainIsValid(newChain){
    //Is the first block the genesis block?
    if(createHash(newChain[0]) !== genesisBlock.hash ){
      return false;
    }

    let previousBlock = newChain[0];
    let blockIndex = 1;

    while(blockIndex < newChain.length){
      let block = newChain[blockIndex];

      if(block.previousHash !== createHash(previousBlock)){
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