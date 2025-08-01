import FooterBrand from './FooterBrand';

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <FooterBrand />
      <div>
        <h5 className="font-semibold mb-4">دسته‌بندی‌ها</h5>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-white">لپ تاپ</a></li>
          <li><a href="#" className="hover:text-white">موبایل</a></li>
          <li><a href="#" className="hover:text-white">لوازم جانبی</a></li>
          <li><a href="#" className="hover:text-white">دوربین</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-semibold mb-4">خدمات</h5>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-white">ارسال رایگان</a></li>
          <li><a href="#" className="hover:text-white">ضمانت بازگشت</a></li>
          <li><a href="#" className="hover:text-white">پشتیبانی ۲۴/۷</a></li>
          <li><a href="#" className="hover:text-white">نصب و راه‌اندازی</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-semibold mb-4">تماس با ما</h5>
        <ul className="space-y-2 text-gray-400">
          <li>📍 تهران، خیابان ولیعصر</li>
          <li>📞 ۰۲۱-۱۲۳۴۵۶۷۸</li>
          <li>✉️ info@shop.com</li>
        </ul>
      </div>
    </div>
  );
}