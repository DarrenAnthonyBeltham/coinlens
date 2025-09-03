import CoinTable from "@/components/CoinTable";
import FeaturedChart from "@/components/FeaturedChart";
import {
  getCoinChartData,
  getGlobalMarketData,
  getMarketData,
} from "@/lib/coingecko";

export default async function Home() {
  const [coins, globalData, chartData] = await Promise.all([
    getMarketData(),
    getGlobalMarketData(),
    getCoinChartData("bitcoin"),
  ]);

  const marketCap =
    globalData?.total_market_cap?.usd.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) || "N/A";

  const marketCapChange =
    globalData?.market_cap_change_percentage_24h_usd?.toFixed(2) || "N/A";

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-1">Market Summary</h2>
            <p className="text-gray-400">
              The total crypto market cap is <strong>{marketCap}</strong>, a{" "}
              <span
                className={
                  parseFloat(marketCapChange) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {marketCapChange}%
              </span>{" "}
              change in the last 24 hours.
            </p>
          </div>

          <FeaturedChart data={chartData} coinName="Bitcoin" />
        </div>

        <div className="lg:col-span-1 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Top Coins</h2>
          <CoinTable coins={coins} />
        </div>
      </div>
    </main>
  );
}