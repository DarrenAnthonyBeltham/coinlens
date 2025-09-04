import FeaturedChart from "@/components/FeaturedChart";
import HomepageClient from "@/components/HomepageClient";
import TrendingWidget from "@/components/TrendingWidget";
import {
  getCoinChartData,
  getGlobalMarketData,
  getMarketData,
  getTrendingCoins,
} from "@/lib/coingecko";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl transition-all hover:border-blue-500/50 ${className}`}>
      {children}
    </div>
  );
}

export default async function Home() {
  const [coins, globalData, chartData, trendingCoins] = await Promise.all([
    getMarketData(1),
    getGlobalMarketData(),
    getCoinChartData("bitcoin"),
    getTrendingCoins(),
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
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2 fade-in-slide-up">
          CoinLens Dashboard
        </h1>

        <div className="fade-in-slide-up" style={{ animationDelay: '100ms' }}>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 fade-in-slide-up" style={{ animationDelay: '200ms' }}>
             <HomepageClient initialCoins={coins} />
          </div>
          
          <div className="lg:col-span-1 fade-in-slide-up" style={{ animationDelay: '300ms' }}>
            <TrendingWidget trendingCoins={trendingCoins} />
          </div>
        </div>
      </div>
    </main>
  );
}