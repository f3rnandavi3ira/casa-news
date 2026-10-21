import * as userService from '../services/userService.js';

/**
 * Inscription
 * POST /api/users/register
 */
export const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Connexion
 * POST /api/users/login
 */
export const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère le profil de l'utilisateur connecté
 * GET /api/users/me
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Modifie le profil de l'utilisateur connecté
 * PUT /api/users/me
 */
export const updateProfile = async (req, res, next) => {
  try {
    const result = await userService.updateProfile(
      req.user.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Supprime le compte de l'utilisateur connecté
 * DELETE /api/users/me
 */
export const deleteAccount = async (req, res, next) => {
  try {
    await userService.deleteAccount(req.user.id);
    res.status(200).json({ message: 'Compte supprimé' });
  } catch (error) {
    next(error);
  }
};