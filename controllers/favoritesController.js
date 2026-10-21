import * as favoritesService from '../services/favoritesService.js';

/**
 * Récupère tous les favoris de l'utilisateur connecté
 * GET /api/favorites/
 */
export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await favoritesService.getFavorites(req.user.id);
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};

/**
 * Ajoute un nouvel article aux favoris de l'utilisateur connecté
 * POST /api/favorites/
 */
export const addFavorite = async (req, res, next) => {
  try {
    const favorite =
      await favoritesService.addFavorite(
        req.user.id,
        req.body
      );
    res.status(201).json(favorite);
  } catch (error) {
    next(error);
  }
};

/**
 * Modifie la note d'un favori appartenant à l'utilisateur connecté
 * PUT /api/favorites/:id
 */
export const updateNote = async (req, res, next) => {
  try {
    const updated =
      await favoritesService.updateNote(
        Number(req.params.id),
        req.user.id,
        req.body.note
      );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Supprime un favori appartenant à l'utilisateur connecté
 * DELETE /api/favorites/:id
 */
export const deleteFavorite = async (req, res, next) => {
  try {
    await favoritesService.deleteFavorite(
      Number(req.params.id),
      req.user.id
    );
    res.status(200).json({ message: 'Favori supprimé' });
  } catch (error) {
    next(error);
  }
};