import { Product } from '../../types/Product';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">محصولات مرتبط</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.location.href = `/product/${product.id}`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h4 className="font-semibold mb-2 text-sm line-clamp-2">{product.name}</h4>
            <p className="text-blue-600 font-bold text-sm">
              {product.price.toLocaleString()} تومان
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}