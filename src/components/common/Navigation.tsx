export default function Navigation() {
  return (
    <nav className="hidden md:flex space-x-6 space-x-reverse">
      <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">خانه</a>
      <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">محصولات</a>
      <a href="/articles" className="text-gray-700 hover:text-blue-600 transition-colors">مقالات</a>
      <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">درباره ما</a>
      <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">تماس</a>
    </nav>
  );
}