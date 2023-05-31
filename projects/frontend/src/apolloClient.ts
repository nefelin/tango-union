import {
  ApolloClient,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import {
  fetchRefreshToken,
  getAccessToken,
  isTokenValidOrUndefined,
  setAccessToken,
  setRefreshToken,
} from './auth';
import { getApiUrl } from './util/getApiUrl';

const authMiddleware = setContext(async (req) => {
  let token = getAccessToken();
  const needsRefresh = !isTokenValidOrUndefined(token);

  if (needsRefresh) {
    const tokensFromRefresh = await fetchRefreshToken();
    if (tokensFromRefresh) {
      const {token: newToken, refresh: newRefresh} = tokensFromRefresh;
      token = newToken;
      setAccessToken(newToken);
      setRefreshToken(newRefresh);
    }
  }

  // add the authorization to the headers
  return {
    headers: {
      authorization: `Bearer ${token}` || null,
    },
  };
});

const httpLink = createHttpLink({ uri: `${getApiUrl()}/graphql` });
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  // link: httpLink,
  connectToDevTools: true,
});

export default apolloClient;
