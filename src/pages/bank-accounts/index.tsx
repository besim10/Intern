import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IBankAccount from "../../main/interfaces/IBankAccount";
import "./style.css";
const BankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getBankAccounts();
    return () => {
      setBankAccounts([]);
    };
  }, []);

  const getBankAccounts = async () => {
    const bankAccounts: IBankAccount[] = await (
      await axios.get("bankaccount/get-all?PageNumber=1&PageSize=20")
    ).data.data;
    setBankAccounts(bankAccounts);
  };
  return (
    <main className="main-wrapper bankAccounts-wrapper">
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fill: "#ffff", fontSize: "2rem" }} />
      </button>
      <div className="main-container bankAccounts-main">
        <h3>My Bank Accounts:</h3>
        <ul className="bankAccount-list">
          {bankAccounts.map((bank) => (
            <li key={bank.id} className="bankAccount-list__item">
              <Link to={`/bank-accounts/${bank.id}`}>
                <h4>{bank.name}</h4>
                <span className="balance">
                  Balance: <strong>£{bank.balance.toFixed(2)}</strong>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
export default BankAccounts;
