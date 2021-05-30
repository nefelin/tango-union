import { gql, useQuery } from '@apollo/client';
import * as React from 'react';

const queryDocument = gql`
  {
    songIndex
  }
`;

const LandingPage = () => {
  const { data, loading, error } = useQuery(queryDocument);
  console.log({ data, loading, error });
  return <div>Welcome to Tango Union</div>;
};

export default LandingPage;
