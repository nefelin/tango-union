import { useWhoAmIQuery } from '../../generated/graphql';

const useWhoAmiI = () => {
  const { data } = useWhoAmIQuery();

  return data?.whoAmI.email ? data.whoAmI : null; // cache gets overwritten with blank user info so missing email means user is logged out
};

export default useWhoAmiI;
