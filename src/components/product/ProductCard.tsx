import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-${featured ? 'lg' : 'md'} overflow-hidden hover:shadow-${featured ? 'xl' : 'lg'} transition-all duration-300 ${featured ? 'transform hover:-translate-y-1' : ''}`}>
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        {featured && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            ویژه
          </div>
        )}
      </div>
      <div className="p-4">
        {!featured && (
          <div className="text-xs text-blue-600 font-medium mb-1">{product.category}</div>
        )}
        <h4 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className={`${featured ? 'text-xl' : 'text-lg'} font-bold text-blue-600`}>
            {product.price.toLocaleString()}
            <span className="text-sm text-gray-500 mr-1">تومان</span>
          </span>
          <button className={`bg-blue-600 text-white px-${featured ? '4' : '3'} py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm`}>
            {featured ? 'افزودن به سبد' : 'خرید'}
          </button>
        </div>
      </div>
    </div>
  );
}