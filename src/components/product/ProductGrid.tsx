import { Product } from '../../types/Product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  featured?: boolean;
}

export default function ProductGrid({ products, featured = false }: ProductGridProps) {
  const gridCols = featured 
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" 
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} featured={featured} />
      ))}
    </div>
  );
}