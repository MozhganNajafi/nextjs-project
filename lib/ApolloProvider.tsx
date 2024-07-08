import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

// ApolloProviderWrapper component to wrap children with ApolloProvider and provide Apollo Client instance
const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
