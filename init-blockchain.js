import {
  writeBlockchain,
  writeTransactions,
  defaultWallet,
} from "./blockchain-helpers.js";
import { writeFileSync } from "fs";

//first block for the blockchain
const genesisBlock = { hash: "0", previousHash: null };

// create genesis block for the blockchain
const blockchain = [genesisBlock];

// initialize the blockchain with the genesis block
writeBlockchain(blockchain);

// initialise an empty transaction pool for blockchain
writeTransactions([]);

// clear wallets
writeFileSync("./wallets.json", JSON.stringify({}));

// clear private keys
writeFileSync("./private-keys.txt", "");

console.log("Yansan Blockchain initialised.");

// create default wallet
defaultWallet();
