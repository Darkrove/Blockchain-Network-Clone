const crypto = require("crypto")

// Arrow fnction
SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

// Code for the Block class
class Block {
    constructor(timestamp = "", data = []) {
        // Block properties
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = ""; // previous block's hash
        this.nonce = 0;
    }

    // Our hash function.
    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    // Mine the block
    mine(difficulty) {
        // Basically, it loops until our hash starts with 
        // the string 0...000 with length of <difficulty>.
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            // We increases our nonce so that we can get a whole different hash.
            this.nonce++;
            // Update our new hash with the new nonce value.
            this.hash = this.getHash();
        }
    }
    
}

// Code for the Blockchain class
class Blockchain {
    constructor() {
        // Create our genesis block
        this.chain = [new Block(Date.now().toString(),{ message: "Genesis block" })];
        this.difficulty = 1;
        this.blockTime = 30000;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        // Since we are adding a new block, prevHash will be the hash of the old latest block
        block.prevHash = this.getLastBlock().hash;
        // Since now prevHash has a value, we must reset the block's hash
        block.hash = block.getHash();

        block.mine(this.difficulty);
        // Object.freeze ensures immutability in our code
        this.chain.push(Object.freeze(block));

        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }

    isValid(blockchain = this) {
        // Iterate over the chain, we need to set i to 1 because there are nothing before the genesis block, so we start at the second block.
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            // Check validation
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }

}

module.exports = { Block, Blockchain };