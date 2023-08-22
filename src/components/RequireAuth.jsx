import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowedRole }) {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        (auth && auth.role === allowedRole) ?
            <Outlet /> :
            <Navigate to="/" state={{ from: location }} replace />
    );
};