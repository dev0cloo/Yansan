import {
  writeTransactions,
  getTransactions,
  getAddressBalance,
} from "./blockchain-helpers.js";
import sha256 from "crypto-js/sha256.js";

// gets transactions from transaction pool
const transactions = getTransactions();

const fromAddress = process.argv[2];
const toAddress = process.argv[3];
const amount = parseInt(process.argv[4]);

const hash = sha256(fromAddress + toAddress + amount).toString();

const newTransaction = { hash, fromAddress, toAddress, amount };

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
