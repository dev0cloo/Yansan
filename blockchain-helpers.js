import { writeFileSync, readFileSync } from 'fs';
import { stringify } from 'querystring';

// modifies the current state of the blockchain
export function writeBlockchain(blockchain) {
  const blockchainString = JSON.stringify(blockchain, null, 2);
  writeFileSync('./blockchain.json', blockchainString);
}

// reads the current state of the blockchain
export function getBlockchain() {
  const blockchainFile = readFileSync('./blockchain.json');
  const blockchain = JSON.parse(blockchainFile);
  return blockchain;
}

// checks validity of the blockchain
export function isValidChain() {
  const blockchain = getBlockchain();

  for (let i = 1; i < blockchain.length; i++) {
    const previousBlock = blockchain[i - 1];
    const { previousHash } = blockchain[i];
    if (previousHash !== previousBlock.hash) {
      return false;
    }
  }
  return true;
}

// records transactions to the transaction pool
export function writeTransactions(transactions) {
  const transactionsString = JSON.stringify(transactions, null, 2);
  writeFileSync('./transactions.json', transactionsString);
}

export function getTransactions() {
  const transactionsFile = readFileSync('./transactions.json');
  const transactions = JSON.parse(transactionsFile);
  return transactions;
}
