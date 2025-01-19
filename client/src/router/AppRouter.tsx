import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Register,
  Login,
  NotFound,
  Home,
  Properties,
  Bookings,
  Property,
  CreateBooking,
} from "../pages";
import { Layout } from "../Layout";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        {/**Public routes */}
        <Route
          index
          element={
            <PublicRoutes>
              <Home></Home>
            </PublicRoutes>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register></Register>
            </PublicRoutes>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login></Login>
            </PublicRoutes>
          }
        ></Route>
        {/**Private routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard></Dashboard>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/properties"
          element={
            <ProtectedRoutes>
              <Properties></Properties>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/bookings"
          element={
            <ProtectedRoutes>
              <Bookings></Bookings>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoutes>
              <CreateBooking></CreateBooking>
            </ProtectedRoutes>
          }
        ></Route>
      </Route>
      <Route
        path="/properties/:id"
        element={
          <ProtectedRoutes>
            <Property></Property>
          </ProtectedRoutes>
        }
      ></Route>
      {/**Not found */}
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
};

export default AppRouter;
