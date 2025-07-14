import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { currentUser } = useAuth();

//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute; // Make sure this is default export