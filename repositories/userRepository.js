import db from "../config/database.js";

/**
 * Recherche un utilisateur par son adresse e-mail
 */
export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

/**
 * Recherche un utilisateur par son identifiant
 */
export const findUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

/**
 * Crée un nouvel utilisateur dans la base de données
 */
export const createUser = async (userData) => {
  const [result] = await db.query(
    `
    INSERT INTO users
    (name,email,password)
    VALUES (?,?,?)
    `,

    [
      userData.name,
      userData.email,
      userData.password
    ]
  );
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
  return rows[0];
};

/**
 * Modifie les informations d'un utilisateur
 */
export const updateUser = async (id, userData) => {
  await db.query(
    `
    UPDATE users
    SET
      name = ?,
      email = ?,
      password = ?
    WHERE id = ?
    `,
    [
      userData.name,
      userData.email,
      userData.password,
      id
    ]
  );
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

/**
 * Supprime un utilisateur de la base de données
 */
export const deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
};