import { Coin } from "./types";

export async function getMarketData(page: number = 1): Promise<Coin[]> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${page}&sparkline=true`,
      { next: { revalidate: 60 } }
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
    const response = await fetch("https://api.coingecko.com/api/v3/global", {
      next: { revalidate: 60 },
    });
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
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
      { next: { revalidate: 60 } }
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

export async function getCoinDetails(coinId: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch coin details");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCoinOHLC(coinId: string, days: number = 30) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch OHLC data");
    }
    const data = await response.json();
    return data.map((d: number[]) => ({
      time: d[0] / 1000,
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function searchCoins(query: string) {
  if (!query) return [];
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to search for coins");
    }
    const data = await response.json();
    return data.coins; 
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCoinsByIds(ids: string) {
  if (!ids) return [];
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch coin data by IDs");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getTrendingCoins() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/search/trending",
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch trending coins");
    }
    const data = await response.json();
    return data.coins;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getHistoricalPrice(coinId: string, date: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${date}`,
      { next: { revalidate: 86400 } } 
    );
    if (!response.ok) {
      throw new Error("Failed to fetch historical data");
    }
    const data = await response.json();
    return data.market_data?.current_price?.usd || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}