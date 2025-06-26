import api from './api';

export const UserService = {
  getUsers: async () => {
    const data = await api('/users', { method: 'GET' });
    return data;
  },
};
