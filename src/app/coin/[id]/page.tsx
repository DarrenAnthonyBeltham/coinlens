type CoinDetailPageProps = {
  params: {
    id: string;
  };
};

export default function CoinDetailPage({ params }: CoinDetailPageProps) {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold capitalize">
        This is the page for: {params.id}
      </h1>
    </main>
  );
}