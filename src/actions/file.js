import superagent from 'superagent';
import * as routes from '../lib/routes';

const createFile = file => ({
  type: 'FILE_CREATE',
  payload: file,
});

export default fileDescriptor => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.FILE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .field('title', fileDescriptor.title)
    .attach('file ', fileDescriptor.file)
    .then((response) => {
      return store.dispatch(createFile(response.body));
    });
};
