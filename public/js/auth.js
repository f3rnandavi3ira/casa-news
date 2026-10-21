import { api, qs } from './api.js';

const fail = (error) => {
  qs('#error-msg').textContent = error.message;
  qs('#error-msg').classList.remove('d-none');
};

qs('#register-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const data = await api('/api/users/register', {
      method: 'POST',
      body: {
        name: qs('#name').value,
        email: qs('#email').value,
        password: qs('#password').value
      }
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = '/';
  } catch (error) {
    fail(error);
  }
});

qs('#login-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const data = await api('/api/users/login', {
      method: 'POST',
      body: {
        email: qs('#email').value,
        password: qs('#password').value
      }
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = '/';
  } catch (error) {
    fail(error);
  }
});
