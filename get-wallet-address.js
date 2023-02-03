import { getWalletAddress } from "./blockchain-helpers.js";

const name = process.argv[2];

const address = getWalletAddress(name);

console.log(`The public address for ${name} is ${address}`);
