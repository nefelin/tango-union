import { useApolloClient } from '@apollo/client';

import { WhoAmIDocument } from '../../generated/graphql';
import { logout } from '../auth';

const useLogout = () => {
  const client = useApolloClient();
  const handleLogout = async () => {
    const res = await logout();
    if (res.ok) {
      client.writeQuery({ query: WhoAmIDocument, data: { whoAmI: {} } });
    }
  };

  return {
    logout: handleLogout,
  };
};

export default useLogout;
