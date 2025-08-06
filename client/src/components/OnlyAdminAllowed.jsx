import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RouteSignIn } from '@/helpers/RouteName'

const OnlyAdminAllowed = () => {
    const user = useSelector(state => state.user)

    if (user && user.isLoggedIn && user.user.role === 'admin') {
        return <Outlet />
    } else {
        return <Navigate to="/admin/login" />
    }
}

export default OnlyAdminAllowed