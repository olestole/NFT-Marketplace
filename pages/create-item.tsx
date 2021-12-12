import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
});

const CreateItem = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const router = useRouter();

  const onChange = async (e: any) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog: any) => console.log(`received: ${prog}`),
      });
      console.log(added);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  const createItem = async () => {
    const { name, description, price } = formInput;
    // Don't want to allow listing without any of these
    if (!name || !description || !price) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log(`Error uploading file: ${error}`);
    }
  };

  // Create an NFT and then list the following NFT for sale
  const createSale = async (url: string) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    // Turn it into wei
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();

    // Reroute the user
    router.push("/");
  };

  // Implement so that you don't upload before you have toe
  const preview = () => {};

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12 space-y-2">
        <input
          placeholder="Asset Name"
          className="border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          name="Description"
          placeholder="Asset Description"
          className="border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in Matic"
          className="border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <div className="flex items-center max-h-72">
          <label
            className="p-4 bg-white rounded hover:cursor-pointer w-64"
            htmlFor="nft_file"
          >
            <FontAwesomeIcon icon={faCloudUploadAlt} size="lg" /> Upload the NFT
            file
            <input
              className="hidden"
              aria-describedby="nft_file_help"
              id="nft_file"
              type="file"
              onChange={onChange}
            />
          </label>
          {fileUrl && (
            <img
              className="rounded mt-4 mx-auto max-h-64"
              src={fileUrl}
              alt="File preview"
            />
          )}
        </div>

        <button
          className="font-bold bg-accent text-white rounded p-4 shadow-stripe"
          onClick={createItem}
        >
          Create Digital Asset
        </button>
      </div>
      <form action=""></form>
    </div>
  );
};

export default CreateItem;
