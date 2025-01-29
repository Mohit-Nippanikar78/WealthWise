import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import FullPageLoader from './FullPageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <FullPageLoader />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 