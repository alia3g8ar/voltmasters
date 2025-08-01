import { Product } from './Product';
import { Article } from './Article';

export type SearchItem = (Product | Article) & {
  type: 'product' | 'article';
};