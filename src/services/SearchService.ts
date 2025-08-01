import { SearchItem } from '../types/SearchItem';
import { ProductService } from './ProductService';
import { ArticleService } from './ArticleService';

export class SearchService {
  static async search(query: string, filters?: {
    type?: 'product' | 'article';
    category?: string;
    priceRange?: [number, number];
    dateRange?: [string, string];
  }): Promise<SearchItem[]> {
    const [products, articles] = await Promise.all([
      ProductService.getProducts(),
      ArticleService.getArticles()
    ]);

    const searchItems: SearchItem[] = [
      ...products.map(p => ({ ...p, type: 'product' as const })),
      ...articles.map(a => ({ ...a, type: 'article' as const }))
    ];

    return searchItems.filter(item => {
      const itemName = item.type === 'product' ? (item as any).name : (item as any).title;
      const itemDesc = item.type === 'product' ? (item as any).description : (item as any).excerpt;
      
      const matchesQuery = !query || 
        itemName?.toLowerCase().includes(query.toLowerCase()) ||
        itemDesc?.toLowerCase().includes(query.toLowerCase());

      const matchesType = !filters?.type || item.type === filters.type;
      const matchesCategory = !filters?.category || item.category === filters.category;

      return matchesQuery && matchesType && matchesCategory;
    });
  }

  static async getSuggestions(query: string): Promise<string[]> {
    if (!query || query.length < 2) return [];
    
    const items = await this.search(query);
    const suggestions = items
      .map(item => item.type === 'product' ? (item as any).name : (item as any).title)
      .filter(name => name?.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);

    return [...new Set(suggestions)];
  }
}