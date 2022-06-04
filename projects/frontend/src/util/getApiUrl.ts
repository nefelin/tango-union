const isProd = process.env['REACT_APP_ENV'] === 'prod';
const host = isProd ? 'https://api.tangounion.net' : 'http://localhost';
const port = isProd ? 443 : 4000;

export const getApiUrl = () => `${host}:${port}`;