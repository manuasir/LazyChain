class BrewBlock{
  constructor (data){
    this.index = data.index
    this.timestamp = data.timestamp
    this.data = data.data
    this.previousHash = data.previousHash
    this.nonce = data.nonce
  }
}

module.exports = BrewBlock