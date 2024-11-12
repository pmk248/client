import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children : JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem("Authorization");
    if (!token) return <Navigate to="/login"/>
    return<>{children}</>
}

export default ProtectedRoute;