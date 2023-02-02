import { writeFileSync, readFileSync } from "fs";
import sha256 from "crypto-js/sha256.js";
import { get } from "http";

// modifies the current state of the blockchain
export function writeBlockchain(blockchain) {
  const blockchainString = JSON.stringify(blockchain, null, 2);
  writeFileSync("./blockchain.json", blockchainString);
}

// read the current state of the blockchain
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

    // loop through transactions
    for (let j = 0; j < transactions.length; j++) {
      const { hash, fromAddress, toAddress, amount } = transactions[j];
      const testTransactionHash = sha256(
        fromAddress + toAddress + amount
      ).toString();

      // don't validate rewarded transactions
      if (fromAddress != null) {
        // validate transaction hash
        if (hash !== testTransactionHash) {
          return false;
        }
      }
    }
  }
  return true;
}

// record transactions to transaction pool
export function writeTransactions(transactions) {
  const transactionsString = JSON.stringify(transactions, null, 2);
  writeFileSync("./transactions.json", transactionsString);
}

// get current transactions in the transaction pool
export function getTransactions() {
  const transactionsFile = readFileSync("./transactions.json");
  const transactions = JSON.parse(transactionsFile);
  return transactions;
}

// get the balance of an address
export function getAddressBalance(address) {
  const blockchain = getBlockchain();
  let balance = 0;

  // loop through blocks
  for (let i = 1; i < blockchain.length; i++) {
    const { transactions } = blockchain[i];

    // loop through transactions
    for (let j = 0; j < transactions.length; j++) {
      const { fromAddress, toAddress, amount } = transactions[j];
      // subtract tokens if address is the sender
      if (fromAddress === address) {
        balance -= amount;
      }
      // add tokens if address is the recipient
      if (toAddress === address) {
        balance += amount;
      }
    }
  }
  return balance;
}
