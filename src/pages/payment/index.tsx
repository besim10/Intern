import "./style.css";
import bagIcon from "../../assets/images/bag.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import IShippingAddress from "../../main/interfaces/IShippingAddress";
import IBankAccount from "../../main/interfaces/IBankAccount";
import axios from "axios";
const Payment = () => {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);
  useEffect(() => {
    getBankAccounts();
  }, []);
  const getBankAccounts = async () => {
    const bankAccounts: IBankAccount[] = await (
      await axios.get("bankaccount/get-all?PageNumber=1&PageSize=20")
    ).data.data;
    setBankAccounts(bankAccounts);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  if (bankAccounts.length === 0) return <h3>Loading...</h3>;
  return (
    <main className="main-wrapper payment-wrapper">
      <div className="main-container payment-main">
        <h3>Secure Checkout</h3>
        <div className="shipping-section">
          <div className="shipping-address">
            <h4>Shipping Address</h4>
            <p>Besim Sokoli</p>
          </div>
          <div className="shipping-days">
            <h4>Shipping </h4>
            <p>Standard Shipping: 2-4 Business Days (£4.95)</p>
          </div>
        </div>
        <form>
          <h3>Select your Bank Accounts:</h3>
          <ul className="bankAccount-list">
            {bankAccounts.map((bank) => (
              <li key={bank.id} className="bankAccount-list__item">
                <label htmlFor={bank.code}>{bank.name}</label>
                <input
                  type="radio"
                  id={bank.code}
                  name={bank.code}
                  value={bank.name}
                />
              </li>
            ))}
          </ul>
        </form>
      </div>
    </main>
  );
};
export default Payment;
