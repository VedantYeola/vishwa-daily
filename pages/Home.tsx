
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, ArrowRight, RefreshCw } from 'lucide-react';
import { MOCK_ARTICLES } from '../mockData';
import { generateNewsArticles } from '../services/geminiService';
import { toast } from 'sonner';

const Home: React.FC = () => {
  const [articles, setArticles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchNews = async (skipCache: boolean = false) => {
    if (skipCache) setRefreshing(true);
    // else setLoading(true); // Initial load handles its own loading state below

    try {
      const fetched = await generateNewsArticles(undefined, skipCache);
      if (fetched && fetched.length > 0) {
        setArticles(fetched);
        if (skipCache) toast.success("Daily edition updated!");
      } else {
        setArticles(MOCK_ARTICLES);
        if (skipCache) toast.error("Could not update edition.");
      }
    } catch (err) {
      console.error("Failed to fetch news", err);
      setArticles(MOCK_ARTICLES);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-gray-200 rounded-xl w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
        <p className="mt-8 text-gray-500 font-serif italic animate-bounce">Curating today's top stories with AI...</p>
      </div>
    );
  }

  const featured = articles[0] || MOCK_ARTICLES[0];
  const secondary = articles.slice(1, 4);
  const latest = articles.slice(4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 relative group overflow-hidden rounded-xl">
          <Link to={`/article/${featured.id}`} state={{ article: featured }}>
            <div className="aspect-[16/9] w-full">
              <img
                src={featured.imageUrl || "https://picsum.photos/seed/news/1200/800"}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="bg-red-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded w-fit mb-4">
                Featured
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight group-hover:underline">
                {featured.title}
              </h1>
              <p className="text-gray-200 line-clamp-2 max-w-2xl text-lg mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span>By {featured.author}</span>
                <span>•</span>
                <span>{featured.publishedAt}</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col space-y-8">
          {secondary.map((article) => (
            <div key={article.id} className="group">
              <Link to={`/article/${article.id}`} state={{ article }}>
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-4">
                  <img
                    src={article.imageUrl || `https://picsum.photos/seed/${article.id}/800/600`}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">{article.category}</span>
                <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-red-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Bar */}
      <div className="bg-gray-100 rounded-lg p-4 mb-16 flex items-center justify-between">
        <div className="flex items-center overflow-x-auto whitespace-nowrap space-x-8 no-scrollbar flex-grow mr-4">
          <div className="flex items-center text-red-600 font-bold uppercase text-xs tracking-widest flex-shrink-0">
            <TrendingUp size={16} className="mr-2" />
            Trending Now
          </div>
          {articles.map(art => (
            <Link key={art.id} to={`/article/${art.id}`} state={{ article: art }} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              {art.title}
            </Link>
          ))}
        </div>

        <button
          onClick={() => fetchNews(true)}
          disabled={refreshing}
          className="flex-shrink-0 bg-white hover:bg-gray-50 text-gray-900 p-2 rounded-full shadow-sm transition-all border border-gray-200"
          title="Refresh Edition"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin text-red-600' : 'text-gray-500'} />
        </button>
      </div>

      {/* Latest News Grid */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-serif font-bold flex items-center">
            <Clock className="mr-3 text-red-600" />
            Latest Journalism
          </h2>
          <Link to="/category/tech" className="text-sm font-semibold text-gray-500 hover:text-black flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latest.map((article) => (
            <article key={article.id} className="flex flex-col group">
              <Link to={`/article/${article.id}`} state={{ article }} className="mb-4 overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={article.imageUrl || `https://picsum.photos/seed/${article.id}latest/800/600`}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex items-center space-x-2 text-[10px] font-bold text-red-600 uppercase tracking-widest mb-2">
                <span>{article.category}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500 uppercase">{article.readTime} Read</span>
              </div>
              <Link to={`/article/${article.id}`} state={{ article }}>
                <h3 className="text-xl font-serif font-bold mb-3 leading-snug group-hover:text-red-600 transition-colors">
                  {article.title}
                </h3>
              </Link>
              <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                <span>By {article.author}</span>
                <span>{article.publishedAt}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Ad Space */}
      <section className="mt-16 bg-black rounded-2xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 italic">Support independent journalism that makes a difference.</h2>
          <p className="text-gray-400 mb-8 text-lg">Subscribe to Chronicle Daily Plus for ad-free experience, exclusive deep dives, and early access to our weekly podcasts.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-xl shadow-red-900/20">
            Get Unlimited Access
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
