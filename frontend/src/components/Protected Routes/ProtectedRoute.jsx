// Import's
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { usersSelector } from '../../Redux/reducers/usersReducer';

// Protected Route component which checks if the user is signed in and has a token
function ProtectedRoute({ children }) {
    // Check if there is a token in the cookie
    // const token = Cookies.get('token');
    const isSignIn = Cookies.get('isSignIn');
    // const { token, isSignIn } = useSelector(usersSelector);
    // Returning JSX
    return isSignIn ? children : <Navigate to="/login" />;
}

// Exporting ProtectedRoute
export default ProtectedRoute;
