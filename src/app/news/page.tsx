import { getLatestNews } from "@/lib/newsApi";
import NewsCard from "@/components/NewsCard";

export default async function NewsPage() {
  const articles = await getLatestNews();

  return (
    <main className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2 mb-8">
          Crypto News
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}