import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import loadingGif from "./loading.gif";

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  if (isAuthenticated === null) {
    return (
      <div className="m-auto text-center text-2xl text-[#006c98]">
        <img src={loadingGif} className="my-6"></img>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/backstage/login" state={{ from: location }} replace />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
export default PrivateRoute;
