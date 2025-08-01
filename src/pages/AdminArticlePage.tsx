import { useState, useEffect } from 'react';
import { Article } from '../types/Article';
import { ArticleService } from '../services/ArticleService';
import AdminHeader from '../components/admin/AdminHeader';

export default function AdminArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    category: '',
    tags: '',
    readTime: 5,
    status: 'draft'
  });

  const fetchArticles = async () => {
    const allArticles = await ArticleService.getArticles();
    setArticles(allArticles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const articleData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
      author: formData.author,
      date: new Date().toISOString().split('T')[0],
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      readTime: formData.readTime
    };

    if (editingArticle) {
      await ArticleService.updateArticle(editingArticle.id, articleData);
    } else {
      await ArticleService.addArticle(articleData);
    }
    
    await fetchArticles();
    setShowForm(false);
    setEditingArticle(null);
    setFormData({
      title: '', excerpt: '', content: '', image: '', author: '',
      category: '', tags: '', readTime: 5, status: 'draft'
    });
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
      author: article.author,
      category: article.category,
      tags: article.tags.join(', '),
      readTime: article.readTime,
      status: 'published'
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('آیا از حذف این مقاله مطمئن هستید؟')) {
      await ArticleService.deleteArticle(id);
      await fetchArticles();
    }
  };

  const handlePreview = () => {
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <html dir="rtl">
          <head>
            <title>${formData.title}</title>
            <style>
              body { font-family: Tahoma, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
              img { max-width: 100%; height: auto; }
              h1 { color: #1e40af; }
            </style>
          </head>
          <body>
            <h1>${formData.title}</h1>
            <img src="${formData.image}" alt="${formData.title}" />
            <p><strong>نویسنده:</strong> ${formData.author}</p>
            <p><strong>دسته‌بندی:</strong> ${formData.category}</p>
            <p><strong>زمان مطالعه:</strong> ${formData.readTime} دقیقه</p>
            <hr>
            <div>${formData.content.replace(/\n/g, '<br>')}</div>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">مدیریت مقالات</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center"
          >
            ➕ افزودن مقاله جدید
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              {editingArticle ? '✏️ ویرایش مقاله' : '➕ افزودن مقاله جدید'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عنوان مقاله *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نویسنده *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">خلاصه مقاله *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">محتوای کامل مقاله *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="محتوای کامل مقاله را اینجا بنویسید..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">لینک تصویر شاخص</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">انتخاب دسته‌بندی</option>
                    <option value="تکنولوژی">تکنولوژی</option>
                    <option value="راهنما">راهنما</option>
                    <option value="اخبار">اخبار</option>
                    <option value="بررسی">بررسی</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">زمان مطالعه (دقیقه)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: Number(e.target.value)})}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">برچسب‌ها (با کاما جدا کنید)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="تکنولوژی, موبایل, راهنما"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  {editingArticle ? '✅ بروزرسانی' : '➕ انتشار مقاله'}
                </button>
                <button
                  type="button"
                  onClick={handlePreview}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  👁️ پیش‌نمایش
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingArticle(null);
                    setFormData({
                      title: '', excerpt: '', content: '', image: '', author: '',
                      category: '', tags: '', readTime: 5, status: 'draft'
                    });
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  ❌ انصراف
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.date).toLocaleDateString('fa-IR')}
                  </span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{article.title}</h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="text-xs text-gray-500 mb-4">
                  👤 {article.author} • ⏱️ {article.readTime} دقیقه
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                  >
                    ✏️ ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    🗑️ حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}