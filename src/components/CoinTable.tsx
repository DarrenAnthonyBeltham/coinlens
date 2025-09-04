"use client";

import { Coin } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SparklineChart from "./SparklineChart";
import { useWatchlist } from "@/hooks/useWatchlist";

const StarIcon = ({ isFavorite }: { isFavorite: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isFavorite ? "#facc15" : "none"}
    stroke={isFavorite ? "#facc15" : "currentColor"}
    strokeWidth={2}
    className="w-5 h-5 text-slate-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const SortIcon = ({ direction }: { direction: "ascending" | "descending" }) => (
  <span className="ml-2 opacity-70">
    {direction === "ascending" ? "▲" : "▼"}
  </span>
);

type SortConfig = {
  key: keyof Coin;
  direction: "ascending" | "descending";
};

type CoinTableProps = {
  coins: Coin[];
  requestSort: (key: keyof Coin) => void;
  sortConfig: SortConfig;
};

export default function CoinTable({ coins, requestSort, sortConfig }: CoinTableProps) {
  const router = useRouter();
  const { watchlist, toggleCoinInWatchlist } = useWatchlist();

  const getSortIcon = (key: keyof Coin) => {
    if (sortConfig.key === key) {
      return <SortIcon direction={sortConfig.direction} />;
    }
    return null;
  };

  const headers = [
    { key: "market_cap_rank", label: "#", sortable: true, className: "hidden sm:table-cell" },
    { key: "name", label: "Coin", sortable: true },
    { key: "current_price", label: "Price", sortable: true },
    { key: "price_change_percentage_24h", label: "24h %", sortable: true, className: "hidden md:table-cell" },
    { key: "market_cap", label: "Market Cap", sortable: true, className: "hidden lg:table-cell" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-t border-slate-700/50">
            <th className="px-2 sm:px-4 py-4 w-12"></th>
            {headers.map((header) => (
              <th
                key={header.key}
                className={`px-2 sm:px-4 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider ${header.sortable ? 'cursor-pointer' : ''} ${header.className || ''}`}
                onClick={() => header.sortable && requestSort(header.key as keyof Coin)}
              >
                <div className="flex items-center">
                  {header.label}
                  {header.sortable && getSortIcon(header.key as keyof Coin)}
                </div>
              </th>
            ))}
            <th className="px-2 sm:px-4 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden xl:table-cell">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const isPriceUp = coin.price_change_percentage_24h >= 0;
            const isFavorite = watchlist.includes(coin.id);

            const formatCurrency = (value: number) => {
              return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: coin.current_price < 1 ? 6 : 2 });
            };

            return (
              <tr key={coin.id} className="border-b border-slate-800 hover:bg-slate-800/50 group">
                <td className="px-2 sm:px-4 py-5">
                  <button onClick={(e) => { e.stopPropagation(); toggleCoinInWatchlist(coin.id); }} className="opacity-50 group-hover:opacity-100 transition-opacity">
                    <StarIcon isFavorite={isFavorite} />
                  </button>
                </td>
                <td onClick={() => router.push(`/coin/${coin.id}`)} className="px-2 sm:px-4 py-5 text-sm text-slate-300 cursor-pointer hidden sm:table-cell">{coin.market_cap_rank}</td>
                <td onClick={() => router.push(`/coin/${coin.id}`)} className="px-2 sm:px-4 py-5 text-sm text-white cursor-pointer">
                  <div className="flex items-center">
                    <Image src={coin.image} alt={coin.name} width={28} height={28} className="mr-4 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{coin.name}</div>
                      <div className="text-slate-400 uppercase hidden sm:block">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td onClick={() => router.push(`/coin/${coin.id}`)} className="px-2 sm:px-4 py-5 whitespace-nowrap text-sm text-slate-300 cursor-pointer" suppressHydrationWarning={true}>{formatCurrency(coin.current_price)}</td>
                <td onClick={() => router.push(`/coin/${coin.id}`)} className={`px-2 sm:px-4 py-5 whitespace-nowrap text-sm font-semibold cursor-pointer ${isPriceUp ? "text-green-400" : "text-red-400"} hidden md:table-cell`}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                <td onClick={() => router.push(`/coin/${coin.id}`)} className="px-2 sm:px-4 py-5 whitespace-nowrap text-sm text-slate-300 cursor-pointer hidden lg:table-cell" suppressHydrationWarning={true}>{formatCurrency(coin.market_cap)}</td>
                <td onClick={() => router.push(`/coin/${coin.id}`)} className="px-2 sm:px-4 py-5 whitespace-nowrap cursor-pointer hidden xl:table-cell">
                  <SparklineChart data={coin.sparkline_in_7d.price} color={isPriceUp ? "#16a34a" : "#dc2626"} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}