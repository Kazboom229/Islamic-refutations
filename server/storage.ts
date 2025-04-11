import {
  User,
  InsertUser,
  Category,
  InsertCategory,
  Article,
  InsertArticle,
  Media,
  InsertMedia,
  Question,
  InsertQuestion
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStatus(id: number, online: boolean): Promise<User | undefined>;
  
  // Categories
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  getSubcategories(parentId: number): Promise<Category[]>;
  addCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<Category>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  
  // Articles
  getArticle(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getAllArticles(): Promise<Article[]>;
  getArticlesByCategory(categoryId: number): Promise<Article[]>;
  getArticlesByType(type: string): Promise<Article[]>;
  addArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<Article>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  incrementArticleView(id: number): Promise<Article | undefined>;
  
  // Media
  getMedia(id: number): Promise<Media | undefined>;
  getAllMedia(): Promise<Media[]>;
  getMediaByCategory(categoryId: number): Promise<Media[]>;
  getMediaByType(type: string): Promise<Media[]>;
  getMediaByArticle(articleId: number): Promise<Media[]>;
  addMedia(media: InsertMedia): Promise<Media>;
  updateMedia(id: number, media: Partial<Media>): Promise<Media | undefined>;
  deleteMedia(id: number): Promise<boolean>;
  
  // Questions
  getQuestion(id: number): Promise<Question | undefined>;
  getAllQuestions(): Promise<Question[]>;
  getQuestionsByStatus(status: string): Promise<Question[]>;
  addQuestion(question: InsertQuestion): Promise<Question>;
  updateQuestionStatus(id: number, status: string, responseArticleId?: number): Promise<Question | undefined>;
  deleteQuestion(id: number): Promise<boolean>;
  
  // Helper methods
  initializeSampleData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private media: Map<number, Media>;
  private questions: Map<number, Question>;
  
  private userCounter: number;
  private categoryCounter: number;
  private articleCounter: number;
  private mediaCounter: number;
  private questionCounter: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.media = new Map();
    this.questions = new Map();
    
    this.userCounter = 1;
    this.categoryCounter = 1;
    this.articleCounter = 1;
    this.mediaCounter = 1;
    this.questionCounter = 1;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const timestamp = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: timestamp,
      online: false,
      role: insertUser.role || 'user'
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStatus(id: number, online: boolean): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, online };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Categories
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getSubcategories(parentId: number): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(
      (category) => category.parentId === parentId
    );
  }

  async addCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCounter++;
    const timestamp = new Date();
    const category: Category = { 
      ...insertCategory, 
      id, 
      createdAt: timestamp
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, updates: Partial<Category>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    
    const updatedCategory = { ...category, ...updates };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const exists = this.categories.has(id);
    if (!exists) return false;
    
    this.categories.delete(id);
    
    // Delete subcategories
    for (const [categoryId, category] of this.categories.entries()) {
      if (category.parentId === id) {
        this.categories.delete(categoryId);
      }
    }
    
    return true;
  }

  // Articles
  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug
    );
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => article.categoryId === categoryId
    );
  }

  async getArticlesByType(type: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => article.type === type
    );
  }

  async addArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleCounter++;
    const timestamp = new Date();
    const article: Article = { 
      ...insertArticle, 
      id, 
      views: 0,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticle(id: number, updates: Partial<Article>): Promise<Article | undefined> {
    const article = this.articles.get(id);
    if (!article) return undefined;
    
    const updatedArticle = { 
      ...article, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<boolean> {
    const exists = this.articles.has(id);
    if (!exists) return false;
    
    this.articles.delete(id);
    return true;
  }

  async incrementArticleView(id: number): Promise<Article | undefined> {
    const article = this.articles.get(id);
    if (!article) return undefined;
    
    const updatedArticle = { 
      ...article, 
      views: (article.views || 0) + 1 
    };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  // Media
  async getMedia(id: number): Promise<Media | undefined> {
    return this.media.get(id);
  }

  async getAllMedia(): Promise<Media[]> {
    return Array.from(this.media.values());
  }

  async getMediaByCategory(categoryId: number): Promise<Media[]> {
    return Array.from(this.media.values()).filter(
      (media) => media.categoryId === categoryId
    );
  }

  async getMediaByType(type: string): Promise<Media[]> {
    return Array.from(this.media.values()).filter(
      (media) => media.type === type
    );
  }

  async getMediaByArticle(articleId: number): Promise<Media[]> {
    return Array.from(this.media.values()).filter(
      (media) => media.articleId === articleId
    );
  }

  async addMedia(insertMedia: InsertMedia): Promise<Media> {
    const id = this.mediaCounter++;
    const timestamp = new Date();
    const media: Media = { 
      ...insertMedia, 
      id, 
      createdAt: timestamp,
      updatedAt: timestamp
    };
    this.media.set(id, media);
    return media;
  }

  async updateMedia(id: number, updates: Partial<Media>): Promise<Media | undefined> {
    const media = this.media.get(id);
    if (!media) return undefined;
    
    const updatedMedia = { 
      ...media, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.media.set(id, updatedMedia);
    return updatedMedia;
  }

  async deleteMedia(id: number): Promise<boolean> {
    const exists = this.media.has(id);
    if (!exists) return false;
    
    this.media.delete(id);
    return true;
  }

  // Questions
  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }

  async getQuestionsByStatus(status: string): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(
      (question) => question.status === status
    );
  }

  async addQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.questionCounter++;
    const timestamp = new Date();
    const question: Question = { 
      ...insertQuestion, 
      id, 
      status: 'pending',
      responseArticleId: null,
      createdAt: timestamp
    };
    this.questions.set(id, question);
    return question;
  }

  async updateQuestionStatus(id: number, status: string, responseArticleId?: number): Promise<Question | undefined> {
    const question = this.questions.get(id);
    if (!question) return undefined;
    
    const updatedQuestion = { 
      ...question, 
      status, 
      responseArticleId: responseArticleId ?? null
    };
    this.questions.set(id, updatedQuestion);
    return updatedQuestion;
  }

  async deleteQuestion(id: number): Promise<boolean> {
    const exists = this.questions.has(id);
    if (!exists) return false;
    
    this.questions.delete(id);
    return true;
  }

  // Helper methods
  async initializeSampleData(): Promise<void> {
    // Check if we already have data
    if (this.users.size > 0) return;
    
    // Create sample users
    const users: InsertUser[] = [
      {
        username: 'admin',
        password: 'admin123',
        name: 'Site Admin',
        email: 'admin@example.com',
        avatarInitials: 'SA',
        avatarColor: '#1a68d4',
        role: 'admin'
      },
      {
        username: 'editor',
        password: 'editor123',
        name: 'Content Editor',
        email: 'editor@example.com',
        avatarInitials: 'CE',
        avatarColor: '#10b981',
        role: 'admin'
      }
    ];
    
    const createdUsers: User[] = [];
    for (const userData of users) {
      const user = await this.createUser(userData);
      createdUsers.push(user);
    }
    
    // Create sample categories
    const categories: InsertCategory[] = [
      {
        name_en: 'Why Islam',
        name_so: 'Maxay Islaamku',
        description_en: 'Evidence for Islam and why it is the truth',
        description_so: 'Caddaynta Islaamka iyo sababta ay xaqiiqadu tahay',
        slug: 'why-islam',
        icon: 'star',
        order: 1,
        createdBy: createdUsers[0].id
      },
      {
        name_en: 'Philosophical Misconceptions',
        name_so: 'Qalad-fahamka Falsafadeed',
        description_en: 'Refutations of philosophical arguments against Islam',
        description_so: 'Diidmada doodaha falsafadeed ee ka soo horjeeda Islaamka',
        slug: 'philosophical-misconceptions',
        icon: 'brain',
        order: 2,
        createdBy: createdUsers[0].id
      },
      {
        name_en: 'Historical Misconceptions',
        name_so: 'Qalad-fahamka Taariikheed',
        description_en: 'Correcting historical errors about Islam',
        description_so: 'Saxitaanka khaladaadka taariikheed ee ku saabsan Islaamka',
        slug: 'historical-misconceptions',
        icon: 'landmark',
        order: 3,
        createdBy: createdUsers[0].id
      },
      {
        name_en: "Qur'anic Misconceptions",
        name_so: 'Qalad-fahamka Quraanka',
        description_en: 'Addressing misunderstandings about the Quran',
        description_so: 'Wax ka qabashada khalad-fahamka ku saabsan Quraanka',
        slug: 'quranic-misconceptions',
        icon: 'book',
        order: 4,
        createdBy: createdUsers[0].id
      },
      {
        name_en: 'Modern Ideological Debates',
        name_so: 'Doodaha Fikradeed ee Casriga ah',
        description_en: 'Islamic responses to modern ideological challenges',
        description_so: 'Jawaabaha Islaamiga ah ee caqabadaha fikradeed ee casriga ah',
        slug: 'modern-ideological-debates',
        icon: 'message-circle',
        order: 5,
        createdBy: createdUsers[0].id
      },
      {
        name_en: 'Multimedia Resources',
        name_so: 'Ilaha Warbaahinta',
        description_en: 'Videos, presentations, and interactive resources',
        description_so: 'Fiidiyowyada, soo-bandhigyada, iyo ilaha wada-dhismeed',
        slug: 'multimedia',
        icon: 'video',
        order: 6,
        createdBy: createdUsers[0].id
      }
    ];
    
    const createdCategories: Category[] = [];
    for (const categoryData of categories) {
      const category = await this.addCategory(categoryData);
      createdCategories.push(category);
    }
    
    // Create evidence for God subcategory
    const evidenceForGodCategory = await this.addCategory({
      name_en: 'Evidence for God',
      name_so: 'Caddaynta Ilaah',
      description_en: 'Logical and rational arguments for the existence of God',
      description_so: 'Doodaha caqliga ah iyo kuwa macquulka ah ee jiritaanka Ilaahay',
      slug: 'evidence-for-god',
      icon: 'sun',
      parentId: createdCategories[0].id,
      order: 1,
      createdBy: createdUsers[0].id
    });
    
    // Create sample articles
    const articles: InsertArticle[] = [
      {
        title_en: 'The Contingency Argument for God',
        title_so: 'Doodda Suurtogalnimada ee Ilaahay',
        content_en: `
# The Contingency Argument for God's Existence

The contingency argument is one of the most compelling logical proofs for the existence of God. It is based on the observation that everything in our universe is contingent - meaning it depends on something else for its existence.

## The Argument

1. Everything that exists has an explanation of its existence, either in the necessity of its own nature or in an external cause.
2. If the universe has an explanation of its existence, that explanation is God.
3. The universe exists.
4. Therefore, the universe has an explanation of its existence (from 1 and 3).
5. Therefore, the explanation of the universe's existence is God (from 2 and 4).

## Why This Matters

This argument demonstrates that belief in God is not irrational but is actually the most logical conclusion based on what we observe about the universe. The universe's existence is contingent - it didn't have to exist, and it depends on prior conditions. This leads us logically to a necessary being that exists by the necessity of its own nature.
        `,
        content_so: 'Somali translation would go here',
        excerpt_en: 'A logical proof for God based on the contingent nature of the universe',
        excerpt_so: 'Caddayn caqli ah oo Ilaahay ku salaysan dabeecadda suurtogalnimada ee koonka',
        slug: 'contingency-argument-for-god',
        type: 'evidence',
        categoryId: evidenceForGodCategory.id,
        tags: ['philosophy', 'logic', 'existence of God'],
        published: true,
        addedBy: createdUsers[0].id,
        relatedArticles: []
      },
      {
        title_en: 'The Problem of Evil - A Muslim Response',
        title_so: 'Dhibaatada Sharka - Jawaab Muslim ah',
        content_en: `
# The "Problem of Evil" - A Muslim Response

One of the most common objections to belief in God is the "problem of evil." If God is all-powerful and all-good, why does evil exist? Here's the Islamic perspective on this question.

## The Objection

The standard formulation goes like this:
1. If God exists, He is all-powerful, all-knowing, and all-good.
2. If God were all-powerful, He could prevent evil.
3. If God were all-knowing, He would know about all evil.
4. If God were all-good, He would want to prevent evil.
5. Evil exists.
6. Therefore, God does not exist.

## The Islamic Response

### 1. The Nature of This World

The Quran clearly states that this world is a place of test and trial:

*"[He] who created death and life to test you [as to] which of you is best in deed."* (Quran 67:2)

This world was never meant to be paradise. The presence of challenges, including evil, is part of the divine wisdom in creation.

### 2. Free Will

Allah has given humans free will, which necessarily means the ability to do evil. Without this freedom, moral responsibility would be meaningless.

### 3. Limited Perspective

Our human perspective is severely limited. What appears to be evil in isolation may serve a greater good in the complete picture.

### 4. Evil as Absence, Not Substance

Evil is not a "thing" created by God, but rather the absence of good, just as darkness is the absence of light.

### 5. Ultimate Justice

Any apparent injustice in this world will be rectified in the Hereafter, where perfect justice will prevail.

## Conclusion

The "problem of evil" only appears to be a problem because of our limited perspective and understanding. From the Islamic viewpoint, the existence of evil is consistent with God's wisdom, justice, and mercy when understood within the complete framework of creation, free will, and the Hereafter.
        `,
        content_so: 'Somali translation would go here',
        excerpt_en: 'Understanding why the existence of evil does not contradict belief in God',
        excerpt_so: 'Fahamka sababta jiritaanka sharka uusan khilaafin rumaysanka Ilaah',
        slug: 'problem-of-evil-muslim-response',
        type: 'refutation',
        categoryId: createdCategories[1].id,
        tags: ['philosophy', 'evil', 'theodicy'],
        published: true,
        addedBy: createdUsers[0].id,
        relatedArticles: []
      }
    ];
    
    const createdArticles: Article[] = [];
    for (const articleData of articles) {
      const article = await this.addArticle(articleData);
      createdArticles.push(article);
    }
    
    // Create sample media
    const media: InsertMedia[] = [
      {
        title_en: 'The Design Argument Explained',
        title_so: 'Doodda Naqshadeynta oo La Sharxay',
        description_en: 'A presentation explaining the teleological argument for God\'s existence',
        description_so: 'Soo-bandhig sharxaya doodda teleological ee jiritaanka Ilaahay',
        type: 'presentation',
        url: 'https://example.com/presentations/design-argument.pdf',
        thumbnailUrl: 'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc',
        categoryId: evidenceForGodCategory.id,
        addedBy: createdUsers[0].id,
        tags: ['design', 'teleology', 'creationism']
      },
      {
        title_en: 'Universe Simulation - Fine Tuning',
        title_so: 'Simulation Universe - Habayn Sare',
        description_en: '3D interactive model showing the fine-tuning of universal constants',
        description_so: 'Muuqaal 3D oo wada-dhisme ah oo muujinaya habaynta sare ee joogtada universal',
        type: '3d',
        url: 'https://example.com/models/fine-tuning-3d.glb',
        thumbnailUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
        categoryId: evidenceForGodCategory.id,
        addedBy: createdUsers[0].id,
        tags: ['cosmology', 'fine-tuning', 'physics']
      }
    ];
    
    for (const mediaData of media) {
      await this.addMedia(mediaData);
    }
    
    // Create sample questions
    const questions: InsertQuestion[] = [
      {
        name: 'Ahmed',
        email: 'ahmed@example.com',
        question_en: 'How do I respond to claims that the Quran contains scientific errors?',
        question_so: 'Sideen uga jawaabaa sheegtayada ah in Quraanku ay ku jiraan khaladaad cilmiyeed?'
      },
      {
        name: 'Sarah',
        email: 'sarah@example.com',
        question_en: 'What is the Islamic stance on evolution?',
        question_so: 'Waa maxay mowqifka Islaamka ee ku aaddan koboca?'
      }
    ];
    
    for (const questionData of questions) {
      await this.addQuestion(questionData);
    }
  }
}

export const storage = new MemStorage();
