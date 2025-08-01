export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-800">درباره ما</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ما با بیش از ۱۰ سال تجربه در زمینه فروش محصولات تکنولوژی، بهترین برندهای دنیا را با قیمت‌های مناسب و کیفیت تضمینی به شما ارائه می‌دهیم.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              هدف ما ارائه بهترین خدمات و محصولات به مشتریان عزیز است تا تجربه خریدی لذت‌بخش و مطمئن داشته باشید.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">۱۰+</div>
                <div className="text-gray-600">سال تجربه</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">۵۰۰۰+</div>
                <div className="text-gray-600">مشتری راضی</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
              alt="درباره ما"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}