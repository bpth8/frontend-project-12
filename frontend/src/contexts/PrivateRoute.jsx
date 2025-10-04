import { Navigate } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';
import routes from '../routes/routes';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? children : <Navigate to={routes.loginPagePath()} />;
};

export default PrivateRoute;
