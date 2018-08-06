import superagent from 'superagent';
import * as routes from '../lib/routes';

export const setImage = profile => ({
  type: 'IMAGE_SET',
  payload: profile,
});

export const createImage = () => (store) => {
  console.log(routes);
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.IMAGE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .attach('files', createImage.file)
    .field('title', createImage.title)
    .then((response) => {
      return store.dispatch(setImage(response.body));
    });
};

export const updateImage = profile => (store) => {
  const { token } = store.getState();

  return superagent.put(`${API_URL}${routes.IMAGE_ROUTE}`)
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
