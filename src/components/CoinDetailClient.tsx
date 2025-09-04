"use client";

import React, { useState, useEffect, useTransition } from "react";
import CoinChart from "./CoinChart";
import Skeleton from "./Skeleton";
import HistoricalDataTable from "./HistoricalDataTable";

type Timeframe = {
  days: number;
  label: string;
};

const timeframes: Timeframe[] = [
  { days: 1, label: "24H" },
  { days: 7, label: "7D" },
  { days: 30, label: "30D" },
  { days: 90, label: "90D" },
  { days: 365, label: "1Y" },
];

type CoinDetailClientProps = {
  coinId: string;
  initialChartData: any[];
  coinName: string;
};

export default function CoinDetailClient({
  coinId,
  initialChartData,
  coinName,
}: CoinDetailClientProps) {
  const [days, setDays] = useState<number>(30);
  const [chartData, setChartData] = useState(initialChartData);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (days === 30) {
      setChartData(initialChartData);
      return;
    }

    const fetchNewData = async () => {
      startTransition(async () => {
        const response = await fetch(`/api/chart?coinId=${coinId}&days=${days}`);
        const data = await response.json();
        setChartData(data);
      });
    };

    fetchNewData();
  }, [days, coinId, initialChartData]);

  const selectedTimeframe = timeframes.find(tf => tf.days === days)?.label || '30D';
  
  const buttonStyle = (isActive: boolean) =>
    `px-4 py-2 text-sm rounded-md transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
    }`;

  return (
    <>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold tracking-wider text-slate-300">{coinName} Chart ({selectedTimeframe})</h2>
            <div className="flex space-x-2">
              {timeframes.map((tf) => (
                <button
                  key={tf.days}
                  onClick={() => setDays(tf.days)}
                  className={buttonStyle(days === tf.days)}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
          
          {isPending ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <CoinChart data={chartData} coinName={coinName} />
          )}
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold tracking-wider text-slate-300">Historical Data</h2>
        </div>
        
        {isPending ? (
          <div className="p-6">
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <HistoricalDataTable data={chartData} />
        )}
      </div>
    </>
  );
}