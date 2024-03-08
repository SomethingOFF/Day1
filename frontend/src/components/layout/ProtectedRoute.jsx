import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({isAdmin}) => {
  const { isAuthenticated, user } = useSelector((state) => state.user__profile);

    if (!isAuthenticated) return <Navigate to="/login" />
    if (isAdmin === true && user.role !== "admin") {
        console.log("is Executed")
        return <Navigate to="/login" />
    }
    return <Outlet />
}

export default ProtectedRoute