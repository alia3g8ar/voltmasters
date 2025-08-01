import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ArticlesPage from './pages/ArticlesPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AdminPage from './pages/AdminPage';
import AdminArticlePage from './pages/AdminArticlePage';
import AdminLogin from './pages/AdminLogin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [routeParams, setRouteParams] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      const params: {[key: string]: string} = {};
      
      if (path === '/') {
        setCurrentPage('home');
      } else if (path === '/products') {
        setCurrentPage('products');
      } else if (path === '/articles') {
        setCurrentPage('articles');
      } else if (path.startsWith('/product/')) {
        setCurrentPage('product-detail');
        params.productId = path.split('/')[2];
      } else if (path.startsWith('/article/')) {
        setCurrentPage('article-detail');
        params.articleId = path.split('/')[2];
      } else if (path === '/admin') {
        setCurrentPage('admin');
      } else if (path === '/admin/articles') {
        setCurrentPage('admin-articles');
      } else {
        setCurrentPage('home');
      }
      
      setRouteParams(params);
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  // Admin routes
  if (currentPage === 'admin' || currentPage === 'admin-articles') {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    if (currentPage === 'admin-articles') {
      return <AdminArticlePage />;
    }
    return <AdminPage />;
  }

  // Public routes
  switch (currentPage) {
    case 'products':
      return <ProductsPage />;
    case 'articles':
      return <ArticlesPage />;
    case 'product-detail':
      return <ProductDetailPage productId={routeParams.productId} />;
    case 'article-detail':
      return <ArticleDetailPage articleId={routeParams.articleId} />;
    default:
      return <HomePage />;
  }
}

export default App;