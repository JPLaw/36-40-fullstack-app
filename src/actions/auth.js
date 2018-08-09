import superagent from 'superagent';
import * as routes from '../lib/routes';
import { cookieDelete } from '../lib/utils';


const TOKEN_COOKIE_KEY = 'X-401d25-Token';


// These are sync action creators

export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

export const logout = () => {
  cookieDelete(TOKEN_COOKIE_KEY);
  return removeToken();
}; 

// These are async action creators

export const userSignup = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials() 
    .then((response) => {
      return store.dispatch(setToken(response.body.token));
    });
};

// userLogin(user)(store)
export const userLogin = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.body.token));
    });
};

// export const logout = () => (store) => {
//   cookieDelete('_token');
//   return store.dispatch(removeToken());
// };
