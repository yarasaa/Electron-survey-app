import api from './api';

window.electron.store.get('osUser');
let userSicil = window.electron.store.get('osUser');
console.log(userSicil + 'testindex');
// eslint-disable-next-line import/prefer-default-export
export const API = Object.freeze({
  USERS_LIST: async (): Promise<any> => await api.get('api/IKDb?sicilNo='+userSicil),
  USERS_POST: async (data: any): Promise<any> =>
    await api.post('api/usertest', data),
  USERS_POSTINFO: async (data: any): Promise<any> =>
    await api.post('api/UserInfoAdd', data),
  USERS_INFOLIST: async (): Promise<any> =>
    await api.get('api/UserInfoAdd?sicilNo='+userSicil),
  // USERS_PUT: async (data: any): Promise<any> => await api.put('/users', data),
});
