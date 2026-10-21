import { api, empty, esc, guard, loading, qs } from './api.js';
import { updateNav } from './navigation.js';

updateNav();
guard();

const list = qs('#favorites-container');

const card = (fav) => `
  <article class="card shadow-sm border-0" id="fav-${fav.id}">
    <div class="card-body d-flex flex-column flex-sm-row gap-3">
      ${fav.urlToImage ? `<img class="article-thumb rounded" src="${esc(fav.urlToImage)}" alt="${esc(fav.title)}">` : ''}
      <div class="flex-grow-1">
        <h2 class="h6 mb-1">${esc(fav.title)}</h2>
        <p class="small text-secondary mb-2">${esc(fav.source || 'Source inconnue')} · Sauvegarde ${new Date(fav.savedAt).toLocaleDateString('fr-FR')}</p>
        <textarea class="form-control form-control-sm" id="note-${fav.id}" rows="2" placeholder="Ajouter une note personnelle...">${esc(fav.note || '')}</textarea>
        <div class="d-flex flex-wrap gap-2 mt-2">
          <a class="btn btn-outline-secondary btn-sm" href="${esc(fav.url)}" target="_blank">Lire</a>
          <button class="btn btn-danger btn-sm" data-note="${fav.id}">Sauvegarder note</button>
          <button class="btn btn-outline-danger btn-sm" data-delete="${fav.id}">Supprimer</button>
        </div>
      </div>
    </div>
  </article>`;

const refreshCount = () => {
  const n = document.querySelectorAll('[id^="fav-"]').length;
  qs('#favorites-count').textContent = `${n} article${n > 1 ? 's' : ''}`;
};

const load = async () => {
  loading(list);
  try {
    const favorites = await api('/api/favorites', { auth: true });
    qs('#favorites-count').textContent = `${favorites.length} article${favorites.length > 1 ? 's' : ''}`;
    list.innerHTML = favorites.length ? favorites.map(card).join('') : '';
    if (!favorites.length) empty(list, 'Aucun favori sauvegarde', 'Parcourez les actualites et sauvegardez vos articles preferes.');
  } catch (error) {
    empty(list, error.message);
  }
};

list.addEventListener('click', async (event) => {
  const { note, delete: del } = event.target.dataset;
  if (!note && !del) return;

  try {
    if (note) {
      await api(`/api/favorites/${note}`, { method: 'PUT', auth: true, body: { note: qs(`#note-${note}`).value } });
      alert('Note sauvegardee !');
    } else if (confirm('Supprimer ce favori ?')) {
      await api(`/api/favorites/${del}`, { method: 'DELETE', auth: true });
      qs(`#fav-${del}`).remove();
      refreshCount();
      if (!document.querySelector('[id^="fav-"]')) load();
    }
  } catch (error) {
    alert(error.message);
  }
});

load();
