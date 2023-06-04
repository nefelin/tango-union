import { useWhoAmIQuery } from '../generated/graphql';
import decodeJWT from './util/decodeJwt';
import { getApiUrl } from './util/getApiUrl';

export const ACCESS_KEY = 'access';
export const REFRESH_KEY = 'refresh';

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);

export const setAccessToken = (newJwt: string) =>
  localStorage.setItem(ACCESS_KEY, newJwt);

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const setRefreshToken = (newJwt: string) =>
  localStorage.setItem(REFRESH_KEY, newJwt);

export const clearAuthTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
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

export const handleRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const res = await register(firstName, lastName, email, password);

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

  const res = await fetch(`${getApiUrl()}/auth/login`, requestOptions);

  if (res.ok) {
    return await res.json();
  }

  return null;
};

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
  });

  const requestOptions: RequestInit = {
    credentials: 'include',
    method: 'POST',
    headers,
    body,
  };

  const res = await fetch(
    `${getApiUrl()}/auth/register`,
    requestOptions,
  );

  if (res.ok) {
    return await res.json();
  }

  return null;
};

export const logout = async () => {
  const headers = new Headers();
  const access = getAccessToken();

  headers.append('Authorization', `Bearer ${access}`);

  const requestOptions: RequestInit = {
    credentials: 'include',
    method: 'POST',
    headers,
  };

  const res = await fetch(`${getApiUrl()}/auth/logout`, requestOptions);

  if (res.ok) {
    clearAuthTokens();
  }

  return res;
};

export const fetchRefreshToken = async () => {
  const refresh = getRefreshToken();
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${refresh}`);
  const tokenRes = await fetch(`${getApiUrl()}/auth/refresh`, {
    credentials: 'include',
    method: 'POST',
    headers,
  });

  return tokenRes.ok ? await tokenRes.json() : null;
};

export const isTokenValidOrUndefined = (token: string | null) => {
  // If there is no token, the user is not logged in
  // We return true here, because there is no need to refresh the token
  if (!token) return true;

  // Otherwise, we check if the token is expired
  const claims = decodeJWT(token);
  const expirationTimeInSeconds = claims.exp * 1000;
  const now = new Date();
  const isValid = expirationTimeInSeconds >= now.getTime();

  // Return true if the token is still valid, otherwise false and trigger a token refresh
  return isValid;
};
