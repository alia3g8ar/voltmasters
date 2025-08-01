import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: 'جدیدترین محصولات تکنولوژی',
    subtitle: 'با بهترین قیمت‌ها و کیفیت بالا',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    cta: 'مشاهده محصولات'
  },
  {
    id: 2,
    title: 'تخفیف ویژه تا ۵۰٪',
    subtitle: 'فرصت طلایی برای خرید محصولات مورد علاقه‌تان',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    cta: 'خرید کنید'
  },
  {
    id: 3,
    title: 'ارسال رایگان',
    subtitle: 'برای خریدهای بالای ۵ میلیون تومان',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop',
    cta: 'اطلاعات بیشتر'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-8">{slide.subtitle}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}