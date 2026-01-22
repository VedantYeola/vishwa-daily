
export enum CategoryType {
  TECH = 'Tech',
  POLITICS = 'Politics',
  WORLD = 'World',
  SPORTS = 'Sports',
  SCIENCE = 'Science',
  LIFESTYLE = 'Lifestyle'
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: CategoryType;
  imageUrl: string;
  readTime: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}
