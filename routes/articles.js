import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createArticle,
  deleteArticle,
  getArticleDetails,
  getMyArticles,
  getSharedArticles,
  getSharedArticleDetails,
  updateArticle,
  updateArticleSharing
} from '../controllers/articlesController.js';

const router = Router();

router.get('/', authMiddleware, getMyArticles);
router.get('/shared', getSharedArticles);
router.get('/shared/:id', getSharedArticleDetails);
router.get('/:id', authMiddleware, getArticleDetails);
router.post('/', authMiddleware, createArticle);
router.put('/:id', authMiddleware, updateArticle);
router.patch('/:id', authMiddleware, updateArticleSharing);
router.delete('/:id', authMiddleware, deleteArticle);

export default router;
