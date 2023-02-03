import { getAddressBalance, getWalletAddress } from "./blockchain-helpers.js";

const name = process.argv[2];
const address = getWalletAddress(name);
const addressBalance = getAddressBalance(address);

console.log(`Account balance of ${name} is: ${addressBalance}`);
