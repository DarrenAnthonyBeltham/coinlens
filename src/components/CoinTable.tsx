"use client";

import { Coin } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type CoinTableProps = {
  coins: Coin[];
};

export default function CoinTable({ coins }: CoinTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Coin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              24h %
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {coins.map((coin) => (
            <Link href={`/coin/${coin.id}`} key={coin.id} legacyBehavior>
              <tr className="hover:bg-gray-800 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {coin.market_cap_rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  <div className="flex items-center">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={24}
                      height={24}
                      className="mr-3"
                    />
                    {coin.name}{" "}
                    <span className="ml-2 text-gray-400 uppercase">
                      {coin.symbol}
                    </span>
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                  suppressHydrationWarning={true}
                >
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                  suppressHydrationWarning={true}
                >
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}