import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { ProductService } from '../services/ProductService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import ContactForm from '../components/ContactForm';
import TrustBadges from '../components/TrustBadges';
import CustomerReviews from '../components/CustomerReviews';
import ProductSection from '../components/product/ProductSection';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const allProducts = await ProductService.getProducts();
      setProducts(allProducts);
      setFeaturedProducts(allProducts.slice(0, 4));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <Header />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Trust Badges */}
      <TrustBadges />

      <ProductSection
        title="محصولات ویژه"
        subtitle="بهترین و محبوب‌ترین محصولات ما"
        products={featuredProducts}
        loading={loading}
        featured={true}
        id="featured"
        bgColor="bg-white"
      />

      <ProductSection
        title="تمامی محصولات"
        subtitle="مجموعه کاملی از بهترین محصولات تکنولوژی"
        products={products}
        loading={loading}
        featured={false}
        id="products"
        bgColor="bg-gray-50"
      />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* About Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Contact Form */}
      <div id="contact">
        <ContactForm />
      </div>

      <Footer />
    </div>
  );
}