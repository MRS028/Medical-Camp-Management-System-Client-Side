import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading,] = useAdmin();
    const {user,loading} = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-full"></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;