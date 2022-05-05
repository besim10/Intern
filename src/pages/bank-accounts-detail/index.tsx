import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../main/components/Table";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IBankAccount from "../../main/interfaces/IBankAccount";
import ITransaction from "../../main/interfaces/ITransaction";

const BankAccountsDetail = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [bankAccount, setBankAccount] = useState<IBankAccount | null>(null);
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    getTransactions();
    getBankAccount();
    return () => {
      setTransactions([]);
      setBankAccount(null);
    };
  }, []);
  const getBankAccount = async () => {
    const bank: IBankAccount = await (
      await axios.get(`bankaccount/${param.id}`)
    ).data;
    setBankAccount(bank);
  };

  const getTransactions = async () => {
    const data = await (
      await axios.get(
        `/bankaccount/${param.id}/transactions?PageNumber=1&PageSize=20`
      )
    ).data.data;
    setTransactions(data);
    return data;
  };

  const transactionsToShow = () => {
    let transactionsCopy = [...transactions];

    for (const transaction of transactionsCopy) {
      transaction.bank = bankAccount;
    }
    return transactionsCopy;
  };

  if (transactions === undefined) return <h1>Loading...</h1>;
  if (bankAccount === null) return <h1>Loading...</h1>;
  return (
    <main className="default-main">
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fill: "#ffff", fontSize: "2rem" }} />
      </button>
      <div className="default-container transactions-container">
        <div className="table-section">
          <h3>Transactions from {bankAccount.name}</h3>
          <Table transactionsToShow={transactionsToShow} />
        </div>
      </div>
    </main>
  );
};
export default BankAccountsDetail;
