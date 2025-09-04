type PriceGaugeProps = {
  currentPrice: number;
  ath: number;
  atl: number;
};

export default function PriceGauge({ currentPrice, ath, atl }: PriceGaugeProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
  };

  const range = ath - atl;
  const position = range > 0 ? ((currentPrice - atl) / range) * 100 : 50;

  return (
    <div className="my-4">
      <div className="relative h-2 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-slate-900"
          style={{ left: `calc(${position}% - 8px)` }} 
        >
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-700 text-white text-xs font-bold rounded shadow-lg whitespace-nowrap">
            {formatCurrency(currentPrice)}
          </span>
        </div>
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>{formatCurrency(atl)} (ATL)</span>
        <span>{formatCurrency(ath)} (ATH)</span>
      </div>
    </div>
  );
}