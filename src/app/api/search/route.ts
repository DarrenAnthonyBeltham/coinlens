import { searchCoins } from "@/lib/coingecko";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const data = await searchCoins(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error in /api/search:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}