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
// fetches current wallets stored on blockchain
const walletsFile = readFileSync("./wallets.json");
let wallets = JSON.parse(walletsFile);

// new wallet name defined in terminal; if left empty defaults to undefined
const newWalletName = process.argv[2];

// check if wallet name already exists
if (!wallets.hasOwnProperty(newWalletName)) {
  wallets[newWalletName] = publicKey;
  wallets = JSON.stringify(wallets, null, 2);
  writeFileSync("./wallets.json", wallets);
  writeFileSync(
    "./private-keys.txt",
    `
${newWalletName}: ${privateKey}`,
    {
      flag: "a+",
    }
  );
  console.log(`New Wallet named ${newWalletName} created`);
  console.log(`Private Key: ${privateKey}
Public Key: ${publicKey}`);
  console.log(
    `A copy of the private key has been saved to private-keys.txt for easier access. 
You will need the private key to send transactions.`
  );
} else {
  console.log(
    `Wallet name already exists. Please try again with another name.`
  );
  console.log(
    `${newWalletName} exists at public address: ${wallets[newWalletName]}`
  );
}
