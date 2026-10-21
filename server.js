import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import newsRoutes from './routes/news.js';
import favoritesRoutes from './routes/favorites.js';
import usersRoutes from './routes/users.js';
import articlesRoutes from './routes/articles.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.IP || '::';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/news', newsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/articles', articlesRoutes);

app.use(errorMiddleware);

app.listen(PORT, HOST, () => {
  console.log(`CasaNews démarré sur ${HOST}:${PORT}`);
});
