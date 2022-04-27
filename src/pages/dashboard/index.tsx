import { FC, useState } from "react";
import Header from "../../main/components/Header";
import "./style.css";
import ProductList from "../../main/components/ProductList";
import Profile from "../profile";
const DashboardPage: FC = () => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <div className="dashboard-container">
          <h3>All products</h3>
          <ProductList />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
