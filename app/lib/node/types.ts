export type TCryptoDataElement = {
  symbol: string;
  rate: string;
  name: string | null;
  color: string | null;
  exponent: string | null;
  type: string | null;
  code: string | null;
  image: string;
};


export interface ICryptoAsset {
  asset_id: string;
  code: string;
  name: string;
  color: string;
  sort_index: number;
  exponent: number;
  type: string;
  address_regex: string;
}