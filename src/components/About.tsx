const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">درباره ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                تعمیرگاه تخصصی VoltMasters با بیش از 15 سال سابقه درخشان در
                زمینه تعمیر و نگهداری سیستم‌های الکترونیکی خودرو، یکی از
                معتبرترین مراکز تعمیراتی در کشور است.
              </p>
              <p className="text-gray-600 mb-4">
                ما با استفاده از پیشرفته‌ترین تجهیزات و بهره‌گیری از متخصصین
                مجرب، آماده ارائه خدمات با کیفیت به مشتریان گرامی هستیم.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  تعمیر تخصصی سیستم‌های برق خودرو
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  تعمیر بوردهای الکترونیکی
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  گارانتی معتبر خدمات
                </li>
              </ul>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg">
              {/* Placeholder for about image */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
