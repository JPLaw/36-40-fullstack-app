import superagent from 'superagent';
import * as routes from '../lib/routes';

export const setImage = profile => ({
  type: 'IMAGE_SET',
  payload: profile,
});

export const createImage = profile => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.IMAGE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setImage(response.body));
    });
};

export const updateImage = profile => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.IMAGE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile) 
    .then((response) => {
      return store.dispatch(setImage(response.body));
    });
};

export const fetchImage = () => (store) => {
  const { token } = store.getState();

  return superagent.get(`${API_URL}${routes.IMAGE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(setImage(response.body));
    });
};
