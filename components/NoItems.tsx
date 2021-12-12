import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

interface Props {
  title?: string;
  callToActionText?: string;
  href?: string;
}

const NoItems: React.FC<Props> = ({
  title = "There are no NFTs here...",
  callToActionText = "Create a NFT",
  href = "/create-item",
}) => {
  return (
    <div className="flex flex-col items-center p-12 bg-white shadow-stripe rounded-lg">
      <FontAwesomeIcon
        icon={faSadTear}
        size="10x"
        fill="none"
        className="mb-4"
      />
      <h3 className="font-light">{title}</h3>
      <Link href={href} passHref>
        <a className="link font-bold underline text-lg">{callToActionText}</a>
      </Link>
    </div>
  );
};

export default NoItems;
