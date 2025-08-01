import Logo from './Logo';
import Navigation from './Navigation';
import CartButton from './CartButton';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Logo />
            <Navigation />
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <CartButton />
            <a href="/admin" className="text-gray-600 hover:text-blue-600 text-sm">ادمین</a>
          </div>
        </div>
      </div>
    </header>
  );
}