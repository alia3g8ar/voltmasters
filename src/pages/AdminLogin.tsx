import { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center rtl">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800">ورود مدیر</h2>
          <p className="text-gray-600 mt-2">برای دسترسی به پنل مدیریت</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="نام کاربری خود را وارد کنید"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="رمز عبور خود را وارد کنید"
              required
            />
          </div>
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm text-center rounded-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🔑 ورود به پنل
          </button>
        </form>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-center text-sm text-gray-600 mb-2">اطلاعات ورود تست:</p>
          <div className="text-center text-sm">
            <p className="text-gray-700">👤 نام کاربری: <code className="bg-gray-200 px-2 py-1 rounded">admin</code></p>
            <p className="text-gray-700 mt-1">🔒 رمز عبور: <code className="bg-gray-200 px-2 py-1 rounded">admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}