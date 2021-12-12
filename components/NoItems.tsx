import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const NoItems = () => {
  return (
    <div className="flex flex-col items-center p-12 bg-white shadow-stripe rounded-lg">
      <FontAwesomeIcon icon={faSadTear} size="10x" fill="none" className="mb-4"/>
      <h3 className="font-light">There are no NFTs here...</h3>
      <Link href="/create-item" passHref>
        <a className="font-bold underline text-lg">Create a NFT</a>
      </Link>
    </div>
  );
};

export default NoItems;
