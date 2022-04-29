import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import ProductDetail from "../pages/product-detail";
import DashboardPage from "../pages/dashboard";
import "./app.css";
import Shipping from "../pages/shipping";
import Payment from "../pages/payment";
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
        <Route
          path="/shipping"
          element={
            <PrivateRoute>
              <Shipping />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
