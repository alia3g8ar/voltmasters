import FooterLinks from './FooterLinks';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <FooterLinks />
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; ۲۰۲۴ فروشگاه آنلاین. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}