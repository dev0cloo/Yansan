import { writeFileSync, readFileSync } from "fs";
import sha256 from "crypto-js/sha256.js";
import EC from "elliptic";

const ec = new EC.ec("p192");

// modify the current state of the blockchain
export function writeBlockchain(blockchain) {
  const blockchainString = JSON.stringify(blockchain, null, 2);
  writeFileSync("./blockchain.json", blockchainString);
}

// read the current state of the blockchain
export function getBlockchain() {
  const blockchainFile = readFileSync("./blockchain.json");
  const blockchain = JSON.parse(blockchainFile);
  return blockchain;
}

// check validity of the blockchain
export function isValidChain() {
  const blockchain = getBlockchain();

  // loop through blocks
  for (let i = 1; i < blockchain.length; i++) {
    const previousBlock = blockchain[i - 1];
    const { nonce, hash, transactions, previousHash } = blockchain[i];

    // validate previous block hash
    if (previousHash !== previousBlock.hash) {
      return false;
    }

    // validate current block hash
    const testBlockHash = sha256(
      nonce + previousBlock.hash + JSON.stringify(transactions)
    ).toString();
    if (hash !== testBlockHash) {
      return false;
    }

    // loop through transactions
    for (let j = 0; j < transactions.length; j++) {
      const { hash, fromAddress, toAddress, amount, signature } =
        transactions[j];
      const testTransactionHash = sha256(
        fromAddress + toAddress + amount
      ).toString();

      // don't validate rewarded transactions
      if (fromAddress !== null) {
        // validate transaction hash
        if (hash !== testTransactionHash) {
          return false;
        }
        // validate transaction signature
        const publicKeyPair = ec.keyFromPublic(fromAddress, "hex");
        const verifiedSignature = publicKeyPair.verify(hash, signature);
        if (!verifiedSignature) {
          return false;
        }
      }
    }
  }
  return true;
}

// record transactions to transaction pool
export function writeTransactions(transactions) {
  const transactionsString = JSON.stringify(transactions, null, 2);
  writeFileSync("./transactions.json", transactionsString);
}

// get current transactions in the transaction pool
export function getTransactions() {
  const transactionsFile = readFileSync("./transactions.json");
  const transactions = JSON.parse(transactionsFile);
  return transactions;
}

// get the balance of an address
export function getAddressBalance(address) {
  const blockchain = getBlockchain();
  let balance = 0;

  // loop through blocks
  for (let i = 1; i < blockchain.length; i++) {
    const { transactions } = blockchain[i];

    // loop through transactions
    for (let j = 0; j < transactions.length; j++) {
      const { fromAddress, toAddress, amount } = transactions[j];
      // subtract tokens if address is the sender
      if (fromAddress === address) {
        balance -= amount;
      }
      // add tokens if address is the recipient
      if (toAddress === address) {
        balance += amount;
      }
    }
  }
  return balance;
}

// get wallet address from wallet name
export function getWalletAddress(name) {
  const walletsFile = readFileSync("./wallets.json");
  const wallets = JSON.parse(walletsFile);
  return wallets[name];
}

// create default wallet on blockchain initialization
export function defaultWallet() {
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

  wallets["Me"] = publicKey;
  wallets = JSON.stringify(wallets);
  writeFileSync("./wallets.json", wallets);
  writeFileSync(
    "./private-keys.txt",
    `
    Me: ${privateKey}`
  );
  console.log(`Default Wallet named Me created`);
  console.log(`Private Key: ${privateKey}
Public Key: ${publicKey}`);
  console.log(
    `A copy of the private key has been saved to private-keys.txt for easier access. 
You will need the private key to send transactions.`
  );
}
