"use client";

import { useState, useEffect } from "react";
import { Coin } from "@/lib/types";
import CustomDropdown from "./CustomDropdown";

export default function ConverterClient({ coins }: { coins: Coin[] }) {
  const usdOption = { id: "usd", name: "United States Dollar", symbol: "usd", current_price: 1, image: "" };
  const allOptions = [usdOption, ...coins];

  const [amount1, setAmount1] = useState<string>("1");
  const [amount2, setAmount2] = useState<string>("");
  const [coin1, setCoin1] = useState<any>(coins.find(c => c.id === 'bitcoin') || allOptions[1]);
  const [coin2, setCoin2] = useState<any>(usdOption);

  useEffect(() => {
    if (coin1 && coin2) {
      const value1 = parseFloat(amount1);
      if (!isNaN(value1)) {
        const result = (value1 * coin1.current_price) / coin2.current_price;
        setAmount2(Number(result.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 }));
      } else {
        setAmount2("");
      }
    }
  }, [amount1, coin1, coin2]);
  
  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount1(e.target.value);
  };

  const handleStep = (direction: 'up' | 'down') => {
    const currentValue = parseFloat(amount1) || 0;
    const newValue = direction === 'up' ? currentValue + 1 : Math.max(0, currentValue - 1); 
    setAmount1(String(newValue));
  };
  
  const formElementStyle = "w-full h-14 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-white";

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount1}
              onChange={handleAmount1Change}
              className={`${formElementStyle} hide-number-arrows pr-12`}
            />
            <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center w-10">
              <button onClick={() => handleStep('up')} className="h-1/2 text-slate-400 hover:text-white">▲</button>
              <button onClick={() => handleStep('down')} className="h-1/2 text-slate-400 hover:text-white">▼</button>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">From</label>
          <CustomDropdown options={allOptions} value={coin1} onChange={setCoin1} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Converted Amount</label>
          <input
            type="text"
            value={amount2}
            readOnly
            className={`${formElementStyle} text-slate-400`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">To</label>
          <CustomDropdown options={allOptions} value={coin2} onChange={setCoin2} />
        </div>
      </div>
    </div>
  );
}