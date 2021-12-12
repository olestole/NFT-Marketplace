import type { NextPage } from "next";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import axios from "axios";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Web3Modal from "web3modal";
import Image from "next/image";
import NoItems from "../components/NoItems";

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");

        // TODO: Type these items
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  };

  const buyNft = async (nft: any) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    // Need the user to be able to sign and execute a transaction -> Create a signer
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      { value: price }
    );

    await transaction.wait();
    loadNFTs();
  };

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <NoItems />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full mx-auto">
      <div className="flex flex-wrap gap-4">
        {nfts.map((nft, i) => (
          <div
            key={i}
            className="relative rounded-md w-72 bg-[#009DAE] text-white p-4"
          >
            <Image
              src={nft.image}
              alt=""
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
            <div className="pt-4">
              <h4 className="font-bold">{nft.name}</h4>
              <p>{nft.description}</p>
            </div>
            <div className="flex flex-row justify-between items-center mt-2">
              <p>{nft.price}</p>
              <button
                onClick={() => buyNft(nft)}
                className="rounded-md px-2 py-1 bg-white text-gray-800"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
