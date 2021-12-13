# NFT Marketplace

A marketplace for NFTs. The contracts are deployed to the Mumbai Testnet. 

- [Test the dApp](https://nft-marketplace-qo2nfhxgh-oleastole.vercel.app/)
- [Get test funds [MATIC]](https://faucet.polygon.technology/)

![Screenshot of dApp](/assets/ReadmeScreenshot.png?raw=true)

## Getting Started

### Prerequisites

- Run a browser with a MetaMask-wallet
  - You need a wallet to connect to a Web3 application (dApp)

### Installation

```bash
$ npm i
```

---

**To run the project locally:**
Create a `.env.local`-file and add the following keys:

**NB: Don't use your primary MetaMask wallet when testing locally. Create a new test wallet**

- PROJECT_ID=_< INFURA PROJECT ID >_
- METAMASK_PRIVATE_KEY=_< METAMASK TEST-WALLET PRIVATE KEY >_

## Usage



**Run the project locally with the following commands:**

```bash
$ npx hardhat node
$ npx scripts/deploy.js --network localhost
$ npm run dev
```

By running the node locally you'll be provided with multiple test-accounts with funds that can be used to test the dApp. Import the account to MetaMask and use the imported account to interact with the dApp.

Assuming you have a MetaMask wallet in your browser, you should be able to interact with the dApp.
