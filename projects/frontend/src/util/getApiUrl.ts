const isProd = process.env['REACT_APP_ENV'] === 'prod';
// Use Vercel deployment for production, localhost for development
const host = isProd ? 'https://tango-union.vercel.app' : 'http://localhost';
const port = isProd ? '' : ':3000'; // Vercel uses standard HTTPS port (443), no need to specify

export const getApiUrl = () => `${host}${port}/api`;