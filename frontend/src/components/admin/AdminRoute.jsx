import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { user } = useSelector(store => store.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "recruiter") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
