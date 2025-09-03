"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      fetch(`/api/search?query=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setIsLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <div className="animated-border-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a coin..."
          className="w-full md:w-64 pl-4 pr-10 py-2 bg-slate-900 rounded-lg text-slate-200 placeholder:text-slate-400 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            &#x2715; 
          </button>
        )}
      </div>
      {query && (
        <div className="absolute top-full mt-2 w-full md:w-64 bg-slate-900 border border-slate-700/50 rounded-lg z-10 overflow-hidden">
          {isLoading && <div className="p-4 text-slate-400">Searching...</div>}
          {!isLoading && results.length > 0 && (
            <ul>
              {results.slice(0, 7).map((coin) => (
                <li key={coin.id}>
                  <Link
                    href={`/coin/${coin.id}`}
                    onClick={() => setQuery("")}
                    className="flex items-center p-3 text-white hover:bg-slate-800"
                  >
                    <Image src={coin.thumb} alt={coin.name} width={24} height={24} className="mr-3" />
                    <span>{coin.name} ({coin.symbol})</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!isLoading && results.length === 0 && debouncedQuery && (
            <div className="p-4 text-slate-400">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}