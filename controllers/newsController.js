import * as newsService from '../services/newsService.js';

/**
 * Récupère les actualités — avec filtre catégorie et recherche optionnels
 * GET /api/news?category=sport&q=casablanca
 */
export const getNews = async (req, res, next) => {
  try {
    const { category, q } = req.query;
    const articles = q
      ? await newsService.searchArticles(q)
      : await newsService.getTopHeadlines(category);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};