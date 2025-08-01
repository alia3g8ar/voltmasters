import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">تماس با ما</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-6">اطلاعات تماس</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center ml-3">
                    <span className="text-white text-sm">📍</span>
                  </div>
                  <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center ml-3">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center ml-3">
                    <span className="text-white text-sm">✉️</span>
                  </div>
                  <span>info@shop.com</span>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="ایمیل"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
                <textarea
                  placeholder="پیام شما"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  ارسال پیام
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}