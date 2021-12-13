export interface NftItem {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  sold: boolean;
}

export interface FormInput {
  name: string;
  description: string;
  price: string;
}
