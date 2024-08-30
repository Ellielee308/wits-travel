import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // 如果用戶未登入，則重定向到登入頁面
    return <Navigate to="/backstage/login" />;
  }

  // 如果用戶已登入，則顯示相應的組件
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
