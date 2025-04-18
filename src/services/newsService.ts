import { useQuery } from "@tanstack/react-query";

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  category: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
}

export type NewsCategory = 'general' | 'business' | 'technology' | 'sports' | 'entertainment' | 'health' | 'science';

const MOCK_NEWS_DATA: Record<NewsCategory, NewsResponse> = {
  general: {
    articles: [
      {
        source: { id: "bbc-news", name: "BBC News" },
        author: "BBC News",
        title: "Global Climate Summit Reaches Historic Agreement",
        description: "World leaders agree on unprecedented measures to combat climate change",
        url: "https://example.com/climate-summit",
        urlToImage: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
        publishedAt: new Date().toISOString(),
        content: "In a landmark decision, world leaders have agreed to...",
        category: "general"
      },
      {
        source: { id: "cnn", name: "CNN" },
        author: "CNN Staff",
        title: "New Study Shows Impact of Ocean Pollution",
        description: "Research reveals alarming effects of plastic waste on marine ecosystems",
        url: "https://example.com/ocean-pollution",
        urlToImage: "https://picsum.photos/id/10/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        content: "Scientists have documented the growing impact of...",
        category: "general"
      },
      {
        source: { id: "reuters", name: "Reuters" },
        author: "Reuters Staff",
        title: "Global Trade Agreement Reached After Years of Negotiations",
        description: "Major economies finalize terms on comprehensive trade deal",
        url: "https://example.com/trade-deal",
        urlToImage: "https://picsum.photos/id/20/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        content: "After years of negotiations, representatives from major economies have reached...",
        category: "general"
      }
    ],
    totalResults: 3
  },
  business: {
    articles: [
      {
        source: { id: "financial-times", name: "Financial Times" },
        author: "Financial Times",
        title: "Tech Giants Report Record Quarterly Earnings",
        description: "Major technology companies exceed market expectations",
        url: "https://example.com/tech-earnings",
        urlToImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        publishedAt: new Date().toISOString(),
        content: "Leading technology companies have reported exceptional growth...",
        category: "business"
      },
      {
        source: { id: "bloomberg", name: "Bloomberg" },
        author: "Bloomberg Staff",
        title: "Startup Valuation Reaches $10 Billion After Latest Funding Round",
        description: "AI-focused company becomes newest unicorn in tech industry",
        url: "https://example.com/startup-funding",
        urlToImage: "https://picsum.photos/id/11/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        content: "In a significant funding round led by major venture capital firms...",
        category: "business"
      },
      {
        source: { id: "wsj", name: "Wall Street Journal" },
        author: "WSJ Staff",
        title: "Central Banks Announce Coordinated Interest Rate Decision",
        description: "Global financial markets respond to synchronized policy move",
        url: "https://example.com/interest-rates",
        urlToImage: "https://picsum.photos/id/21/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        content: "Major central banks have announced a coordinated approach to...",
        category: "business"
      }
    ],
    totalResults: 3
  },
  technology: {
    articles: [
      {
        source: { id: "wired", name: "Wired" },
        author: "Wired",
        title: "Revolutionary AI Breakthrough in Healthcare",
        description: "New AI model shows promising results in early disease detection",
        url: "https://example.com/ai-healthcare",
        urlToImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        publishedAt: new Date().toISOString(),
        content: "Researchers have developed a new AI system capable of...",
        category: "technology"
      },
      {
        source: { id: "techcrunch", name: "TechCrunch" },
        author: "TechCrunch Staff",
        title: "Quantum Computing Milestone Achieved by Research Team",
        description: "Scientists demonstrate quantum advantage in practical application",
        url: "https://example.com/quantum-computing",
        urlToImage: "https://picsum.photos/id/12/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        content: "A team of researchers has demonstrated quantum advantage in a real-world...",
        category: "technology"
      },
      {
        source: { id: "verge", name: "The Verge" },
        author: "The Verge Staff",
        title: "Next Generation of Augmented Reality Devices Announced",
        description: "Major tech companies reveal upcoming AR hardware and software",
        url: "https://example.com/ar-devices",
        urlToImage: "https://picsum.photos/id/22/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        content: "The next wave of augmented reality devices has been announced at...",
        category: "technology"
      }
    ],
    totalResults: 3
  },
  sports: {
    articles: [
      {
        source: { id: "espn", name: "ESPN" },
        author: "ESPN",
        title: "Historic Victory in World Championship Final",
        description: "Underdog team claims victory in dramatic final match",
        url: "https://example.com/sports-final",
        urlToImage: "https://images.unsplash.com/photo-1518402034201-8bfa4038bb59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        publishedAt: new Date().toISOString(),
        content: "In an unexpected turn of events, the underdog team...",
        category: "sports"
      },
      {
        source: { id: "sports-illustrated", name: "Sports Illustrated" },
        author: "SI Staff",
        title: "Olympic Athlete Breaks World Record in Qualifying Round",
        description: "New record set ahead of highly anticipated final competition",
        url: "https://example.com/olympic-record",
        urlToImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        publishedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
        content: "In a stunning performance during the qualifying round...",
        category: "sports"
      },
      {
        source: { id: "sky-sports", name: "Sky Sports" },
        author: "Sky Sports Staff",
        title: "Major Transfer Deal Announced Between Rival Teams",
        description: "Star player makes surprising move in blockbuster trade",
        url: "https://example.com/transfer-deal",
        urlToImage: "https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
        content: "In a move that has shocked fans and analysts alike...",
        category: "sports"
      }
    ],
    totalResults: 3
  },
  entertainment: {
    articles: [
      {
        source: { id: "variety", name: "Variety" },
        author: "Variety",
        title: "Blockbuster Movie Breaks Box Office Records",
        description: "New release sets unprecedented opening weekend numbers",
        url: "https://example.com/movie-records",
        urlToImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        publishedAt: new Date().toISOString(),
        content: "The highly anticipated film has shattered previous records...",
        category: "entertainment"
      },
      {
        source: { id: "hollywood-reporter", name: "Hollywood Reporter" },
        author: "Hollywood Reporter Staff",
        title: "Acclaimed Director Announces Surprise New Project",
        description: "Award-winning filmmaker reveals unexpected collaboration",
        url: "https://example.com/director-project",
        urlToImage: "https://picsum.photos/id/14/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
        content: "In an unexpected announcement that has excited film enthusiasts...",
        category: "entertainment"
      },
      {
        source: { id: "billboard", name: "Billboard" },
        author: "Billboard Staff",
        title: "Music Industry Celebrates Record Growth in Streaming Revenue",
        description: "Digital platforms drive significant increase in music consumption",
        url: "https://example.com/music-streaming",
        urlToImage: "https://picsum.photos/id/24/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
        content: "The music industry has reported unprecedented growth in streaming revenue...",
        category: "entertainment"
      }
    ],
    totalResults: 3
  },
  health: {
    articles: [
      {
        source: { id: "health", name: "Health Magazine" },
        author: "Health Magazine",
        title: "Breakthrough in Medical Research",
        description: "Scientists discover new treatment for chronic conditions",
        url: "https://example.com/health-breakthrough",
        urlToImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        publishedAt: new Date().toISOString(),
        content: "A team of researchers has announced a major breakthrough...",
        category: "health"
      },
      {
        source: { id: "medical-news", name: "Medical News Today" },
        author: "Medical News Staff",
        title: "Study Reveals Surprising Benefits of Common Food Ingredient",
        description: "Research highlights unexpected health advantages of everyday foods",
        url: "https://example.com/food-benefits",
        urlToImage: "https://picsum.photos/id/15/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 660).toISOString(),
        content: "A comprehensive study has uncovered significant health benefits associated with...",
        category: "health"
      },
      {
        source: { id: "webmd", name: "WebMD" },
        author: "WebMD Staff",
        title: "New Guidelines Published for Managing Chronic Pain",
        description: "Medical organizations update recommendations for pain treatment",
        url: "https://example.com/pain-guidelines",
        urlToImage: "https://picsum.photos/id/25/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
        content: "Major medical associations have collaborated to release new guidelines for...",
        category: "health"
      }
    ],
    totalResults: 3
  },
  science: {
    articles: [
      {
        source: { id: "nature", name: "Nature" },
        author: "Nature",
        title: "New Species Discovered in Remote Region",
        description: "Scientists document previously unknown biodiversity",
        url: "https://example.com/new-species",
        urlToImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
        publishedAt: new Date().toISOString(),
        content: "An international team of researchers has discovered...",
        category: "science"
      },
      {
        source: { id: "science", name: "Science Magazine" },
        author: "Science Staff",
        title: "Astronomers Detect Unusual Signals from Distant Galaxy",
        description: "Mysterious radio bursts prompt new theories about cosmic phenomena",
        url: "https://example.com/astronomy-signals",
        urlToImage: "https://picsum.photos/id/16/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 780).toISOString(),
        content: "Astronomers using advanced radio telescopes have detected unusual patterns...",
        category: "science"
      },
      {
        source: { id: "nat-geo", name: "National Geographic" },
        author: "Nat Geo Staff",
        title: "Ancient Civilization Artifacts Uncovered at Archaeological Site",
        description: "Excavation reveals sophisticated technology from prehistoric culture",
        url: "https://example.com/artifacts-discovery",
        urlToImage: "https://picsum.photos/id/26/800/400",
        publishedAt: new Date(Date.now() - 1000 * 60 * 840).toISOString(),
        content: "Archaeologists working at a remote site have uncovered artifacts that indicate...",
        category: "science"
      }
    ],
    totalResults: 3
  }
};

export const fetchNewsByCategory = async (
  category: NewsCategory,
  page: number = 1
): Promise<NewsResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return MOCK_NEWS_DATA[category] || { articles: [], totalResults: 0 };
};

export const useNewsData = (category: NewsCategory, page: number = 1) => {
  return useQuery({
    queryKey: ["news", category, page],
    queryFn: () => fetchNewsByCategory(category, page),
    staleTime: 1000 * 60 * 1, // 1 minute
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
};
