import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';

const createAppError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Génère un token JWT et prépare les données de l'utilisateur
 * sans exposer son mot de passe
 */
const buildAuthResponse = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password, ...userWithoutPassword } = user;
  return { token, user: userWithoutPassword };
};

/**
 * Valide les données, vérifie l'unicité de l'e-mail,
 * chiffre le mot de passe et crée un nouvel utilisateur
 */
export const register = async (data) => {
  if (!data.name || !data.email || !data.password) {
    throw createAppError('Tous les champs sont requis', 400);
  }
  if (data.password.length < 6) {
    throw createAppError('Le mot de passe doit contenir au moins 6 caractères', 400);
  }

  const existing = await userRepository.findUserByEmail(data.email);
  if (existing) {
    throw createAppError('Cet email est déjà utilisé', 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userRepository.createUser({ ...data, password: hashedPassword });
  return buildAuthResponse(user);
};

/**
 * Vérifie les identifiants de l'utilisateur et génère un token JWT
 */
export const login = async (data) => {
  if (!data.email || !data.password) {
    throw createAppError('Email et mot de passe requis', 400);
  }

  const user = await userRepository.findUserByEmail(data.email);
  if (!user) {
    throw createAppError('Identifiants invalides', 401);
  }

  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) {
    throw createAppError('Identifiants invalides', 401);
  }
  return buildAuthResponse(user);
};

/**
 * Récupère le profil de l'utilisateur connecté
 */
export const getProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw createAppError('Utilisateur introuvable', 404);
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Modifie les informations du profil de l'utilisateur connecté
 */
export const updateProfile = async (userId, data) => {
  const { name, email, password } = data;
  if (!name || !email) {
    throw createAppError('Le nom et l\'email sont requis', 400);
  }

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser && existingUser.id !== userId) {
    throw createAppError('Cet email est déjà utilisé', 409);
  }

  const currentUser = await userRepository.findUserById(userId);
  if (!currentUser) {
    throw createAppError('Utilisateur introuvable', 404);
  }

  let hashedPassword = currentUser.password;
  if (password) {
    if (password.length < 6) {
      throw createAppError(
        'Le mot de passe doit contenir au moins 6 caractères',
        400
      );
    }
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updatedUser = await userRepository.updateUser(
    userId,
    {
      name,
      email,
      password: hashedPassword
    }
  );
  return buildAuthResponse(updatedUser);
};

/**
 * Supprime le compte de l'utilisateur connecté
 */
export const deleteAccount = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw createAppError('Utilisateur introuvable', 404);
  }
  await userRepository.deleteUser(userId);
};