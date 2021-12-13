import { create as ipfsHttpClient } from "ipfs-http-client";

export const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
});
