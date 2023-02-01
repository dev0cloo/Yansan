import { writeTransactions, getTransactions } from './blockchain-helpers.js';

// gets transactions from transaction pool
const transactions = getTransactions();

const fromAddress = process.argv[2];
const toAddress = process.argv[3];
const amount = parseInt(process.argv[4]);

const newTransaction = { fromAddress, toAddress, amount };

transactions.push(newTransaction);

// adds transactions to the transaction pool
writeTransactions(transactions);
