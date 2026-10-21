import db from "../config/database.js";

/**
 * Récupère tous les favoris appartenant à un utilisateur
 */
export const getFavoritesByUser = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM favorites
    WHERE userId = ?
    `,
    [userId]
  );
  return rows;
};

/**
 * Recherche un favori par son identifiant
 */
export const findFavoriteById = async (id) => {
  const [rows] = await db.query("SELECT * FROM favorites WHERE id = ?", [id]);
  return rows[0];
};

/**
 * Ajoute un nouvel article aux favoris d'un utilisateur
 */
export const addFavorite = async (userId, article) => {
  const [result] = await db.query(
    `
    INSERT INTO favorites
    (
      userId,
      url,
      title,
      description,
      urlToImage,
      source,
      publishedAt,
      note
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      userId,
      article.url,
      article.title,
      article.description || '',
      article.urlToImage || null,
      article.source,
      article.publishedAt,
      ''
    ]
  );
  const [rows] = await db.query("SELECT * FROM favorites WHERE id = ?", [result.insertId]);
  return rows[0];
};

/**
 * Modifie la note d'un favori existant
 */
export const updateFavoriteNote = async (id, note) => {
  await db.query(
    `
    UPDATE favorites
    SET note = ?
    WHERE id = ?
    `,
    [note, id]
  );
  const [rows] = await db.query("SELECT * FROM favorites WHERE id = ?", [id]);
  return rows[0];
};

/**
 * Supprime un favori de la base de données
 */
export const deleteFavorite = async (id) => {
  await db.query("DELETE FROM favorites WHERE id = ?", [id]);
};

/**
 * Vérifie si un favori existe déjà pour un utilisateur donné et une URL donnée.
 * Utilisé pour éviter les doublons.
 */
export const findFavoriteByUserAndUrl = async (userId, url) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM favorites
    WHERE userId = ?
    AND url = ?
    `,
    [
      userId,
      url
    ]
  );
  return rows[0];
};
