import { useState, useEffect } from 'react';
import { Article } from '../types/Article';
import { ArticleService } from '../services/ArticleService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Breadcrumb from '../components/common/Breadcrumb';

interface ArticleDetailPageProps {
  articleId: string;
}

export default function ArticleDetailPage({ articleId }: ArticleDetailPageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const result = await ArticleService.getArticle(articleId);
      setArticle(result);
      setLoading(false);
    };
    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 rtl">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 rtl">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">مقاله یافت نشد</h1>
          <a href="/articles" className="text-blue-600 hover:underline">بازگشت به مقالات</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      <Header />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={[
          { label: 'خانه', href: '/' },
          { label: 'مقالات', href: '/articles' },
          { label: article.category, href: `/articles?category=${article.category}` },
          { label: article.title }
        ]} />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span>👤 {article.author}</span>
              <span>📅 {new Date(article.date).toLocaleDateString('fa-IR')}</span>
              <span>⏱️ {article.readTime} دقیقه مطالعه</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="prose prose-lg max-w-none mb-8 leading-relaxed">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">برچسب‌ها:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="border-t pt-6 mb-8">
              <h3 className="font-semibold mb-3">اشتراک‌گذاری مقاله</h3>
              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">تلگرام</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">واتساپ</button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">کپی لینک</button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4">نظرات</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <textarea
                  placeholder="نظر خود را بنویسید..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  ارسال نظر
                </button>
              </div>
              
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                        ک{i + 1}
                      </div>
                      <span className="font-semibold">کاربر {i + 1}</span>
                      <span className="text-sm text-gray-500">۲ روز پیش</span>
                    </div>
                    <p className="text-gray-700">
                      مقاله بسیار مفیدی بود. ممنون از اشتراک‌گذاری این اطلاعات.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">مقالات مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img src={article.image} alt="" className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">مقاله مرتبط {i + 1}</h3>
                  <p className="text-sm text-gray-600 mb-2">خلاصه‌ای از مقاله مرتبط...</p>
                  <div className="text-xs text-gray-500">
                    📅 {new Date().toLocaleDateString('fa-IR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}