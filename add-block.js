import {
  getBlockchain,
  writeBlockchain,
  getTransactions,
  writeTransactions
} from './blockchain-helpers.js';

//stores the current state of the blockchain
const blockchain = getBlockchain();

// gets the last block
const previousBlock = blockchain[blockchain.length - 1];

const transactions = getTransactions();

// creates a newblock and uses a random number as the hash
const newBlock = {
  hash: Math.random().toString(),
  previousHash: previousBlock.hash,
  transactions
};

// adds the newblock to the blockchain
blockchain.push(newBlock);

writeBlockchain(blockchain);

writeTransactions([]);
