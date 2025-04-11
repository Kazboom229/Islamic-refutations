import { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertArticleSchema,
  insertCategorySchema,
  insertMediaSchema,
  insertQuestionSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to get users" });
    }
  });

  // Get a specific user
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Update user status
  app.patch("/api/users/:id/status", async (req, res) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const { online } = req.body;
      
      const schema = z.object({
        online: z.boolean()
      });
      
      try {
        schema.parse({ online });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        return res.status(400).json({ message: "Invalid input" });
      }
      
      const updatedUser = await storage.updateUserStatus(userId, online);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user status" });
    }
  });

  // Categories endpoints
  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to get categories" });
    }
  });

  // Get a specific category
  app.get("/api/categories/:id", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id, 10);
      const category = await storage.getCategory(categoryId);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to get category" });
    }
  });

  // Get subcategories
  app.get("/api/categories/:id/subcategories", async (req, res) => {
    try {
      const parentId = parseInt(req.params.id, 10);
      const subcategories = await storage.getSubcategories(parentId);
      res.json(subcategories);
    } catch (error) {
      res.status(500).json({ message: "Failed to get subcategories" });
    }
  });

  // Get category by slug
  app.get("/api/categories/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to get category" });
    }
  });

  // Add a new category
  app.post("/api/categories", async (req, res) => {
    try {
      const categoryData = req.body;
      
      try {
        insertCategorySchema.parse(categoryData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        return res.status(400).json({ message: "Invalid input" });
      }
      
      const category = await storage.addCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to add category" });
    }
  });

  // Update a category
  app.put("/api/categories/:id", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id, 10);
      const categoryData = req.body;
      
      // Allow partial updates with no strict schema validation
      
      const updatedCategory = await storage.updateCategory(categoryId, categoryData);
      
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: "Failed to update category" });
    }
  });

  // Delete a category
  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id, 10);
      const result = await storage.deleteCategory(categoryId);
      
      if (!result) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Articles endpoints
  // Get all articles
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to get articles" });
    }
  });

  // Get a specific article
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const articleId = parseInt(req.params.id, 10);
      const article = await storage.getArticle(articleId);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      // Increment view count
      await storage.incrementArticleView(articleId);
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to get article" });
    }
  });

  // Get article by slug
  app.get("/api/articles/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      // Increment view count
      await storage.incrementArticleView(article.id);
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to get article" });
    }
  });

  // Get articles by category
  app.get("/api/articles/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId, 10);
      const articles = await storage.getArticlesByCategory(categoryId);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to get articles" });
    }
  });

  // Get articles by type
  app.get("/api/articles/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const articles = await storage.getArticlesByType(type);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to get articles" });
    }
  });

  // Add a new article
  app.post("/api/articles", async (req, res) => {
    try {
      const articleData = req.body;
      
      try {
        insertArticleSchema.parse(articleData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        return res.status(400).json({ message: "Invalid input" });
      }
      
      const article = await storage.addArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to add article" });
    }
  });

  // Update an article
  app.put("/api/articles/:id", async (req, res) => {
    try {
      const articleId = parseInt(req.params.id, 10);
      const articleData = req.body;
      
      // Allow partial updates with no strict schema validation
      
      const updatedArticle = await storage.updateArticle(articleId, articleData);
      
      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(updatedArticle);
    } catch (error) {
      res.status(500).json({ message: "Failed to update article" });
    }
  });

  // Delete an article
  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const articleId = parseInt(req.params.id, 10);
      const result = await storage.deleteArticle(articleId);
      
      if (!result) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete article" });
    }
  });

  // Media endpoints
  // Get all media
  app.get("/api/media", async (req, res) => {
    try {
      const mediaItems = await storage.getAllMedia();
      res.json(mediaItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to get media" });
    }
  });

  // Get a specific media item
  app.get("/api/media/:id", async (req, res) => {
    try {
      const mediaId = parseInt(req.params.id, 10);
      const media = await storage.getMedia(mediaId);
      
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to get media" });
    }
  });

  // Get media by category
  app.get("/api/media/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId, 10);
      const mediaItems = await storage.getMediaByCategory(categoryId);
      res.json(mediaItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to get media" });
    }
  });

  // Get media by type
  app.get("/api/media/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const mediaItems = await storage.getMediaByType(type);
      res.json(mediaItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to get media" });
    }
  });

  // Get media by article
  app.get("/api/media/article/:articleId", async (req, res) => {
    try {
      const articleId = parseInt(req.params.articleId, 10);
      const mediaItems = await storage.getMediaByArticle(articleId);
      res.json(mediaItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to get media" });
    }
  });

  // Add a new media item
  app.post("/api/media", async (req, res) => {
    try {
      const mediaData = req.body;
      
      try {
        insertMediaSchema.parse(mediaData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        return res.status(400).json({ message: "Invalid input" });
      }
      
      const media = await storage.addMedia(mediaData);
      res.status(201).json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to add media" });
    }
  });

  // Update a media item
  app.put("/api/media/:id", async (req, res) => {
    try {
      const mediaId = parseInt(req.params.id, 10);
      const mediaData = req.body;
      
      // Allow partial updates with no strict schema validation
      
      const updatedMedia = await storage.updateMedia(mediaId, mediaData);
      
      if (!updatedMedia) {
        return res.status(404).json({ message: "Media not found" });
      }
      
      res.json(updatedMedia);
    } catch (error) {
      res.status(500).json({ message: "Failed to update media" });
    }
  });

  // Delete a media item
  app.delete("/api/media/:id", async (req, res) => {
    try {
      const mediaId = parseInt(req.params.id, 10);
      const result = await storage.deleteMedia(mediaId);
      
      if (!result) {
        return res.status(404).json({ message: "Media not found" });
      }
      
      res.json({ message: "Media deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete media" });
    }
  });

  // Questions endpoints
  // Get all questions
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getAllQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get questions" });
    }
  });

  // Get a specific question
  app.get("/api/questions/:id", async (req, res) => {
    try {
      const questionId = parseInt(req.params.id, 10);
      const question = await storage.getQuestion(questionId);
      
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to get question" });
    }
  });

  // Get questions by status
  app.get("/api/questions/status/:status", async (req, res) => {
    try {
      const { status } = req.params;
      const questions = await storage.getQuestionsByStatus(status);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get questions" });
    }
  });

  // Submit a new question
  app.post("/api/questions", async (req, res) => {
    try {
      const questionData = req.body;
      
      try {
        insertQuestionSchema.parse(questionData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        return res.status(400).json({ message: "Invalid input" });
      }
      
      const question = await storage.addQuestion(questionData);
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to add question" });
    }
  });

  // Update question status
  app.patch("/api/questions/:id/status", async (req, res) => {
    try {
      const questionId = parseInt(req.params.id, 10);
      const { status, responseArticleId } = req.body;
      
      const schema = z.object({
        status: z.string(),
        responseArticleId: z.number().optional()
      });
      
      try {
        schema.parse({ status, responseArticleId });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        return res.status(400).json({ message: "Invalid input" });
      }
      
      const updatedQuestion = await storage.updateQuestionStatus(questionId, status, responseArticleId);
      
      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ message: "Failed to update question status" });
    }
  });

  // Delete a question
  app.delete("/api/questions/:id", async (req, res) => {
    try {
      const questionId = parseInt(req.params.id, 10);
      const result = await storage.deleteQuestion(questionId);
      
      if (!result) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete question" });
    }
  });

  // Create the HTTP server
  const httpServer = createServer(app);

  // Initialize with some sample data when the server starts
  await storage.initializeSampleData();

  return httpServer;
}
