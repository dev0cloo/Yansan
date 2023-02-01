import { isValidChain } from './blockchain-helpers.js';

// checks the validity of the blockchain
if (isValidChain()) {
  console.log('Chain is valid');
} else {
  console.log('Chain is not valid');
}
