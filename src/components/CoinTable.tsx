"use client";

import { Coin } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CoinTableProps = {
  coins: Coin[];
};

export default function CoinTable({ coins }: CoinTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-t border-slate-700/50">
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">#</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Coin</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">24h %</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer"
              onClick={() => router.push(`/coin/${coin.id}`)}
            >
              <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300">{coin.market_cap_rank}</td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-white">
                <div className="flex items-center">
                  <Image src={coin.image} alt={coin.name} width={28} height={28} className="mr-4" />
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-slate-400 uppercase">{coin.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300" suppressHydrationWarning={true}>
                ${coin.current_price.toLocaleString()}
              </td>
              <td className={`px-6 py-5 whitespace-nowrap text-sm font-semibold ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300" suppressHydrationWarning={true}>
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}