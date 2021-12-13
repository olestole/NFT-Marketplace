import React, { useEffect, useState } from "react";
import NoItems from "../components/NoItems";
import NftCard from "../components/NftCard";
import loadNFTs, { nftStatus } from "../utils/loadNfts";
import { NftItem } from "../types/types";

const CreatorDashboard = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [soldItems, setSoldItems] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    initializeNfts();
  }, []);

  const initializeNfts = async () => {
    const items = await loadNFTs(nftStatus.Created);
    const soldItems = items.filter((item: NftItem) => item.sold);
    setSoldItems(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  };

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <NoItems title="You own no NFTs" />
      </div>
    );
  }

  return (
    <div className="flex m-6">
      <div className="flex flex-col">
        <div className="flex flex-col mb-8">
          <h3>Sold by you</h3>
          <div className="flex flex-wrap gap-4">
            {Boolean(soldItems.length) &&
              soldItems.map((nft, i) => (
                <NftCard nft={nft} owned={false} key={i} />
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h3>Created by you</h3>
          <div className="flex flex-wrap gap-4">
            {nfts.map((nft, i) => (
              <NftCard nft={nft} owned={false} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
