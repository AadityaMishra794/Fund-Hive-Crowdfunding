require("dotenv").config();
const { MNEMONIC } = process.env;
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    sepolia: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic: {
            phrase: MNEMONIC
          },
          providerOrUrl: "https://eth-sepolia.g.alchemy.com/v2/kSXGCjvOPGUasPaZVI1hOfUieS-n4rZ_",
          // Use a single primary URL instead of an array
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/60'/0'/0/"
        });
      },
      network_id: 11155111,
      gas: 8000000,
      maxFeePerGas: 50000000000, // 50 gwei
      maxPriorityFeePerGas: 2000000000, // 2 gwei
      skipDryRun: true,
      timeoutBlocks: 750,
      confirmations: 3,
      networkCheckTimeout: 2000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.21",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};