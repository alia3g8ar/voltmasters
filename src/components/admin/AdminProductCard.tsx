import { Product } from '../../types/Product';

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function AdminProductCard({ product, onEdit, onDelete }: AdminProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <p className="text-xl font-bold text-blue-600 mb-4">
          {product.price.toLocaleString()}
          <span className="text-sm text-gray-500 mr-1">تومان</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
          >
            ✏️ ویرایش
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            🗑️ حذف
          </button>
        </div>
      </div>
    </div>
  );
}