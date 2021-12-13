import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  callToActionText?: string;
  href?: string;
  loading?: boolean;
}

const Indicator: React.FC<Props> = ({
  title = "There are no NFTs here...",
  callToActionText = "Create a NFT",
  href = "/create-item",
  loading = false,
}) => {
  return (
    <motion.div
      layout
      className="flex flex-col items-center p-12 bg-white shadow-stripe rounded-lg"
    >
      {loading ? (
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faCompactDisc}
            fill="none"
            className="mb-4"
            size="4x"
            spin
          />
          <h4>Loading...</h4>
        </div>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faSadTear}
            fill="none"
            className="mb-4"
            size="10x"
          />
          <h3 className="font-light">{title}</h3>
          <Link href={href} passHref>
            <a className="link font-bold underline text-lg">
              {callToActionText}
            </a>
          </Link>
        </>
      )}
    </motion.div>
  );
};

export default Indicator;
