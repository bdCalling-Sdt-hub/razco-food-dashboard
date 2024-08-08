/* eslint-disable react/prop-types */
import { useMyProfileQuery } from "@/redux/slices/admin/settingApi";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: {children: React.ReactNode}) => {
    const location = useLocation();
    const { data: profile, isLoading } = useMyProfileQuery({});

    if (isLoading) {
        return null;
    }

    if (profile?.data?.role && (profile?.data?.role === "admin" || profile?.data?.role === "super_admin") ) {
        return children;
    }

    return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;