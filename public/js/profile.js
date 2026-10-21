import { api, guard, qs } from './api.js';
import { updateNav } from './navigation.js';

guard();
updateNav();


const form = qs('#profile-form');
const message = qs('#form-message');
const avatar = qs('#profile-avatar');
const deleteButton = qs('#delete-account-btn');

const showMessage = (text, type = 'danger') => {
  message.className = `alert alert-${type}`;
  message.textContent = text;
};

const updateAvatar = (name) => {
  avatar.textContent = name
    ? name.charAt(0).toUpperCase()
    : '?';
};

const loadProfile = async () => {
  try {
    const currentUser = await api('/api/users/me', {
      auth: true
    });
    qs('#name').value = currentUser.name || '';
    qs('#email').value = currentUser.email || '';
    updateAvatar(currentUser.name);
  } catch (error) {
    showMessage(error.message);
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = qs('#name').value.trim();
  const email = qs('#email').value.trim();
  const password = qs('#password').value;
  const passwordConfirm = qs('#password-confirm').value;
  if (password && password !== passwordConfirm) {
    showMessage('Les mots de passe ne correspondent pas.');
    return;
  }

  const confirmed = confirm('Êtes-vous sûr de vouloir modifier vos informations ?');
  if (!confirmed) {
    return;
  }

  try {
    const data = await api('/api/users/me', {
      method: 'PUT',
      auth: true,
      body: {
        name,
        email,
        password
      }
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    updateAvatar(data.user.name);
    qs('#password').value = '';
    qs('#password-confirm').value = '';
    showMessage('Profil mis à jour avec succès.', 'success');
    updateNav();
  } catch (error) {
    showMessage(error.message);
  }
});

deleteButton.addEventListener('click', async () => {
  const confirmed = confirm(
    'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est définitive.'
  );
  if (!confirmed) {
    return;
  }

  try {
    await api('/api/users/me', {
      method: 'DELETE',
      auth: true
    });
    localStorage.clear();
    window.location.href = '/';
  } catch (error) {
    showMessage(error.message);
  }
});

loadProfile();