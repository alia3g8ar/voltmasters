import { useState, useEffect } from 'react';
import { SearchItem } from '../types/SearchItem';
import { SearchService } from '../services/SearchService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SearchBar from '../components/search/SearchBar';
import SearchFilters from '../components/search/SearchFilters';
import UnifiedCard from '../components/search/UnifiedCard';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'product' | 'article',
    category: '',
    priceRange: [0, 0] as [number, number]
  });

  const categories = ['لپ تاپ', 'موبایل', 'لوازم جانبی', 'دوربین', 'تکنولوژی', 'راهنما'];

  useEffect(() => {
    performSearch();
  }, [query, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const results = await SearchService.search(query, {
        type: filters.type === 'all' ? undefined : filters.type,
        category: filters.category || undefined,
        priceRange: filters.priceRange[0] > 0 || filters.priceRange[1] > 0 ? filters.priceRange : undefined
      });
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (item: SearchItem) => {
    const path = item.type === 'product' ? `/product/${item.id}` : `/article/${item.id}`;
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">جستجو در محصولات و مقالات</h1>
          <SearchBar onSearch={setQuery} />
        </div>

        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
        />

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            نتایج جستجو {query && `برای "${query}"`}
          </h2>
          <span className="text-gray-600">
            {searchResults.length} نتیجه یافت شد
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map(item => (
              <UnifiedCard
                key={`${item.type}-${item.id}`}
                item={item}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-600 mb-4">
              {query ? `برای "${query}" نتیجه‌ای پیدا نکردیم` : 'لطفاً عبارت جستجو وارد کنید'}
            </p>
            <div className="text-sm text-gray-500">
              <p>پیشنهادات:</p>
              <ul className="mt-2 space-y-1">
                <li>• کلمات کلیدی مختلف امتحان کنید</li>
                <li>• املای کلمات را بررسی کنید</li>
                <li>• فیلترها را تغییر دهید</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}