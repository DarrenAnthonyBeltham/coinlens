type OhlcData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type HistoricalDataProps = {
  data: OhlcData[];
};

export default function HistoricalDataTable({ data }: HistoricalDataProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-t border-slate-700/50">
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Open</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">High</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Low</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Close</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.time} className="border-b border-slate-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{formatDate(d.time)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{formatCurrency(d.open)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">{formatCurrency(d.high)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">{formatCurrency(d.low)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{formatCurrency(d.close)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}