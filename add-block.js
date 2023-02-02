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

// gets transactions from transaction pool
const transactions = getTransactions();

// creates a newblock, uses a random number as the hash and adds pending transactions
const newBlock = {
  hash: Math.random().toString(),
  previousHash: previousBlock.hash,
  transactions
};

console.log(`Adding transactions to new block`);

// adds the newblock to the blockchain
blockchain.push(newBlock);

console.log('Adding new block to blockchain');

// mine new block
writeBlockchain(blockchain);

console.log('Resetting Transaction pool');

// resets transaction pool after each new block is mined
writeTransactions([]);
