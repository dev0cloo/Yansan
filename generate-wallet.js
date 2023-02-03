import EC from "elliptic";
import { readFileSync, writeFileSync } from "fs";

// use p192 curve to create keypairs
const ec = new EC.ec("p192");
// generate keypair
const keyPair = ec.genKeyPair();
// get public key from keypair
const publicKey = keyPair.getPublic("hex");
// get private key from keypair
const privateKey = keyPair.getPrivate("hex");

// new wallet name defined in terminal; if left empty defaults to undefined
const newWalletName = process.argv[2];

// fetches current wallets stored on blockchain
const walletsFile = readFileSync("./wallets.json");
let wallets = JSON.parse(walletsFile);

// check if wallet name already existss
if (!wallets.hasOwnProperty(newWalletName)) {
  wallets[newWalletName] = publicKey;
  wallets = JSON.stringify(wallets, null, 2);
  writeFileSync("./wallets.json", wallets);
  console.log(`Wallet ${newWalletName} created`);
  console.log(`Public Key: ${publicKey} with Private Key: ${privateKey}`);
} else {
  console.log(`Wallet name already exists. Please use another name.`);
  console.log(
    `${newWalletName} exists at public address: ${wallets[newWalletName]}`
  );
}
