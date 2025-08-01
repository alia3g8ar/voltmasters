export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: 'احمد محمدی',
      rating: 5,
      comment: 'کیفیت محصولات عالی و ارسال سریع. پیشنهاد می‌کنم.',
      product: 'لپ تاپ گیمینگ'
    },
    {
      id: 2,
      name: 'فاطمه احمدی',
      rating: 5,
      comment: 'خدمات پس از فروش بسیار خوب و قیمت‌ها مناسب.',
      product: 'آیفون 15 پرو'
    },
    {
      id: 3,
      name: 'علی رضایی',
      rating: 4,
      comment: 'تجربه خرید خوبی داشتم. محصول طبق توضیحات بود.',
      product: 'هدفون بی‌سیم'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">نظرات مشتریان</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div className="mr-3">
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-3">"{review.comment}"</p>
              <p className="text-sm text-blue-600 font-medium">خرید: {review.product}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}