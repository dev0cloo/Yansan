import {
  writeTransactions,
  getTransactions,
  getAddressBalance,
  getWalletAddress,
} from "./blockchain-helpers.js";
import sha256 from "crypto-js/sha256.js";
import EC from "elliptic";

const ec = new EC.ec("p192");

// input Private Key for wallet sending transaction as first argument in the terminal
const fromPrivateKey = process.argv[2];
// get transactions from transaction pool
const transactions = getTransactions();
// generate keypair from Private Key
const fromKeyPair = ec.keyFromPrivate(fromPrivateKey, "hex");
// get public key from keypair
const fromAddress = fromKeyPair.getPublic("hex");
// input name of the wallet receiving transaction as second argument
const toName = process.argv[3];
const toAddress = getWalletAddress(toName);
const amount = parseInt(process.argv[4]);

const hash = sha256(fromAddress + toAddress + amount).toString();

// use derived public key to sign transaction hash
const signature = fromKeyPair.sign(hash).toDER("hex");

// create new transaction
const newTransaction = {
  hash,
  fromAddress,
  toAddress,
  amount,
  signature,
};

// get wallet balance of sender address
const addressBalance = getAddressBalance(fromAddress);

// check if address has enough balance
if (addressBalance >= amount) {
  transactions.push(newTransaction);

  // add transactions to the transaction pool
  writeTransactions(transactions);
  console.log("Transaction added to transaction pool");
  console.log(
    "You need to mine a new block to include transactions into the blockchain"
  );
} else {
  console.log("Insufficient funds in your wallet.");
}
