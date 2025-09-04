"use client";

import { useState } from "react";
import Skeleton from "./Skeleton";
import DatePicker from "react-datepicker";

type CalculatorProps = {
  coinId: string;
  currentPrice: number;
};

type Result = {
  initialValue: number;
  currentValue: number;
  profit: number;
  roi: number;
} | null;

export default function InvestmentCalculator({ coinId, currentPrice }: CalculatorProps) {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  const [amount, setAmount] = useState("1000");
  const [selectedDate, setSelectedDate] = useState<Date | null>(oneYearAgo);
  const [result, setResult] = useState<Result>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    if (!selectedDate) {
      setError("Please select a valid date.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getFullYear()}`;

    const response = await fetch(`/api/historical?coinId=${coinId}&date=${formattedDate}`);
    const data = await response.json();

    if (data.error || !data.price) {
      setError(data.error || "Price data not available for the selected date.");
    } else {
      const pastPrice = data.price;
      const initialInvestment = parseFloat(amount);
      const coinsBought = initialInvestment / pastPrice;
      const currentValue = coinsBought * currentPrice;
      const profit = currentValue - initialInvestment;
      const roi = (profit / initialInvestment) * 100;

      setResult({
        initialValue: initialInvestment,
        currentValue,
        profit,
        roi,
      });
    }

    setIsLoading(false);
  };

  const formatCurrency = (value: number) => value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const inputStyle = "w-full h-14 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-white";

  const ResultSkeleton = () => (
    <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
      <Skeleton className="h-5 w-3/4 mb-4" />
      <Skeleton className="h-9 w-1/2 mb-2" />
      <Skeleton className="h-5 w-1/3" />
    </div>
  );

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold tracking-wider text-slate-300 mb-4">
        "What If?" Calculator
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">If I Invested</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputStyle} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">On This Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className={inputStyle}
            wrapperClassName="w-full"
          />
        </div>
        <button onClick={handleCalculate} disabled={isLoading} className="h-14 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-600">
          {isLoading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-400">{error}</p>}
      
      {isLoading && <ResultSkeleton />}

      {!isLoading && result && (
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
          <p className="text-slate-300">
            An investment of <span className="font-bold text-white">{formatCurrency(result.initialValue)}</span> would now be worth:
          </p>
          <p className="text-3xl font-bold text-white mt-2">{formatCurrency(result.currentValue)}</p>
          <p className={`mt-1 font-semibold ${result.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(result.profit)} ({result.roi.toFixed(2)}%)
          </p>
        </div>
      )}
    </div>
  );
}