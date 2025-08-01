import { Product } from '../types/Product';

const API_URL = 'http://localhost:3001/products';

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  static async addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Failed to add product');
      return await response.json();
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  }

  static async updateProduct(id: string, product: Omit<Product, 'id'>): Promise<Product | null> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, id })
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  }

  static async deleteProduct(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }
}