import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get("coinId");
    const days = searchParams.get("days");

    if (!coinId || !days) {
      return NextResponse.json(
        { error: "Missing coinId or days parameter" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`,
      { next: { revalidate: 60 } } 
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch OHLC data from CoinGecko: ${response.statusText}`);
    }

    const data = await response.json();

    const formattedData = data.map((d: number[]) => ({
      time: d[0] / 1000,
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }));

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error(error); 
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}