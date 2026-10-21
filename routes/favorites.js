import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  getFavorites,
  addFavorite,
  updateNote,
  deleteFavorite
} from '../controllers/favoritesController.js';

const router = Router();

router.get('/', authMiddleware, getFavorites);
router.post('/', authMiddleware, addFavorite);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteFavorite);

export default router;