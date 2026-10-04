import { Navigate } from "react-router-dom";

function CustomerProtectedRoute({ children }) {
  const token = sessionStorage.getItem("orderToken");

  if (!token) {
    return <Navigate to="/myorders" replace />;
  }

  return children;
}

export default CustomerProtectedRoute;
