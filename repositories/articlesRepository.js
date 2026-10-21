import db from "../config/database.js";

/**
 * Récupère tous les articles appartenant à un utilisateur
 */
export const getArticlesByUser = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      articles.*,
      users.name AS authorName
    FROM articles
    JOIN users ON users.id = articles.userId
    WHERE articles.userId = ?
    ORDER BY articles.createdAt DESC
    `,
    [userId]
  );
  return rows;
};

/**
 * Récupère tous les articles partagés publiquement
 */
export const getSharedArticles = async () => {
  const [rows] = await db.query(
    `
    SELECT
      articles.*,
      users.name AS authorName
    FROM articles
    JOIN users ON users.id = articles.userId
    WHERE articles.shared = 1
    ORDER BY articles.createdAt DESC
    `
  );
  return rows;
};

/**
 * Recherche un article par son identifiant
 */
export const findArticleById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT
      articles.*,
      users.name AS authorName
    FROM articles
    JOIN users ON users.id = articles.userId
    WHERE articles.id = ?
    `,
    [id]
  );
  return rows[0];
};

/**
 * Recherche un article partagé par son identifiant
 */
export const findSharedArticleById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT
      articles.*,
      users.name AS authorName
    FROM articles
    JOIN users ON users.id = articles.userId
    WHERE articles.id = ?
      AND articles.shared = 1
    `,
    [id]
  );
  return rows[0];
};

/**
 * Crée un nouvel article associé à un utilisateur
 */
export const createArticle = async (userId, article) => {
  const [result] = await db.query(
    `
    INSERT INTO articles
    (userId, title, description, imageUrl, content)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      userId,
      article.title,
      article.description,
      article.imageUrl,
      article.content
    ]
  );
  const [rows] = await db.query("SELECT * FROM articles WHERE id = ?", [result.insertId]);
  return rows[0];
};

/**
 * Modifie les informations d'un article existant
 */
export const updateArticle = async (id, updatedFields) => {
  await db.query(
    `
    UPDATE articles
    SET
      title = ?,
      description = ?,
      imageUrl = ?,
      content = ?
    WHERE id = ?
    `,
    [
      updatedFields.title,
      updatedFields.description,
      updatedFields.imageUrl,
      updatedFields.content,
      id
    ]
  );
  const [rows] = await db.query("SELECT * FROM articles WHERE id = ?", [id]);
  return rows[0];
};

/**
 * Modifie le statut de partage d'un article
 */
export const updateArticleSharing = async (id, shared) => {
  await db.query(
    `
    UPDATE articles
    SET shared = ?
    WHERE id = ?
    `,
    [shared, id]
  );
  const [rows] = await db.query("SELECT * FROM articles WHERE id = ?", [id]);
  return rows[0];
};

/**
 * Supprime un article de la base de données
 */
export const deleteArticle = async (id) => {
  await db.query("DELETE FROM articles WHERE id = ?", [id]);
};