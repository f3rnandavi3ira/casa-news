import { api, empty, esc, guard, loading, qs } from './api.js';
import { updateNav } from './navigation.js';

updateNav();
guard();

const grid = qs('#my-articles-grid');

const card = (article) => `
  <div class="col-12 col-md-6 col-lg-4">
    <article class="card h-100 shadow-sm border-0">
      <img class="card-img-top article-image" src="${esc(article.imageUrl)}" alt="${esc(article.title)}">
      <div class="card-body d-flex flex-column">
        <div class="small text-danger fw-semibold mb-2">${new Date(article.createdAt).toLocaleDateString('fr-FR')}</div>
        <div class="small text-secondary mb-2">Par ${esc(article.authorName)}</div>
        <h2 class="h6">${esc(article.title)}</h2>
        <p class="small text-secondary line-clamp-3">${esc(article.description)}</p>
        <a class="btn btn-outline-danger btn-sm mt-auto" href="/article-details.html?id=${article.id}">Details</a>
        <a class="btn btn-outline-secondary btn-sm mt-2" href="/edit-article.html?id=${article.id}">Editer</a>
        <button class="btn btn-outline-primary btn-sm mt-2" type="button" data-share="${article.id}" data-shared="${article.shared}">
          ${article.shared ? 'Ne plus partager' : 'Partager'}
        </button>
        <button class="btn btn-outline-dark btn-sm mt-2" type="button" data-delete="${article.id}">Supprimer</button>
      </div>
    </article>
  </div>
`;

const load = async () => {
  loading(grid);
  try {
    const articles = await api('/api/articles', {
      auth: true
    });

    qs('#articles-count').textContent =
      `${articles.length} article${articles.length > 1 ? 's' : ''}`;

    if (articles.length) {
      grid.innerHTML = articles.map(card).join('');
    } else {
      empty(
        grid,
        'Aucun article cree',
        'Ajoutez votre premier article depuis le bouton Ajouter.'
      );
    }
  } catch (error) {
    empty(grid, error.message);
  }
};

grid.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const deleteId = button.dataset.delete;
  const shareId = button.dataset.share;
  if (deleteId) {
    if (!confirm('Supprimer cet article ?')) {
      return;
    }

    try {
      await api(`/api/articles/${deleteId}`, {
        method: 'DELETE',
        auth: true
      });
      load();
    } catch (error) {
      alert(error.message);
    }
    return;
  }

  if (shareId) {
    const currentlyShared = button.dataset.shared === '1' || button.dataset.shared === 'true';
    try {
      const updatedArticle = await api(
        `/api/articles/${shareId}`,
        {
          method: 'PATCH',
          auth: true,
          body: {
            shared: !currentlyShared
          }
        }
      );
      button.dataset.shared = String(updatedArticle.shared);
      button.textContent = updatedArticle.shared
        ? 'Ne plus partager'
        : 'Partager';
    } catch (error) {
      alert(error.message);
    }
  }
});

load();