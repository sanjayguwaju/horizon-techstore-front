import { useRoutes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import CategoryCreate from '../../pages/admin/category/CategoryCreate';
import CategoryUpdate from '../../pages/admin/category/CategoryUpdate';

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // Check if user data is available
    if (user && user.token) {
      currentAdmin(user.token).then(res => {
        console.log("Current Admin Res ==>", res);
        setOk(true);
        // Set loading to false once user data is available
        setLoading(false); 
      }).catch(err => {
        console.log("Admin Route Err =>", err);
        setOk(false);
      });
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
  }

  if (ok) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    element = useRoutes([
      { 
        path: 'dashboard', 
        element: <AdminDashboard/> 
      },
      { 
        path: 'category', 
        element: <CategoryCreate/> 
      },
      { 
        path: 'category/:slug', 
        element: <CategoryUpdate/> 
      },
      // add more routes as needed
    ]);
  }
  return element;
};

export default AdminRoute;