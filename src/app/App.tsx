import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import ProductDetail from "../pages/product-detail";
import DashboardPage from "../pages/dashboard";
import Profile from "../pages/profile";
import "./app.css";
import Shipping from "../pages/shipping";
import Payment from "../pages/payment";
import MyTransactions from "../pages/my-transactions";
import BankAccounts from "../pages/bank-accounts";
import BankAccountsDetail from "../pages/bank-accounts-detail";
import Header from "../main/components/Header";
import SignUpSave from "../main/components/SignUpSave";
import Cart from "../pages/cart";
import Categories from "../main/components/Categories";
import AllProducts from "../pages/all-products";
import CategoryDetail from "../pages/category-detail";

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Header />
      <SignUpSave />
      <Categories />
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
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
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
        <Route
          path="/my-transactions"
          element={
            <PrivateRoute>
              <MyTransactions />
            </PrivateRoute>
          }
        />
        <Route
          path="/bank-accounts"
          element={
            <PrivateRoute>
              <BankAccounts />
            </PrivateRoute>
          }
        />
        <Route
          path="/bank-accounts/:id"
          element={
            <PrivateRoute>
              <BankAccountsDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/Category/:name"
          element={
            <PrivateRoute>
              <CategoryDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
