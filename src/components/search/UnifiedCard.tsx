import { SearchItem } from '../../types/SearchItem';

interface UnifiedCardProps {
  item: SearchItem;
  onClick: () => void;
}

export default function UnifiedCard({ item, onClick }: UnifiedCardProps) {
  const isProduct = item.type === 'product';
  const title = isProduct ? (item as any).name : (item as any).title;
  const description = isProduct ? (item as any).description : (item as any).excerpt;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          {item.category}
        </div>
        <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-full text-xs">
          {isProduct ? '🛍️ محصول' : '📄 مقاله'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          {isProduct ? (
            <span className="text-lg font-bold text-blue-600">
              {((item as any).price || 0).toLocaleString()}
              <span className="text-sm text-gray-500 mr-1">تومان</span>
            </span>
          ) : (
            <div className="text-sm text-gray-500">
              <span>👤 {(item as any).author}</span>
              <span className="mx-2">•</span>
              <span>⏱️ {(item as any).readTime} دقیقه</span>
            </div>
          )}
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            {isProduct ? 'مشاهده' : 'مطالعه'}
          </button>
        </div>
        
        {!isProduct && (
          <div className="mt-2 text-xs text-gray-400">
            📅 {new Date((item as any).date).toLocaleDateString('fa-IR')}
          </div>
        )}
      </div>
    </div>
  );
}