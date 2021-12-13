import React from "react";
import Image from "next/image";
import { NftItem } from "../types/types";

interface Props {
  nft: NftItem;
  owned: boolean;
  buyNft?: (nft: NftItem) => void;
}

const NftCard: React.FC<Props> = ({ nft, buyNft, owned }) => {
  return (
    <div className="relative rounded-md w-72 bg-primary text-white p-4 shadow-stripe">
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

      {!owned && buyNft && (
        <button
          onClick={() => buyNft(nft)}
          className="flex w-full rounded-md px-2 py-1 bg-secondary mt-2 items-center justify-center"
        >
          <Image
            src="https://cryptologos.cc/logos/polygon-matic-logo.png"
            alt=""
            width={16}
            height={16}
          />
          <p className="ml-2 text-white">{nft.price}</p>
        </button>
      )}
    </div>
  );
};

export default NftCard;
