import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import DashboardPage from "../pages/dashboard";
import "./app.css";
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      fetch(
        `http://reimusabelli-001-site1.itempurl.com/api/authentication/validate-token?token=${localStorage.token}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) console.log(data.error);
          else {
            console.log(data);
          }
        });
    }
  }, []);
  return (
    <BrowserRouter>
      <AppNavigate />
      <Routes>
        <Route
          path="/"
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
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
