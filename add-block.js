import { getBlockchain } from './blockchain-helpers.js';

//
const blockchain = getBlockchain();

console.log(blockchain);
const newBlock = { hash: Math.random().toString() };
