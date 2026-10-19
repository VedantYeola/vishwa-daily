
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '../mockData';
import { CategoryType } from '../types';
import { generateNewsArticles } from '../services/geminiService';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [articles, setArticles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  // Always fetch news (service logic handles caching for speed)
  const loadNews = async (skipCache: boolean = false) => {
    if (skipCache) setRefreshing(true);
    else setLoading(true);

    try {
      const generated = await generateNewsArticles(categoryId, skipCache);
      if (generated && generated.length > 0) {
        setArticles(generated);
        if (skipCache) toast.success(`Updated ${categoryId} news feed!`);
      } else {
        // Fallback to mock only if generation/cache fails entirely
        setArticles(MOCK_ARTICLES.filter(a => a.category.toLowerCase() === categoryId?.toLowerCase()));
        if (skipCache) toast.error("Could not fetch new updates.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to refresh news.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  React.useEffect(() => {
    if (categoryId) {
      loadNews(false);
    }
  }, [categoryId]);

  const displayCategory = categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : '';

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
        <p className="mt-12 text-gray-500 font-serif italic">Scanning global wires for {displayCategory}...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 border-b border-gray-200 pb-8 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-5xl font-serif font-extrabold mb-4">{displayCategory}</h1>
          <p className="text-gray-500 max-w-2xl">
            Deep dives, expert analysis, and breaking stories across the world of {displayCategory.toLowerCase()}. Stay informed with our latest coverage.
          </p>
        </div>
        <button
          onClick={() => loadNews(true)}
          disabled={refreshing}
          className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Updating...' : 'Refresh News'}</span>
        </button>
      </header>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => (
            <article key={article.id} className="group">
              <Link to={`/article/${article.id}`} state={{ article }}>
                <div className="aspect-[3/2] overflow-hidden rounded-xl mb-6">
                  <img
                    src={article.imageUrl || `https://picsum.photos/seed/${article.id}/800/600`}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-2xl font-serif font-bold mb-4 group-hover:text-red-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-500 mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-xs font-medium text-gray-400">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.readTime} read</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 italic">We are currently curating the latest {displayCategory.toLowerCase()} stories for you. Check back soon!</p>
          <Link to="/" className="mt-4 inline-block text-red-600 font-bold hover:underline">Back to Home</Link>
        </div>
      )}
    </div>
  );
};
export default Category;
