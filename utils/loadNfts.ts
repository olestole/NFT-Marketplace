import axios from "axios";
import { ethers } from "ethers";
import { nftaddress, nftmarketaddress, RPClink } from "../config";
import { NftItem } from "../types/types";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Web3Modal from "web3modal";

export enum nftStatus {
  "All",
  "Owned",
  "Created",
}

const loadNFTs = async (
  loadType: nftStatus = nftStatus.All
): Promise<NftItem[]> => {
  let provider;
  let signer;

  if (loadType === nftStatus.Owned || loadType === nftStatus.Created) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(connection);
    signer =
      loadType === nftStatus.Owned || loadType === nftStatus.Created
        ? provider.getSigner()
        : undefined;
  } else {
    provider = new ethers.providers.JsonRpcProvider(RPClink);
  }

  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    Market.abi,
    loadType === nftStatus.Owned || loadType === nftStatus.Created
      ? signer
      : provider
  );

  let data;
  switch (loadType) {
    case nftStatus.All:
      data = await marketContract.fetchMarketItems();
      break;
    case nftStatus.Owned:
      data = await marketContract.fetchMyNFTs();
      break;
    case nftStatus.Created:
      data = await marketContract.fetchItemsCreated();
      break;
    default:
      data = [];
  }

  const items = await Promise.all(
    data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item: NftItem = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        sold: i.sold,
      };
      return item;
    })
  );

  return items;
};

export default loadNFTs;
