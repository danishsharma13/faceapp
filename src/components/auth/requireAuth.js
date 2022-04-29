import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export const RequireAuth = ({ children }) => {
    // ********** States **********
    const auth = useAuth();

    if (!auth.userLoggedIn) {
        return <Navigate to="/login" />
    }

    return children;
}