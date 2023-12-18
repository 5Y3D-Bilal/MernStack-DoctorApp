import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProctectedRoutes = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  const isAllowed = allowedRoles.includes(role);
  //   IF we are getting the token  then allow the children routes to access
  const accessiableRoute =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;

  return accessiableRoute;
};

export default ProctectedRoutes;
