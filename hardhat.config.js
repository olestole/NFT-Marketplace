require("@nomiclabs/hardhat-waffle");

// Use dotenv to load the .env-variables into process.env
require('dotenv').config({ path: '.env.local' })


// Remember to load the env-variables before running the test-script
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
  },
  solidity: "0.8.4",
};
