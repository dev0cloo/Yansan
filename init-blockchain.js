import { writeBlockchain, writeTransactions } from "./blockchain-helpers.js";

//first block for the blockchain
const genesisBlock = { hash: "0", previousHash: null };

// create genesis block for the blockchain
const blockchain = [genesisBlock];

// initialize the blockchain with the genesis block
writeBlockchain(blockchain);

// initialise an empty transaction pool for blockchain
writeTransactions([]);
