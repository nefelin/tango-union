function decodeJWT<T = any>(token: string): T | null {
  const base64Url = token.split('.')[1];
  if (!base64Url) {
    return null;
  }
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  let parsed: T | null = null;

  try {
    parsed = JSON.parse(jsonPayload)
  } catch {
    return null
  }
  return parsed;
}

export default decodeJWT;