import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const products: Product[] = [
    {
      id: 1,
      name: "تعمیر ECU خودرو",
      description:
        "تعمیر تخصصی ECU انواع خودروهای داخلی و خارجی با گارانتی معتبر",
      price: "از 1,500,000 تومان",
      image: "/images/ecu-repair.jpg",
      category: "ecu",
    },
    {
      id: 2,
      name: "تعمیر بورد ABS",
      description:
        "تعمیر و عیب‌یابی بورد ABS با استفاده از پیشرفته‌ترین تجهیزات",
      price: "از 1,200,000 تومان",
      image: "/images/abs-repair.jpg",
      category: "abs",
    },
    {
      id: 3,
      name: "تعمیر بورد ایربگ",
      description: "تعمیر تخصصی بورد ایربگ با دقت و کیفیت بالا",
      price: "از 1,000,000 تومان",
      image: "/images/airbag-repair.jpg",
      category: "airbag",
    },
    {
      id: 4,
      name: "تعمیر بورد کولر",
      description: "تعمیر و عیب‌یابی بورد کولر خودرو با گارانتی معتبر",
      price: "از 800,000 تومان",
      image: "/images/ac-repair.jpg",
      category: "ac",
    },
  ];

  const categories = [
    { id: "all", name: "همه محصولات" },
    { id: "ecu", name: "ECU" },
    { id: "abs", name: "ABS" },
    { id: "airbag", name: "ایربگ" },
    { id: "ac", name: "کولر" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          محصولات و خدمات ما
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gray-200">
                {/* Placeholder for product image */}
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">تصویر محصول</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">
                    {product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    جزئیات بیشتر
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
