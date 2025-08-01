import { useState, useEffect } from 'react';
import { Article } from '../types/Article';
import { ArticleService } from '../services/ArticleService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Breadcrumb from '../components/common/Breadcrumb';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const articlesPerPage = 9;
  const categories = ['همه', 'تکنولوژی', 'راهنما', 'اخبار', 'بررسی'];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const allArticles = await ArticleService.getArticles();
      setArticles(allArticles);
      setFilteredArticles(allArticles);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === 'همه' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [articles, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const breadcrumbItems = [
    { label: 'خانه', href: '/' },
    { label: 'مقالات' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">مقالات و راهنماها</h1>
          <p className="text-gray-600">آخرین مطالب و راهنماهای تخصصی</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در مقالات..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'همه' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-gray-600">
            {filteredArticles.length} مقاله یافت شد
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : currentArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArticles.map(article => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => window.location.href = `/article/${article.id}`}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span>👤 {article.author}</span>
                        <span className="mx-2">•</span>
                        <span>⏱️ {article.readTime} دقیقه</span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        مطالعه
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    قبلی
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    بعدی
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">مقاله‌ای یافت نشد</h3>
            <p className="text-gray-600">فیلترهای خود را تغییر دهید</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}