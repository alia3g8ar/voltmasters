import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { ProductService } from '../services/ProductService';
import AdminHeader from '../components/admin/AdminHeader';
import ProductForm from '../components/admin/ProductForm';
import AdminProductCard from '../components/admin/AdminProductCard';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: ''
  });

  const fetchProducts = async () => {
    const allProducts = await ProductService.getProducts();
    setProducts(allProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
      description: formData.description,
      category: formData.category
    };

    if (editingProduct) {
      await ProductService.updateProduct(editingProduct.id, productData);
    } else {
      await ProductService.addProduct(productData);
    }

    await fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', image: '', description: '', category: '' });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('آیا از حذف این محصول مطمئن هستید؟')) {
      await ProductService.deleteProduct(id);
      await fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">پنل مدیریت</h2>
            <div className="flex gap-3">
              <a
                href="/admin/articles"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                📝 مدیریت مقالات
              </a>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                ➕ افزودن محصول
              </button>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-700">مدیریت محصولات</h3>
        </div>

        {showForm && (
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
              setFormData({ name: '', price: '', image: '', description: '', category: '' });
            }}
            editingProduct={editingProduct}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <AdminProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}