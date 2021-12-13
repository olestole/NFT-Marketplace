import { client } from "./client";

const uploadToIpfs = async (file: any): Promise<string | null> => {
  let url = null;
  try {
    const added = await client.add(file, {
      progress: (prog: any) => console.log(`received: ${prog}`),
    });
    console.log(added);
    url = `https://ipfs.infura.io/ipfs/${added.path}`;
  } catch (error) {
    console.error(error);
  }
  return url;
};

export default uploadToIpfs;