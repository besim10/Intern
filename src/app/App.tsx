import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import DashboardPage from "../pages/dashboard";
import "./app.css";
const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Routes>
        <Route index element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute isPageLogin>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute isPageLogin>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute isPageLogin>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
