import { Product } from '../types/Product';

class ProductStore {
  private products: Product[] = [
    {
      id: '1',
      name: 'لپ تاپ گیمینگ ASUS ROG',
      price: 25000000,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop',
      description: 'لپ تاپ قدرتمند برای بازی با پردازنده Intel Core i7',
      category: 'لپ تاپ'
    },
    {
      id: '2',
      name: 'آیفون 15 پرو مکس',
      price: 45000000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
      description: 'جدیدترین گوشی اپل با دوربین پیشرفته',
      category: 'موبایل'
    },
    {
      id: '3',
      name: 'هدفون بی‌سیم Sony',
      price: 3500000,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
      description: 'هدفون با کیفیت صدای عالی و نویز کنسلینگ',
      category: 'صوتی'
    },
    {
      id: '4',
      name: 'ساعت هوشمند Apple Watch',
      price: 12000000,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=200&fit=crop',
      description: 'ساعت هوشمند با امکانات سلامتی پیشرفته',
      category: 'پوشیدنی'
    },
    {
      id: '5',
      name: 'تبلت iPad Pro',
      price: 28000000,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop',
      description: 'تبلت حرفه‌ای برای کار و تفریح',
      category: 'تبلت'
    },
    {
      id: '6',
      name: 'کیبورد مکانیکی گیمینگ',
      price: 2800000,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop',
      description: 'کیبورد مکانیکی با نورپردازی RGB',
      category: 'لوازم جانبی'
    },
    {
      id: '7',
      name: 'مانیتور 4K Dell',
      price: 8500000,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop',
      description: 'مانیتور 27 اینچی با کیفیت 4K',
      category: 'مانیتور'
    },
    {
      id: '8',
      name: 'دوربین Canon EOS R5',
      price: 95000000,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=200&fit=crop',
      description: 'دوربین حرفه‌ای برای عکاسی و فیلمبرداری',
      category: 'دوربین'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    this.products.push(newProduct);
  }

  updateProduct(id: string, product: Omit<Product, 'id'>): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...product, id };
    }
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}

export const productStore = new ProductStore();