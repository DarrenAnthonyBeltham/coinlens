export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  sparkline_in_7d: {
    price: number[];
  };
};

export type OhlcData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type SearchResult = {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
};