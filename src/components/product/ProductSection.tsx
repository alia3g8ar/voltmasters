import { Product } from '../../types/Product';
import ProductGrid from './ProductGrid';
import ProductSkeleton from './ProductSkeleton';
import SectionHeader from '../common/SectionHeader';

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  loading?: boolean;
  featured?: boolean;
  id?: string;
  bgColor?: string;
}

export default function ProductSection({ 
  title, 
  subtitle, 
  products, 
  loading = false, 
  featured = false, 
  id,
  bgColor = "bg-white"
}: ProductSectionProps) {
  return (
    <section className={`py-16 ${bgColor}`} id={id}>
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} />
        {loading ? (
          <div className={`grid ${featured ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
            {[...Array(featured ? 4 : 8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ProductGrid products={products} featured={featured} />
        )}
      </div>
    </section>
  );
}