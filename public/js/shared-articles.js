import { api, empty, esc, loading, qs } from './api.js';
import { updateNav } from './navigation.js';

updateNav();

const grid = qs('#shared-articles-grid');

const card = (article) => `
  <div class="col-12 col-md-6 col-lg-4">
    <article class="card h-100 shadow-sm border-0">
      <img class="card-img-top article-image" src="${esc(article.imageUrl)}" alt="${esc(article.title)}">
      <div class="card-body d-flex flex-column">
        <div class="small text-danger fw-semibold mb-2">${new Date(article.createdAt).toLocaleDateString('fr-FR')}</div>
        <div class="small text-secondary mb-2">Par ${esc(article.authorName)}</div>
        <h2 class="h6">${esc(article.title)}</h2>
        <p class="small text-secondary line-clamp-3">${esc(article.description)}</p>
        <a class="btn btn-outline-danger btn-sm mt-auto" href="/article-details.html?id=${article.id}&shared=true">Details</a>
      </div>
    </article>
  </div>
`;

const load = async () => {
  loading(grid);
  try {
    const articles = await api('/api/articles/shared');
    if (articles.length) {
      grid.innerHTML = articles.map(card).join('');
    } else {
      empty(
        grid,
        'Aucun article partagé',
        'Aucun article n’a encore été publié.'
      );
    }
  } catch (error) {
    empty(grid, error.message);
  }
};

load();