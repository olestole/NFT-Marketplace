import { FormInput } from "../types/types";
import { client } from "./client";
import createSale from "./createSale";

const createItem = async (
  formInput: FormInput,
  fileUrl: string | null
): Promise<boolean> => {
  const { name, description, price } = formInput;
  // Don't want to allow listing without any of these
  if (!name || !description || !price) return false;

  const data = JSON.stringify({
    name,
    description,
    image: fileUrl,
  });

  try {
    const added = await client.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    await createSale(url, formInput);
    return true;
  } catch (error) {
    console.log(`Error uploading file: ${error}`);
    return false;
  }
};

export default createItem;
