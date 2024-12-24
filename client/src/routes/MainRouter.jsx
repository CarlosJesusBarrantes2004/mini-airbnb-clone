import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import SecondaryRouter from './SecondaryRouter';
import ProtectedRoutes from './ProtectedRoutes';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Layout from '../Layout';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route
          index
          element={
            <PublicRoutes>
              <IndexPage></IndexPage>
            </PublicRoutes>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <PublicRoutes>
              <LoginPage></LoginPage>
            </PublicRoutes>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <RegisterPage></RegisterPage>
            </PublicRoutes>
          }
        ></Route>
        <Route
          path="/*"
          element={
            <ProtectedRoutes>
              <SecondaryRouter></SecondaryRouter>
            </ProtectedRoutes>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default MainRouter;
