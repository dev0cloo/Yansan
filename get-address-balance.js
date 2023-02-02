import { getAddressBalance } from "./blockchain-helpers.js";

const address = process.argv[2];
const addressBalance = getAddressBalance(address);

console.log(`Account balance of ${address} is: ${addressBalance}`);
