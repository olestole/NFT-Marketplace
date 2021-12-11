import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import axios from "axios";
import Image from "next/image";

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
});

const MyAssets = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (nft: any) => {
        const tokenUri = await tokenContract.tokenURI(nft.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(nft.price.toString(), "ether");
        let item = {
          price,
          tokenId: nft.tokenId.toNumber(),
          seller: nft.seller,
          owner: nft.owner,
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

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div className="m-6">
        <h1>You own no assets</h1>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full m-6">
      <div className="flex flex-wrap gap-4">
        {nfts.map((nft, i) => (
          <div
            key={i}
            className="relative rounded-md w-72 bg-gray-800 text-white p-4"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAssets;
