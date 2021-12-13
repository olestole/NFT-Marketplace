import { useEffect, useState } from "react";
import Indicator from "../components/Indicator";
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
      <div className="flex flex-wrap gap-4">
        {nfts.map((nft, i) => (
          <NftCard nft={nft} owned={true} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MyAssets;
