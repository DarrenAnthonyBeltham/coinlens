import Image from "next/image";

type Article = {
  id: string;
  url: string;
  imageurl: string;
  title: string;
  source_info: {
    name: string;
  };
};

type NewsCardProps = {
  article: Article;
};

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500 transition-colors"
    >
      <div className="relative h-48 w-full">
        <Image
          src={article.imageurl}
          alt={article.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-blue-400 mb-1">{article.source_info.name}</p>
        <h3 className="font-semibold text-lg text-white leading-snug">
          {article.title}
        </h3>
      </div>
    </a>
  );
}