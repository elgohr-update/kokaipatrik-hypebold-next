import Router from 'next/router';

export const hasToken = (): Boolean => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) return true;
    return false;
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('ignore');
    Router.reload();
  }
};
