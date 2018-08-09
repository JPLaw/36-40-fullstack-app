const cookieFetch = (key) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) { // eslint-disable-line
    const [cookieKey, cookieValue] = cookie.split('=');

    if (key === cookieKey.trim()) {
      return cookieValue;
    }
  }
  return undefined;
};

const cookieDelete = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export { cookieFetch, cookieDelete };
