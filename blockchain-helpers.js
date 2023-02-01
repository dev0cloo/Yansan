//import node filesystem module
import { writeFileSync } from 'fs';

// records the current state of the blockchain
export function writeBlockchain(blockchain) {
  const blockchainString = JSON.stringify(blockchain, null, 2);
  writeFileSync('./blockchain.json', blockchainString);
}
