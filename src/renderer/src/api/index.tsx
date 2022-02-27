import api from './api';

// eslint-disable-next-line import/prefer-default-export
export const API = Object.freeze({
  USERS_LIST: async (): Promise<any> => await api.get('/users'),
  USERS_POST: async (data: any): Promise<any> => await api.post('/users', data),
});
