"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";

type WatchlistContextType = {
  watchlist: string[];
  toggleCoinInWatchlist: (coinId: string) => void;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem("coinlens-watchlist");
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    } catch (error) {
      console.error("Failed to parse watchlist from localStorage", error);
    }
  }, []);

  const updateLocalStorage = (updatedList: string[]) => {
    localStorage.setItem("coinlens-watchlist", JSON.stringify(updatedList));
  };

  const toggleCoinInWatchlist = (coinId: string) => {
    setWatchlist((prevList) => {
      const updatedList = prevList.includes(coinId)
        ? prevList.filter((id) => id !== coinId)
        : [...prevList, coinId];
      
      updateLocalStorage(updatedList);
      return updatedList;
    });
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleCoinInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}