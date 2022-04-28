import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import ProductDetail from "../pages/product-detail";
import DashboardPage from "../pages/dashboard";
import "./app.css";
import Header from "../main/components/Header";
import Cart from "../pages/cart";
const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Header />
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
          path="/dashboard/:id"
          element={<PrivateRoute>{<ProductDetail />}</PrivateRoute>}
        />
        <Route path="/cart" element={<Cart />}></Route>
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
