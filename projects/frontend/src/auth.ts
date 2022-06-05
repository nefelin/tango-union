export const ACCESS_KEY = 'access';
export const REFRESH_KEY = 'refresh';

export const getAccessToken = () => {
  localStorage.getItem(ACCESS_KEY);
};

export const setAccessToken = (newJwt: string) => {
  localStorage.setItem(ACCESS_KEY, newJwt);
};

export const getRefreshToken = () => {
  localStorage.getItem(REFRESH_KEY);
};

export const setRefreshToken = (newJwt: string) => {
  localStorage.setItem(REFRESH_KEY, newJwt);
};

export const handleLogin = async (email: string, password: string) => {
  const res = await login(email, password);

  if (!res) {
    return false;
  }

  const { token, refresh } = res;
  setAccessToken(token);
  setRefreshToken(refresh);

  return true;
};

const login = async (email: string, password: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    email,
    password,
  });

  const requestOptions: RequestInit = {
    credentials: 'include',
    method: 'POST',
    headers,
    body,
  };

  const res = await fetch('http://localhost:4000/auth/login', requestOptions);

  if (res.ok) {
    return await res.json();
  }

  return null;
};
