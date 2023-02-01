import { getBlockchain, writeBlockchain } from './blockchain-helpers.js';

//stores the current state of the blockchain
const blockchain = getBlockchain();

// gets the last block
const previousBlock = blockchain[blockchain.length - 1];

// creates a newblock and uses a random number as the hash
const newBlock = {
  hash: Math.random().toString(),
  previousHash: previousBlock.hash,
  data: {
    fromAddress: process.argv[2],
    toAddress: process.argv[3],
    amount: parseInt(process.argv[4])
  }
};

// adds the newblock to the blockchain
blockchain.push(newBlock);

writeBlockchain(blockchain);
