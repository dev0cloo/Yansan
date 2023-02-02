import sha256 from "crypto-js/sha256.js";
import {
  getBlockchain,
  writeBlockchain,
  getTransactions,
  writeTransactions,
} from "./blockchain-helpers.js";

//store the current state of the blockchain
const blockchain = getBlockchain();

// get the last block
const previousBlock = blockchain[blockchain.length - 1];

// get transactions from transaction pool
const transactions = getTransactions();

let nonce = 0;

// create a unique hash
let hash = sha256(
  nonce + previousBlock.hash + JSON.stringify(transactions)
).toString();

// set difficulty of the mining algorithm
const difficulty = 2;

// loop until hash satisfies condition (i.e. the hash begins with 2 zeros)
while (!hash.startsWith("0".repeat(difficulty))) {
  nonce++;
  hash = sha256(
    nonce + previousBlock.hash + JSON.stringify(transactions)
  ).toString();
}

// create a new block
const newBlock = {
  nonce,
  hash,
  previousHash: previousBlock.hash,
  transactions,
};

console.log(`Adding transactions to new block`);

// add the new block to the blockchain
blockchain.push(newBlock);

// mine new block
writeBlockchain(blockchain);
console.log("mining new block to blockchain");

// reward miner after each new block is mined
const fromAddress = null;
const toAddress = "Me";
const amount = 50;
const rewardTransaction = { fromAddress, toAddress, amount };
writeTransactions([rewardTransaction]);
console.log("Rewarding Miner and Resetting Transaction pool");
