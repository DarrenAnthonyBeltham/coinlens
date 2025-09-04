"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Coin } from "@/lib/types";
import { useWatchlist } from "@/hooks/useWatchlist";
import CoinTable from "./CoinTable";
import { useInView } from "react-intersection-observer";
import CoinTableSkeleton from "./CoinTableSkeleton";

type SortConfig = {
  key: keyof Coin;
  direction: "ascending" | "descending";
};

type HomepageClientProps = {
  initialCoins: Coin[];
};

export default function HomepageClient({ initialCoins }: HomepageClientProps) {
  const [showWatchlist, setShowWatchlist] = useState(false);
  const { watchlist } = useWatchlist();
  const [watchlistData, setWatchlistData] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [coins, setCoins] = useState(initialCoins);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "market_cap_rank",
    direction: "ascending",
  });

  const loadMoreCoins = useCallback(async () => {
    const res = await fetch(`/api/coins?page=${page}`);
    const newCoins = (await res.json()) as Coin[];
    if (newCoins.length > 0) {
      setCoins((prevCoins) => [...prevCoins, ...newCoins]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !showWatchlist) {
      loadMoreCoins();
    }
  }, [inView, hasMore, showWatchlist, loadMoreCoins]);

  useEffect(() => {
    if (showWatchlist && watchlist.length > 0) {
      setIsLoading(true);
      fetch(`/api/watchlist?ids=${watchlist.join(",")}`)
        .then((res) => res.json())
        .then((data) => {
          setWatchlistData(data);
          setIsLoading(false);
        });
    }
  }, [showWatchlist, watchlist]);

  const sortedItems = useMemo(() => {
    const sortableItems = showWatchlist ? [...watchlistData] : [...coins];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [coins, watchlistData, showWatchlist, sortConfig]);

  const requestSort = (key: keyof Coin) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const buttonStyle = (isActive: boolean) =>
    `px-4 py-2 text-sm rounded-md transition-all duration-200 ease-in-out transform active:scale-95 ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }`;

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl flex flex-col">
      <div className="p-6 flex justify-between items-center border-b border-slate-700/50">
        <h2 className="text-xl font-semibold tracking-wider text-slate-300">
          {showWatchlist ? "My Watchlist" : "Top Coins"}
        </h2>
        <div className="flex space-x-2">
          <button onClick={() => setShowWatchlist(false)} className={buttonStyle(!showWatchlist)}>
            All
          </button>
          <button onClick={() => setShowWatchlist(true)} className={buttonStyle(showWatchlist)}>
            Watchlist
          </button>
        </div>
      </div>
      
      <div className="h-[80vh] overflow-y-auto custom-scrollbar">
        {isLoading && showWatchlist ? (
          <CoinTableSkeleton />
        ) : (
          <>
            <CoinTable coins={sortedItems} requestSort={requestSort} sortConfig={sortConfig} />
            {!showWatchlist && hasMore && (
              <div ref={ref} className="flex justify-center p-4">
                <p className="text-slate-400">Loading more...</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}