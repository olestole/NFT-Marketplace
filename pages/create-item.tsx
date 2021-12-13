import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import createItem from "../utils/createItem";
import uploadToIpfs from "../utils/uploadToIpfs";

const CreateItem = () => {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const handleSale = async () => {
    const success = await createItem(formInput, fileUrl);
    if (success) {
      router.push("/");
    } else {
      console.log("Something wrong happened. Try again");
    }
  };

  const onChange = async (e: any) => {
    const file = e.target.files[0];
    const url = await uploadToIpfs(file);
    setFileUrl(url);
  };

  // TODO: Implement so that you don't upload to IPFS before you submit the form
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
            className="link p-4 bg-white rounded hover:cursor-pointer w-64"
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
          onClick={handleSale}
        >
          Create Digital Asset
        </button>
      </div>
      <form action=""></form>
    </div>
  );
};

export default CreateItem;
