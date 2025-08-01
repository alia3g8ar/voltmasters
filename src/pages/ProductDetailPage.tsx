import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { ProductService } from '../services/ProductService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Breadcrumb from '../components/common/Breadcrumb';
import ImageGallery from '../components/product-detail/ImageGallery';
import ProductSpecs from '../components/product-detail/ProductSpecs';
import ReviewsSection from '../components/product-detail/ReviewsSection';
import RelatedProducts from '../components/product-detail/RelatedProducts';

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const mockReviews = [
    { id: '1', user: 'علی احمدی', rating: 5, comment: 'محصول عالی و کیفیت بالا', date: '2024-01-15' },
    { id: '2', user: 'فاطمه رضایی', rating: 4, comment: 'خوب بود اما قیمت کمی بالاست', date: '2024-01-10' }
  ];
  
  const mockSpecs = {
    'عمومی': {
      'برند': 'برند محصول',
      'مدل': 'مدل 2024',
      'رنگ': 'مشکی',
      'وزن': '2.5 کیلوگرم'
    },
    'فنی': {
      'پردازنده': 'Intel Core i7',
      'حافظه': '16GB DDR4',
      'ذخیره': '512GB SSD',
      'کارت گرافیک': 'RTX 3060'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await ProductService.getProducts();
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct || null);
      
      if (foundProduct) {
        const related = products
          .filter(p => p.id !== productId && p.category === foundProduct.category)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    };
    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 rtl">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div>
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 rtl">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">محصول یافت نشد</h1>
          <a href="/search" className="text-blue-600 hover:underline">بازگشت به جستجو</a>
        </div>
        <Footer />
      </div>
    );
  }

  const images = [product.image, product.image, product.image];
  const breadcrumbItems = [
    { label: 'خانه', href: '/' },
    { label: 'محصولات', href: '/products' },
    { label: product.category, href: `/products?category=${product.category}` },
    { label: product.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ImageGallery images={images} productName={product.name} />

          <div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-4">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {product.price.toLocaleString()} تومان
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-3">
                🛒 افزودن به سبد خرید
              </button>
              <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                ❤️ افزودن به علاقه‌مندی‌ها
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-3">اشتراک‌گذاری</h3>
              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">تلگرام</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">واتساپ</button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">کپی لینک</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <ProductSpecs specs={mockSpecs} />
          <ReviewsSection reviews={mockReviews} averageRating={4.5} />
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>

      <Footer />
    </div>
  );
}