import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/fr.js';

dayjs.extend(relativeTime);
dayjs.locale('fr');

const BASE_URL = 'https://newsapi.org/v2';

const createAppError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Vérifie la présence de la clé API de NewsAPI
 */
const getApiKey = () => {
  if (!process.env.NEWS_API_KEY) {
    throw createAppError('NEWS_API_KEY est manquante dans le fichier .env', 500);
  }
  return process.env.NEWS_API_KEY;
};

/**
 * Gère et transforme les erreurs provenant de NewsAPI
 */
const handleNewsApiError = (error) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const apiMessage = error.response?.data?.message;

    if (status === 401) {
      throw createAppError(
        'Cle NewsAPI invalide ou non autorisee. Verifie NEWS_API_KEY dans .env puis redemarre le serveur.',
        502
      );
    } else if (status) {
      throw createAppError(apiMessage || 'Erreur lors de l appel a NewsAPI', 502);
    }
  }

  throw error;
};

const isValidArticle = (a) => a.title && a.title !== '[Removed]';

const transformArticle = (article) => ({
  title: article.title,
  description: article.description || 'Pas de description disponible',
  url: article.url,
  urlToImage: article.urlToImage || null,
  source: article.source?.name || 'Source inconnue',
  publishedAt: article.publishedAt,
  publishedAgo: dayjs(article.publishedAt).fromNow()
});

/**
 * Récupère les actualités principales depuis NewsAPI
 * Filtre par catégorie et recherche optionnelles
 */
export const getTopHeadlines = async (category = '') => {
  const apiKey = getApiKey();
  const params = {
    country: 'ma',
    apiKey,
    pageSize: 20,
    ...(category && { category })
  };

  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
    const articles = response.data.articles.filter(isValidArticle).map(transformArticle);
    return articles.length || category ? articles : searchArticles('Maroc');
  } catch (error) {
    handleNewsApiError(error);
  }
};

/**
 * Recherche des articles sur NewsAPI en utilisant une requête textuelle
 * @param {string} query - Termes de recherche
 * @returns {Promise<Array>} Liste des articles transformés
 */
export const searchArticles = async (query) => {
  const apiKey = getApiKey();
  const params = {
    q: `${query} Maroc OR Casablanca`,
    apiKey,
    language: 'fr',
    sortBy: 'publishedAt',
    pageSize: 20
  };

  try {
    const response = await axios.get(`${BASE_URL}/everything`, { params });
    return response.data.articles.filter(isValidArticle).map(transformArticle);
  } catch (error) {
    handleNewsApiError(error);
  }
};
