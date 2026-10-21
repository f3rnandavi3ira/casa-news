import * as favoritesRepository from '../repositories/favoritesRepository.js';

const createAppError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Vérifie qu'un favori existe et qu'il appartient à l'utilisateur connecté
 */
const findAndAuthorize = async (id, userId) => {
  const favorite = await favoritesRepository.findFavoriteById(id);
  if (!favorite) {
    throw createAppError('Favori non trouvé', 404);
  }
  if (favorite.userId !== userId) {
    throw createAppError('Non autorisé', 403);
  }
  return favorite;
};

/**
 * Récupère tous les favoris appartenant à l'utilisateur connecté
 */
export const getFavorites = async (userId) => {
  return await favoritesRepository.getFavoritesByUser(userId);
};

/**
 * Vérifie les données, évite les doublons et ajoute un article aux favoris
 */
export const addFavorite = async (userId, data) => {
  const { title, url } = data;
  if (!title || !url) {
    throw createAppError('title et url sont requis', 400);
  }
  const existing = await favoritesRepository.findFavoriteByUserAndUrl(userId, url);
  if (existing) {
    throw createAppError('Article déjà ajouté aux favoris', 409);
  }
  return await favoritesRepository.addFavorite(userId, data);
};

/**
 * Vérifie les droits de l'utilisateur et modifie la note d'un favori
 */
export const updateNote = async (id, userId, note) => {
  await findAndAuthorize(id, userId);
  return await favoritesRepository.updateFavoriteNote(id, note || '');
};

/**
 * Vérifie les droits de l'utilisateur et supprime un favori
 */
export const deleteFavorite = async (id, userId) => {
  await findAndAuthorize(id, userId);
  return await favoritesRepository.deleteFavorite(id);
};