import ConverterClient from "@/components/ConverterClient";
import { getMarketData } from "@/lib/coingecko";

export default async function ConverterPage() {
  const coins = await getMarketData(1);

  return (
    <main className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2 mb-8 text-center">
          Crypto Converter
        </h1>
        <ConverterClient coins={coins} />
      </div>
    </main>
  );
}