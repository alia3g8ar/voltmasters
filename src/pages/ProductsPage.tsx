import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { ProductService } from '../services/ProductService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Breadcrumb from '../components/common/Breadcrumb';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const productsPerPage = 12;
  const categories = ['همه', 'لپ تاپ', 'موبایل', 'لوازم جانبی', 'دوربین', 'تبلت', 'مانیتور', 'صوتی', 'پوشیدنی'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const allProducts = await ProductService.getProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === 'همه' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name, 'fa');
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const breadcrumbItems = [
    { label: 'خانه', href: '/' },
    { label: 'محصولات' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">تمامی محصولات</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            فیلترها
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">جستجو</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="نام محصول..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'همه' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium mb-2">مرتب‌سازی</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="name">نام (الف-ی)</option>
                  <option value="price-low">قیمت (کم به زیاد)</option>
                  <option value="price-high">قیمت (زیاد به کم)</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setSortBy('name');
                }}
                className="w-full text-blue-600 hover:text-blue-800 text-sm"
              >
                پاک کردن فیلترها
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">
                {filteredProducts.length} محصول یافت شد
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
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
            ) : currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map(product => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => window.location.href = `/product/${product.id}`}
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {product.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-600">
                            {product.price.toLocaleString()}
                            <span className="text-sm text-gray-500 mr-1">تومان</span>
                          </span>
                          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            مشاهده
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
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">محصولی یافت نشد</h3>
                <p className="text-gray-600">فیلترهای خود را تغییر دهید</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}