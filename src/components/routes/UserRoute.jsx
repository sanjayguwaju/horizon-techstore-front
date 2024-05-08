import { useRoutes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import History from '../../pages/user/History';
import LoadingToRedirect from './LoadingToRedirect';
import Password from '../../pages/user/Password';
import Wishlist from '../../pages/user/Wishlist';
import Checkout from '../../pages/Checkout';

const UserRoute = () => {
  const [loading, setLoading] = useState(true);
  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // Check if user data is available
    if (user && user.token) {
      setLoading(false); // Set loading to false once user data is available
    }
  }, [user]);

  if (loading) {
    // Show a loading indicator or a placeholder while user data is being fetched
    return (
      <LoadingToRedirect/>
    )
  }

  let element;
  if (!user || !user.token) {
    // Redirect to login page if user is not authenticated
    element = <Navigate to="/" />;
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    element = useRoutes([
      { 
        path: 'history', 
        element: <History/> 
      },
      {
        path: 'password',
        element: <Password/>
      },
      {
        path: 'wishlist',
        element: <Wishlist/>
      },
      {
        path: 'checkout',
        element: <Checkout/>
      }
      // add more routes as needed
    ]);
  }
  return element;
};

export default UserRoute;