/**
 * Middleware d'erreur centralisé
 * Intercepte toutes les erreurs passées via next(error)
 * @param {Error} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorMiddleware = (error, req, res, next) => {
  console.error('[ERROR]', error.message);

  const status = error.status || 500;
  const message = status === 500 ? 'Erreur interne du serveur' : error.message;

  res.status(status).json({ error: message });
};

export default errorMiddleware;