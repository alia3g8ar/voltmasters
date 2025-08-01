export default function TrustBadges() {
  const badges = [
    { icon: '🚚', title: 'ارسال رایگان', desc: 'برای خریدهای بالای ۵ میلیون' },
    { icon: '🔒', title: 'پرداخت امن', desc: 'تضمین امنیت اطلاعات' },
    { icon: '🔄', title: 'ضمانت بازگشت', desc: '۷ روز ضمانت بازگشت کالا' },
    { icon: '⭐', title: 'کیفیت تضمینی', desc: 'محصولات اصل و باکیفیت' }
  ];

  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-3">{badge.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">{badge.title}</h4>
              <p className="text-sm text-gray-600">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}