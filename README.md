# Yansan - A Decentralized Blockchain Platform

Yansan is a blockchain platform written in JavaScript, designed to provide hands-on experience with blockchain technology, helping you to understand how it works. With Yansan, you can simulate transactions between users, mine new blocks to the blockchain, reward miners with tokens, and validate the integrity of the blockchain.

## Features

- Uses SHA-256 hash algorithm. (Same as Bitcoin)
- Simulate transactions between users.
- Mine new blocks to the blockchain.
- Reward miners with tokens.
- Check user address balance.
- Validate transactions on the blockchain.
- Validate the integrity of the blockchain.

## Requirements

- Node.js installed.
- Crypto-js installed.

## How to Try It Out

1. Clone Yansan locally from the repository.
2. Install the required dependencies using npm.
3. Initialize or reinitialize the blockchain by running `node init-blockchain.js`.
4. Upon (re)initializing the blockchain, users will have a balance of 0. In order to send tokens to other users, at least 2 new blocks must be mined to acquire miner reward tokens.
5. Mine new blocks by running `node mine-block.js`
6. To add transactions, run `node add-transactions.js Me You 32` where `Me` is the sender's address, `You` is the recipient address, and `32` is the amount being transferred
7. Check a user's address balance by running `node get-address-balance.js <address>`
8. To validate the integrity of the blockchain, run the following command in the terminal:
   `node validate-chain.js`

That's it! You can now start simulating transactions, mining new blocks, and validating the integrity of the Yansan blockchain.

## Data Access

- The mined blocks can be accessed via blockchain.json
- The transactions in the transaction pool can be accessed via transactions.json

## Contribute

Yansan is an open-source project and contributions are welcome. Whether you are a beginner or an experienced developer, you can help make Yansan better by fixing bugs, adding new features, or improving the documentation.

## Conclusion

Yansan provides a great opportunity to learn about blockchain technology and explore its possibilities. Give it a try and see what you can build with it.

## License

Yansan is released under the MIT License. See the [LICENSE](https://github.com/dev0cloo/Yansan/blob/main/LICENSE) file for details.
