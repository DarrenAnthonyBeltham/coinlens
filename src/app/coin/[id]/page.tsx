import CoinDetailClient from "@/components/CoinDetailClient";
import PriceGauge from "@/components/PriceGauge";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import { getCoinDetails, getCoinOHLC } from "@/lib/coingecko";
import Image from "next/image";

type CoinDetailPageProps = { params: { id: string; } };

function StatCard({ label, value }: { label: string; value: string | number; }) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default async function CoinDetailPage({ params }: CoinDetailPageProps) {
  const details = await getCoinDetails(params.id);

  if (!details) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <h1 className="text-4xl font-bold">Coin not found.</h1>
      </main>
    );
  }

  const ohlcData = await getCoinOHLC(params.id, 30);
  
  const price = details.market_data.current_price.usd.toLocaleString("en-US", { style: "currency", currency: "USD" });
  const priceChange = details.market_data.price_change_percentage_24h.toFixed(2);
  const marketCap = `$${details.market_data.market_cap.usd.toLocaleString()}`;
  const volume = `$${details.market_data.total_volume.usd.toLocaleString()}`;
  const ath = `$${details.market_data.ath.usd.toLocaleString()}`;
  const atl = `$${details.market_data.atl.usd.toLocaleString()}`;

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Image src={details.image.large} alt={details.name} width={64} height={64} />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {details.name} <span className="text-xl sm:text-2xl text-gray-400 uppercase">{details.symbol}</span>
            </h1>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl sm:text-3xl font-semibold">{price}</p>
              <p className={parseFloat(priceChange) >= 0 ? "text-green-500" : "text-red-500"}>{priceChange}%</p>
            </div>
          </div>
        </div>

        <CoinDetailClient coinId={params.id} initialChartData={ohlcData} coinName={details.name} />

        <div>
          <h2 className="text-2xl font-bold mb-4">Key Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <StatCard label="Market Cap" value={marketCap} />
            <StatCard label="Volume (24h)" value={volume} />
            <StatCard label="All-Time High" value={ath} />
            <StatCard label="All-Time Low" value={atl} />
          </div>
          <PriceGauge currentPrice={details.market_data.current_price.usd} ath={details.market_data.ath.usd} atl={details.market_data.atl.usd} />
        </div>
        
        <InvestmentCalculator coinId={params.id} currentPrice={details.market_data.current_price.usd} />

        <div>
          <h2 className="text-2xl font-bold mb-4">About {details.name}</h2>
          <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: details.description.en }} />
        </div>
      </div>
    </main>
  );
}