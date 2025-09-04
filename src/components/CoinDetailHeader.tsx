"use client";

import Image from "next/image";
import { useWatchlist } from "@/app/context/WatchlistContext";
import { CoinDetails } from "@/lib/types";

const StarIcon = ({ isFavorite }: { isFavorite: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isFavorite ? "#facc15" : "none"}
    stroke={isFavorite ? "#facc15" : "currentColor"}
    strokeWidth={2}
    className="w-8 h-8 text-slate-500 hover:text-yellow-400 transition-colors"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

export default function CoinDetailHeader({ details, price, priceChange }: { details: CoinDetails, price: string, priceChange: string }) {
  const { watchlist, toggleCoinInWatchlist } = useWatchlist();
  const isFavorite = watchlist.includes(details.id);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <Image src={details.image.large} alt={details.name} width={64} height={64} />
      <div className="flex-grow">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {details.name} <span className="text-xl sm:text-2xl text-gray-400 uppercase">{details.symbol}</span>
        </h1>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl sm:text-3xl font-semibold">{price}</p>
          <p className={parseFloat(priceChange) >= 0 ? "text-green-500" : "text-red-500"}>
            {priceChange}%
          </p>
        </div>
      </div>
      <button onClick={() => toggleCoinInWatchlist(details.id)} className="p-2">
        <StarIcon isFavorite={isFavorite} />
      </button>
    </div>
  );
}