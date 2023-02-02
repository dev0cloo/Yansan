import { writeFileSync, readFileSync } from "fs";
import sha256 from "crypto-js/sha256.js";

// modifies the current state of the blockchain
export function writeBlockchain(blockchain) {
  const blockchainString = JSON.stringify(blockchain, null, 2);
  writeFileSync("./blockchain.json", blockchainString);
}

// reads the current state of the blockchain
export function getBlockchain() {
  const blockchainFile = readFileSync("./blockchain.json");
  const blockchain = JSON.parse(blockchainFile);
  return blockchain;
}

// check validity of the blockchain
export function isValidChain() {
  const blockchain = getBlockchain();

  // loop through blocks
  for (let i = 1; i < blockchain.length; i++) {
    const previousBlock = blockchain[i - 1];
    const { nonce, hash, transactions, previousHash } = blockchain[i];

    // validate previous block hash
    if (previousHash !== previousBlock.hash) {
      return false;
    }

    // validate current block hash
    const testBlockHash = sha256(
      nonce + previousBlock.hash + JSON.stringify(transactions)
    ).toString();
    if (hash !== testBlockHash) {
      return false;
    }
  }
  return true;
}

// records transactions to the transaction pool
export function writeTransactions(transactions) {
  const transactionsString = JSON.stringify(transactions, null, 2);
  writeFileSync("./transactions.json", transactionsString);
}

// gets the current transactions in the transaction pool
export function getTransactions() {
  const transactionsFile = readFileSync("./transactions.json");
  const transactions = JSON.parse(transactionsFile);
  return transactions;
}
