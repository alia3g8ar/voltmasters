export default function AdminHeader() {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-800">🛠️ پنل مدیریت</h1>
          <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            ← بازگشت به سایت
          </a>
        </div>
      </div>
    </header>
  );
}