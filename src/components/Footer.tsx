const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VoltMasters</h3>
            <p className="text-gray-400">
              تعمیرگاه تخصصی برق خودرو و تعمیر بوردهای الکترونیکی
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">تماس با ما</h3>
            <p className="text-gray-400">آدرس: تهران، خیابان ولیعصر</p>
            <p className="text-gray-400">تلفن: 021-12345678</p>
            <p className="text-gray-400">ایمیل: info@voltmasters.ir</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">ساعات کاری</h3>
            <p className="text-gray-400">شنبه تا چهارشنبه: 9 صبح تا 8 شب</p>
            <p className="text-gray-400">پنجشنبه: 9 صبح تا 2 بعد از ظهر</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 VoltMasters. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
