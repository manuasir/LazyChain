/**
 * Class LazyBlock: encapsulates a block that will be inserted into the blockchain
 */
class LazyBlock {
  constructor (data) {
    this.index = data.index
    this.timestamp = data.timestamp
    this.data = data.data
    this.previousHash = data.previousHash
    this.nonce = data.nonce
  }
}

module.exports = LazyBlock
