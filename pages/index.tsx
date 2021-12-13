import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Indicator from "../components/Indicator";
import loadNFTs from "../utils/loadNfts";
import buyNft from "../utils/buyNft";
import NftCard from "../components/NftCard";

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    initializeNFTs();
  }, []);

  const initializeNFTs = async () => {
    const items = await loadNFTs();
    setNfts(items);
    setLoadingState("loaded");
  };

  if (!nfts.length) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Indicator loading={loadingState !== "loaded"} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {nfts.map((nft, i) => (
        <NftCard nft={nft} buyNft={buyNft} owned={false} key={i} />
      ))}
    </div>
  );
};

export default Home;
