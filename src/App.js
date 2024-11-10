import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from './features/auth/authSlice';
import PageNotFound from './pages/404';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { positions, Provider } from 'react-alert';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Home from './pages/Home';

//creating routes for naviation
const router = createBrowserRouter([
  {
    path: '/blog',
    element:<Protected> <Home></Home> </Protected>,
  },
  
  {
    path: '/',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="App">
        {userChecked && (
          <Provider>
            <RouterProvider router={router} />
          </Provider>
        )}
      </div>
    </>
  );
}

export default App;
