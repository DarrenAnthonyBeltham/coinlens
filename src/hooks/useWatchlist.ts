"use client";

import { useState, useEffect } from "react";

export function useWatchlist() {
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
    try {
      localStorage.setItem("coinlens-watchlist", JSON.stringify(updatedList));
    } catch (error) {
      console.error("Failed to update watchlist in localStorage", error);
    }
  };

  const toggleCoinInWatchlist = (coinId: string) => {
    setWatchlist((prevList) => {
      let updatedList;
      if (prevList.includes(coinId)) {
        updatedList = prevList.filter((id) => id !== coinId);
      } else {
        updatedList = [...prevList, coinId];
      }
      updateLocalStorage(updatedList);
      return updatedList;
    });
  };

  return { watchlist, toggleCoinInWatchlist };
}