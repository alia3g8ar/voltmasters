const Hero = () => {
  return (
    <section
      id="home"
      className="pt-32 pb-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            تخصص در تعمیر برق خودرو و بوردهای الکترونیکی
          </h1>
          <p className="text-xl mb-8">
            با بیش از 15 سال تجربه در تعمیر و نگهداری سیستم‌های الکترونیکی خودرو
          </p>
          <a
            href="#contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            درخواست مشاوره رایگان
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
