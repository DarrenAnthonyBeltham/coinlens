import { Coin } from "./types";

export async function getMarketData(): Promise<Coin[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch market data");
    }

    const data: Coin[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getGlobalMarketData() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global");
    if (!response.ok) {
      throw new Error("Failed to fetch global market data");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCoinChartData(coinId: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch chart data");
    }
    const data = await response.json();
    return data.prices.map((price: [number, number]) => ({
      timestamp: price[0],
      price: price[1],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}