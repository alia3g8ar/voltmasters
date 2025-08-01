import { Product } from '../../types/Product';

interface ProductFormProps {
  formData: {
    name: string;
    price: string;
    image: string;
    description: string;
    category: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  editingProduct: Product | null;
}

export default function ProductForm({ formData, setFormData, onSubmit, onCancel, editingProduct }: ProductFormProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {editingProduct ? '✏️ ویرایش محصول' : '➕ افزودن محصول جدید'}
      </h3>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نام محصول</label>
          <input
            type="text"
            placeholder="نام محصول را وارد کنید"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">قیمت (تومان)</label>
          <input
            type="number"
            placeholder="قیمت به تومان"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">لینک تصویر</label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
          <input
            type="text"
            placeholder="دسته‌بندی محصول"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
          <textarea
            placeholder="توضیحات کامل محصول را بنویسید"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div className="md:col-span-2 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            {editingProduct ? '✅ بروزرسانی' : '➕ افزودن'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            ❌ انصراف
          </button>
        </div>
      </form>
    </div>
  );
}