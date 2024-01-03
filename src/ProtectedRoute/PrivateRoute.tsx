// components/PrivateRoute.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute = ({ children }:any) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (You should replace this with your own authentication logic)
    // const isAuthenticated = true; // Replace with your authentication logic
    const isAuthenticated = localStorage.getItem("access_token")
    if (!isAuthenticated) {
      // Redirect to the login page if the user is not authenticated
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
