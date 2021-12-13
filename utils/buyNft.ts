import { ethers } from "ethers";
import { nftaddress, nftmarketaddress } from "../config";
import loadNFTs from "./loadNfts";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Web3Modal from "web3modal";

const buyNft = async (nft: any) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);

  // Need the user to be able to sign and execute a transaction -> Create a signer
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

  const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
    value: price,
  });

  await transaction.wait();
  loadNFTs();
};

export default buyNft;
