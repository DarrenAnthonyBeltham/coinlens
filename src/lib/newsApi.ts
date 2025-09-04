type Article = {
  id: string;
  url: string;
  imageurl: string;
  title: string;
  source_info: {
    name: string;
  };
  body: string;
};

export async function getLatestNews(): Promise<Article[]> {
  try {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/v2/news/?lang=EN",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }

    const data = await response.json();
    return data.Data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}