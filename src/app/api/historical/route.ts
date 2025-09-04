import { getHistoricalPrice } from "@/lib/coingecko";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get("coinId");
    const date = searchParams.get("date");

    if (!coinId || !date) {
      return NextResponse.json({ error: "Missing coinId or date parameter" }, { status: 400 });
    }

    const price = await getHistoricalPrice(coinId, date);
    if (price === null) {
      return NextResponse.json({ error: "Could not find price for this date" }, { status: 404 });
    }
    
    return NextResponse.json({ price });
  } catch (error) {
    console.error("API Error in /api/historical:", error);
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
  }
}