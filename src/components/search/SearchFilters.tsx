interface SearchFiltersProps {
  filters: {
    type: 'all' | 'product' | 'article';
    category: string;
    priceRange: [number, number];
  };
  onFiltersChange: (filters: any) => void;
  categories: string[];
}

export default function SearchFilters({ filters, onFiltersChange, categories }: SearchFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">فیلترها</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نوع</label>
          <select
            value={filters.type}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="all">همه</option>
            <option value="product">محصولات</option>
            <option value="article">مقالات</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">همه دسته‌ها</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">محدوده قیمت</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="از"
              value={filters.priceRange[0] || ''}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                priceRange: [Number(e.target.value) || 0, filters.priceRange[1]] 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="تا"
              value={filters.priceRange[1] || ''}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                priceRange: [filters.priceRange[0], Number(e.target.value) || 0] 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => onFiltersChange({ type: 'all', category: '', priceRange: [0, 0] })}
        className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
      >
        پاک کردن فیلترها
      </button>
    </div>
  );
}