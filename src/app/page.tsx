import CoinTable from "@/components/CoinTable";
import FeaturedChart from "@/components/FeaturedChart";
import {
  getCoinChartData,
  getGlobalMarketData,
  getMarketData,
} from "@/lib/coingecko";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl ${className}`}>
      {children}
    </div>
  );
}

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
    <main className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
          CoinLens Dashboard
        </h1>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold tracking-wider text-slate-300">Market Summary</h2>
            <p className="text-slate-400 mt-1">
              The total crypto market cap is <strong>{marketCap}</strong>, a{" "}
              <span className={parseFloat(marketCapChange) >= 0 ? "text-green-400" : "text-red-400"}>
                {marketCapChange}%
              </span>{" "}
              change in the last 24 hours.
            </p>
          </div>
          <FeaturedChart data={chartData} coinName="Bitcoin" />
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold tracking-wider text-slate-300">Top Coins</h2>
          </div>
          <CoinTable coins={coins} />
        </Card>
      </div>
    </main>
  );
}