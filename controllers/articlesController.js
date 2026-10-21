import * as articlesService from '../services/articlesService.js';

/**
 * Récupère tous les articles appartenant à l'utilisateur connecté
 * GET /api/articles/
 */
export const getMyArticles = async (req, res, next) => {
  try {
    const articles = await articlesService.getMyArticles(req.user.id);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère les détails d'un article appartenant à l'utilisateur connecté
 * GET /api/articles/:id
 */
export const getArticleDetails = async (req, res, next) => {
  try {
    const article =
      await articlesService.getArticleDetails(
        Number(req.params.id),
        req.user.id
      );
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère tous les articles partagés publiquement
 * GET /api/articles/shared
 */
export const getSharedArticles = async (req, res, next) => {
  try {
    const articles = await articlesService.getSharedArticles();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère les détails d'un article partagé publiquement
 * GET /api/articles/shared/:id
 */
export const getSharedArticleDetails = async (req, res, next) => {
  try {
    const article =
      await articlesService.getSharedArticleDetails(
        Number(req.params.id)
      );
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

/**
 * Crée un nouvel article pour l'utilisateur connecté
 * POST /api/articles/
 */
export const createArticle = async (req, res, next) => {
  try {
    const article =
      await articlesService.createArticle(
        req.user.id,
        req.body
      );
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

/**
 * Modifie un article appartenant à l'utilisateur connecté
 * PUT /api/articles/:id
 */
export const updateArticle = async (req, res, next) => {
  try {
    const updated =
      await articlesService.updateArticle(
        Number(req.params.id),
        req.user.id,
        req.body
      );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Modifie le statut de partage d'un article
 * PATCH /api/articles/:id
 */
export const updateArticleSharing = async (req, res, next) => {
  try {
    const updated = await articlesService.updateArticleSharing(
      Number(req.params.id),
      req.user.id,
      req.body.shared
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Supprime un article appartenant à l'utilisateur connecté
 * DELETE /api/articles/:id
 */
export const deleteArticle = async (req, res, next) => {
  try {
    await articlesService.deleteArticle(
      Number(req.params.id),
      req.user.id
    );
    res.status(200).json({ message: 'Article supprime' });
  } catch (error) {
    next(error);
  }
};