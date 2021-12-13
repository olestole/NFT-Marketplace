import { useEffect, useState } from "react";
import NoItems from "../components/NoItems";
import NftCard from "../components/NftCard";
import loadNFTs, { nftStatus } from "../utils/loadNfts";

const MyAssets = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    initializeNfts();
  }, []);

  const initializeNfts = async () => {
    const items = await loadNFTs(nftStatus.Owned);
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
      <div className="flex flex-wrap gap-4">
        {nfts.map((nft, i) => (
          <NftCard nft={nft} owned={true} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MyAssets;
