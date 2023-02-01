import { writeBlockchain } from './blockchain-helpers.js';

//first block for the blockchain
const genesisBlock = { hash: '0', previousHash: null };

// array of blocks the blockchain has
const blockchain = [genesisBlock];

// create genesis block for the blockchain
writeBlockchain(blockchain);
