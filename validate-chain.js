import { isValidChain, getBlockchain } from "./blockchain-helpers.js";

// get current blockchain state
const blockchain = getBlockchain();

// validate the blockchain
if (!isValidChain()) {
  console.log("Yansan Chain is invalid");
} else {
  console.log(`Yansan Chain is valid.
The blockchain has ${blockchain.length} blocks.
The last block hash is ${blockchain[blockchain.length - 1].hash}`);
}
