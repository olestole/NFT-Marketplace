import { ethers } from "ethers";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Web3Modal from "web3modal";
import { FormInput } from "../types/types";

// Create an NFT and then list the following NFT for sale
const createSale = async (url: string, formInput: FormInput) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
  let transaction = await contract.createToken(url);
  let tx = await transaction.wait();

  let event = tx.events[0];
  let value = event.args[2];
  let tokenId = value.toNumber();

  // Turn it into wei
  const price = ethers.utils.parseUnits(formInput.price, "ether");

  contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
  let listingPrice = await contract.getListingPrice();
  listingPrice = listingPrice.toString();

  transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
    value: listingPrice,
  });
  await transaction.wait();
};

export default createSale;
