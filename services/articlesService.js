import * as articlesRepository from '../repositories/articlesRepository.js';

const createAppError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Vérifie qu'un article existe et qu'il appartient à l'utilisateur connecté
 */
const findAndAuthorize = async (id, userId) => {
  const article = await articlesRepository.findArticleById(id);
  if (!article) {
    throw createAppError('Article non trouve', 404);
  }
  if (article.userId !== userId) {
    throw createAppError('Non autorise', 403);
  }
  return article;
};

/**
 * Récupère les détails d'un article partagé publiquement
 */
export const getSharedArticleDetails = async (id) => {
  const article = await articlesRepository.findSharedArticleById(id);
  if (!article) {
    throw createAppError('Article non trouve', 404);
  }
  return article;
};

/**
 * Vérifie que les champs obligatoires d'un article sont présents
 */
const validateBody = ({ title, description, imageUrl }) => {
  if (!title || !description || !imageUrl) {
    throw createAppError('Titre, description et image sont requis', 400);
  }
};

/**
 * Récupère tous les articles appartenant à l'utilisateur connecté
 */
export const getMyArticles = async (userId) => {
  return await articlesRepository.getArticlesByUser(userId);
};

/**
 * Récupère un article après avoir vérifié son existence et son appartenance à l'utilisateur
 */
export const getArticleDetails = async (id, userId) => {
  return await findAndAuthorize(id, userId);
};

/**
 * Récupère tous les articles partagés publiquement
 */
export const getSharedArticles = async () => {
  return await articlesRepository.getSharedArticles();
};

/**
 * Valide les données et crée un nouvel article pour l'utilisateur
 */
export const createArticle = async (userId, data) => {
  const {
    title,
    description,
    imageUrl,
    content
  } = data;
  validateBody({
    title,
    description,
    imageUrl
  });
  return await articlesRepository.createArticle(
    userId,
    {
      title,
      description,
      imageUrl,
      content
    }
  );
};

/**
 * Vérifie les droits de l'utilisateur, valide les données et modifie un article
 */
export const updateArticle = async (id, userId, data) => {
  await findAndAuthorize(id, userId);
  const {
    title,
    description,
    imageUrl,
    content
  } = data;
  validateBody({
    title,
    description,
    imageUrl
  });
  return await articlesRepository.updateArticle(
    id,
    {
      title,
      description,
      imageUrl,
      content
    }
  );
};

/**
 * Vérifie les droits de l'utilisateur et modifie le statut de partage d'un article
 */
export const updateArticleSharing = async (id, userId, shared) => {
  await findAndAuthorize(id, userId);
  if (typeof shared !== 'boolean') {
    throw createAppError('Le statut de partage doit être un booléen', 400);
  }
  return await articlesRepository.updateArticleSharing(id, shared ? 1 : 0);
};

/**
 * Vérifie les droits de l'utilisateur et supprime un article
 */
export const deleteArticle = async (id, userId) => {
  await findAndAuthorize(id, userId);
  return await articlesRepository.deleteArticle(id);
};