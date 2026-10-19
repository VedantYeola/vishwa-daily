
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  Share2,
  Bookmark,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  User,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-react';
import { MOCK_ARTICLES } from '../mockData';
import { summarizeArticle } from '../services/geminiService';

const Article: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const location = useLocation();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Prefer article from state (generated), fallback to mock data
  const article = location.state?.article || MOCK_ARTICLES.find(art => art.id === articleId);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAiSummary(null);
  }, [articleId]);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Article Not Found</h2>
        <Link to="/" className="text-red-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const summary = await summarizeArticle(article.content);
    setAiSummary(summary);
    setIsSummarizing(false);
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <Link to="/" className="flex items-center text-sm text-gray-400 hover:text-black mb-8 group">
          <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to News
        </Link>

        <div className="flex items-center space-x-4 mb-6">
          <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {article.category}
          </span>
          <span className="text-gray-400 text-sm">{article.readTime} read</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-black mb-8 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-y border-gray-100 mb-12 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-black">{article.author}</p>
              <p className="text-xs text-gray-500">Published on {article.publishedAt}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-blue-500 transition-colors"><Twitter size={20} /></button>
            <button className="text-gray-400 hover:text-blue-700 transition-colors"><Linkedin size={20} /></button>
            <button className="text-gray-400 hover:text-blue-600 transition-colors"><Facebook size={20} /></button>
            <button className="text-gray-400 hover:text-black transition-colors"><Share2 size={20} /></button>
            <button className="text-gray-400 hover:text-black transition-colors"><Bookmark size={20} /></button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-center text-xs text-gray-400 mt-4 italic">Photography: Courtesy of Getty Images / Archive</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
        {/* Sidebar Tools */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-8 flex flex-col items-center">
            <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-600 hover:border-red-600 transition-all">
              <MessageCircle size={24} />
            </button>
            <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-black transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="lg:col-span-7">
          <div className="prose prose-lg prose-red max-w-none text-gray-800 leading-relaxed font-serif text-xl space-y-6">
            <p className="font-bold text-2xl mb-8 leading-snug italic text-gray-600 border-l-4 border-red-600 pl-6">
              {article.excerpt}
            </p>
            {article.content.split('. ').map((para, idx) => (
              <p key={idx}>{para}.</p>
            ))}
            <p>Moreover, the implications of this development cannot be overstated. As we look towards the next decade, the shift in infrastructure and public perception will play a pivotal role in how these technologies are adopted. Governments are already racing to draft regulations that balance innovation with safety, though progress remains slow in many jurisdictions.</p>
            <p>Industry experts emphasize that this is merely the beginning. "We are seeing a transformation that happens once in a generation," says one lead researcher. Whether this leads to a more equitable future remains to be seen, but the momentum is undeniable.</p>
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-xl font-serif font-bold mb-6">Discussion (24)</h3>
            <textarea
              className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 mb-4"
              rows={3}
              placeholder="Join the conversation..."
            ></textarea>
            <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-800">
              Post Comment
            </button>
          </div>
        </div>

        {/* AI Widget & Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          {/* AI Summary Card */}
          <div className="bg-white border border-red-100 rounded-2xl p-8 shadow-xl shadow-red-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <Sparkles size={24} className="text-red-400 opacity-50" />
            </div>
            <h3 className="text-lg font-bold flex items-center mb-6">
              <Sparkles size={18} className="mr-2 text-red-600" />
              AI Insight Engine
            </h3>

            {!aiSummary ? (
              <div>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  Too busy to read the whole piece? Let our AI distillation tool extract the most critical takeaways for you in seconds.
                </p>
                <button
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center"
                >
                  {isSummarizing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Summarizing...
                    </span>
                  ) : 'Generate AI Summary'}
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-red-50 p-4 rounded-xl text-sm text-gray-800 leading-relaxed font-medium mb-6">
                  {aiSummary.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                  ))}
                </div>
                <button
                  onClick={() => setAiSummary(null)}
                  className="text-xs text-gray-400 hover:text-black font-bold uppercase tracking-widest"
                >
                  Regenerate
                </button>
              </div>
            )}
          </div>

          {/* Related Articles */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6 flex items-center">
              <div className="w-8 h-[2px] bg-red-600 mr-3"></div>
              Related Reading
            </h3>
            <div className="space-y-8">
              {MOCK_ARTICLES.filter(a => a.id !== articleId).slice(0, 3).map(art => (
                <Link key={art.id} to={`/article/${art.id}`} className="group flex space-x-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img src={art.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold group-hover:text-red-600 transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">{art.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
