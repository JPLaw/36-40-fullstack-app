import superagent from 'superagent';
import * as routes from '../lib/routes';

const createFile = file => ({
  type: 'FILE_CREATE',
  payload: file,
});

export default fileDescriptor => (store) => {
  const { token } = store.getState();
  console.log(fileDescriptor);
  
  return superagent.post(`${API_URL}${routes.IMAGE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .field('title', fileDescriptor.title)
    .attach('file ', fileDescriptor.image)
    .then((response) => {
      return store.dispatch(createFile(response.body));
    });
};
