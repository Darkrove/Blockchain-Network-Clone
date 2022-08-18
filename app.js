const { Block, Blockchain } =  require("./network");

const myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(Date.now().toString(), { amount: 10, from: 'Alice', to: 'Bob' }));
myBlockchain.addBlock(new Block(Date.now().toString(), { amount: 40, from: 'Bob', to: 'Eve' }));
myBlockchain.addBlock(new Block(Date.now().toString(), { amount: 20, from: 'Eve', to: 'Steve' }));
// change the data of the latest block
// myBlockchain.chain[1].data = ["Hey, I'm again a new block!"];

// check if the blockchain is valid
// console.log(myBlockchain.isValid());

console.log(myBlockchain.chain);