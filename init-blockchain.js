import { writeBlockchain } from './blockchain-helpers.js';

// create genesis block for the blockchain
const genesisBlock = { hash: '0', previousHash: null };

// array of blocks the blockchain has
const blockchain = [genesisBlock];

writeBlockchain(blockchain);
