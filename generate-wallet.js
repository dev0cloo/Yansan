import EC from "elliptic";
import { readFileSync, writeFileSync } from "fs";

// use p192 curve to create keypairs
const ec = new EC.ec("p192");
// generate keypair
const keyPair = ec.genKeyPair();
// generate public key from keypair
const publicKey = keyPair.getPublic("hex");
// generate private key from keypair
const privateKey = keyPair.getPrivate("hex");

// new wallet name defined in terminal; if left empty defaults to undefined
const newWalletName = process.argv[2];

// fetches current wallets stored on blockchain
const walletsFile = readFileSync("./wallets.json");
let wallets = JSON.parse(walletsFile);

// check if wallet name already exists
if (!wallets.hasOwnProperty(newWalletName)) {
  wallets[newWalletName] = publicKey;
  wallets = JSON.stringify(wallets, null, 2);
  writeFileSync("./wallets.json", wallets);
  console.log(`New Wallet named ${newWalletName} created`);
  console.log(`Private Key: ${privateKey}
Public Key: ${publicKey}`);
  console.log(
    "Please make a copy of your private key. You will need it to send transactions."
  );
} else {
  console.log(
    `Wallet name already exists. Please try again with another name.`
  );
  console.log(
    `${newWalletName} exists at public address: ${wallets[newWalletName]}`
  );
}
