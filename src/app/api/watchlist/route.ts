import { getCoinsByIds } from "@/lib/coingecko";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");

    if (!ids) {
      return NextResponse.json([]); 
    }

    const data = await getCoinsByIds(ids);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch watchlist data" },
      { status: 500 }
    );
  }
}