export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  avatarInitials: string;
  avatarColor: string;
  online?: boolean;
}

export interface Category {
  id: number;
  slug: string;
  name_en: string;
  name_so: string | null;
  description_en: string | null;
  description_so: string | null;
  icon: string;
  parentId: number | null;
  order: number | null;
  createdAt: string | null;
  createdBy: number;
}

export interface Article {
  id: number;
  slug: string;
  categoryId: number;
  type: string;
  title_en: string;
  title_so: string | null;
  content_en: string;
  content_so: string | null;
  excerpt_en: string | null;
  excerpt_so: string | null;
  views: number | null;
  featured: boolean | null;
  tags: string[];
  authorId: number | null;
  relatedArticles: number[] | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Media {
  id: number;
  categoryId: number;
  type: string;
  articleId: number | null;
  title_en: string;
  title_so: string | null;
  description_en: string | null;
  description_so: string | null;
  fileUrl: string;
  thumbnailUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Question {
  id: number;
  status: string;
  name: string | null;
  email: string | null;
  question_en: string;
  question_so: string | null;
  responseArticleId: number | null;
  createdAt: string | null;
}