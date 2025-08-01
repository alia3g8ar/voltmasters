import { Article } from '../types/Article';

const API_URL = 'http://localhost:3001/articles';

export class ArticleService {
  static async getArticles(): Promise<Article[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch articles');
      return await response.json();
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  static async getArticle(id: string): Promise<Article | null> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch article');
      return await response.json();
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  }

  static async addArticle(article: Omit<Article, 'id'>): Promise<Article | null> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      if (!response.ok) throw new Error('Failed to add article');
      return await response.json();
    } catch (error) {
      console.error('Error adding article:', error);
      return null;
    }
  }

  static async updateArticle(id: string, article: Omit<Article, 'id'>): Promise<Article | null> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...article, id })
      });
      if (!response.ok) throw new Error('Failed to update article');
      return await response.json();
    } catch (error) {
      console.error('Error updating article:', error);
      return null;
    }
  }

  static async deleteArticle(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting article:', error);
      return false;
    }
  }
}