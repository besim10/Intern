import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ITransation from "../../main/interfaces/ITransaction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "../../main/components/Table";
import IBankAccount from "../../main/interfaces/IBankAccount";
import { useNavigate } from "react-router-dom";
const MyTransactions = () => {
  const [transactions, setTransactions] = useState<ITransation[]>([]);
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getTransactions();
    getBankAccounts();
    return () => {
      setTransactions([]);
      setBankAccounts([]);
    };
  }, []);
  const getBankAccounts = async () => {
    const bankAccounts: IBankAccount[] = await (
      await axios.get("bankaccount/get-all?PageNumber=1&PageSize=20")
    ).data.data;
    setBankAccounts(bankAccounts);
  };
  const getTransactions = async () => {
    const transactions: ITransation[] = await (
      await axios.get("banktransaction/get-all")
    ).data.data;
    setTransactions(transactions);
  };

  const transactionsToShow = () => {
    let transactionsCopy = [...transactions];

    for (const transaction of transactionsCopy) {
      const matched = bankAccounts.find(
        (bankAccount) => bankAccount.id === transaction.bankAccountId
      );
      if (matched) {
        transaction.bank = matched;
      }
    }
    transactionsCopy = transactionsCopy.filter((transaction) =>
      transaction.bank?.name.includes(selectedOption)
    );
    return transactionsCopy;
  };

  const handleOnChange = (e: any) => {
    setSelectedOption(e.target.value);
  };
  return (
    <main className="default-main">
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fill: "#ffff", fontSize: "2rem" }} />
      </button>
      <div className="default-container transactions-container">
        <div className="table-section">
          <h3>
            {selectedOption === ""
              ? "All transactions"
              : `Transactions from ${selectedOption}: `}
          </h3>
          <Table
            transactionsToShow={transactionsToShow}
            selectedOption={selectedOption}
          />
        </div>
        <div className="filter-section">
          <h4>Filter by Bank Accounts: </h4>
          <select onChange={handleOnChange} value={selectedOption}>
            <option value={""}>All</option>
            {bankAccounts.map((bank) => (
              <option key={bank.id} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
          <p
            onClick={() => {
              setSelectedOption("");
            }}
            className="clear-filter"
          >
            Clear filter <FilterAltOffIcon />
          </p>
        </div>
      </div>
    </main>
  );
};
export default MyTransactions;
