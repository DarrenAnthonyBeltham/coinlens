import { getMarketData } from "@/lib/coingecko";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!page) {
      return NextResponse.json({ error: "Page parameter is required" }, { status: 400 });
    }

    const data = await getMarketData(parseInt(page));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch coins" }, { status: 500 });
  }
}