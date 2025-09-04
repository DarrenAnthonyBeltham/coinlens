import Image from "next/image";
import Link from "next/link";

type TrendingCoin = {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    market_cap_rank: number;
  };
};

type TrendingWidgetProps = {
  trendingCoins: TrendingCoin[];
};

export default function TrendingWidget({ trendingCoins }: TrendingWidgetProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold tracking-wider text-slate-300 mb-4">
        Trending Coins
      </h2>
      <ul className="space-y-4">
        {trendingCoins.map((coin) => (
          <li key={coin.item.id}>
            <Link href={`/coin/${coin.item.id}`} className="flex items-center gap-4 hover:bg-slate-800/50 p-2 rounded-lg">
              <Image
                src={coin.item.thumb}
                alt={coin.item.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-white">{coin.item.name}</p>
                <p className="text-sm text-slate-400">
                  #{coin.item.market_cap_rank}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}