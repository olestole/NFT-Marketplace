import React, { useEffect, useState } from "react";
import Indicator from "../components/Indicator";
import NftCard from "../components/NftCard";
import loadNFTs, { nftStatus } from "../utils/loadNfts";
import { NftItem } from "../types/types";
import Link from "next/link";

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

  if (!nfts.length) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Indicator
          title="You own no NFTs"
          loading={loadingState !== "loaded"}
        />
      </div>
    );
  }

  return (
    <div className="flex m-6">
      <div className="flex flex-col">
        <div className="flex flex-col mb-8">
          <h4 className="font-light">Sold by you</h4>
          <div className="flex flex-wrap gap-4">
            {Boolean(soldItems.length) ? (
              soldItems.map((nft, i) => (
                <NftCard nft={nft} owned={false} key={i} />
              ))
            ) : (
              <p className="font-bold">
                You have not sold any NFTs yet -{" "}
                <Link href="/create-item" passHref>
                  <a className="link underline">
                    Test your luck with a new NFT
                  </a>
                </Link>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-light">Created by you</h4>
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
