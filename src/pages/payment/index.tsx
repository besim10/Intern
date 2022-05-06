import "./style.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { RootState } from "../../main/store/redux/rootState";
import IBankAccount from "../../main/interfaces/IBankAccount";
import axios from "axios";
import { invalidateCart } from "../../main/store/stores/cart/cart.store";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Payment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState({ value: false, amount: 0 });
  const [successPayment, setSuccesPayment] = useState(false);
  const [seconds, setSeconds] = useState(6);
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);

  const cart = useSelector((state: RootState) => state.cart);
  const shippingAddress = useSelector(
    (state: RootState) => state.shippingAddress
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () => toast.success("Order Succesfully Placed");

  useEffect(() => {
    if (cart.products.length === 0) {
      navigate("/dashboard");
    }

    getBankAccounts();

    return () => {
      setBankAccounts([]);
    };
  }, []);

  useEffect(() => {
    const bankAccount = bankAccounts.find(
      (bank) => bank.name === selectedOption
    );

    // if (bankAccounts.length === 0) return;
    if (bankAccount) {
      if (bankAccount.balance < cart.totalValue) {
        setError({
          value: true,
          amount: cart.totalValue - bankAccount.balance,
        });
      } else {
        setError({ value: false, amount: 0 });
      }
    }

    return () => {};
  }, [bankAccounts, selectedOption]);
  useEffect(() => {
    if (successPayment) {
      let interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      setTimeout(() => {
        navigate("/dashboard");
      }, 6000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, successPayment]);
  const getBankAccounts = async () => {
    const bankAccounts: IBankAccount[] = await (
      await axios.get("bankaccount/get-all?PageNumber=1&PageSize=20")
    ).data.data;
    setBankAccounts(bankAccounts);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const bankAccount = bankAccounts.find(
      (bank) => bank.name === selectedOption
    );

    const transaction = {
      bankAccountId: bankAccount.id,
      action: 1,
      amount: cart.totalValue,
      description: new Date().toLocaleString(),
      isActive: true,
    };
    const { data } = await axios.post("banktransaction", transaction);
    if (data.result) {
      dispatch(invalidateCart());
      setSuccesPayment(true);
      notify();
    }
  };

  const handleOnChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  if (bankAccounts.length === 0)
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={"4rem"} />
      </Box>
    );
  return (
    <main
      className={`default-main ${
        successPayment ? "completed-wrapper" : "payment-wrapper"
      }`}
    >
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fill: "#ffff", fontSize: "2rem" }} />
      </button>
      <div
        className={`default-container ${
          successPayment ? "completed-main" : "payment-main"
        }`}
      >
        {!successPayment ? (
          <>
            <h3>Secure Checkout</h3>
            <div className="shipping-section">
              <div className="shipping-address">
                <h4>Shipping Address</h4>
                <h5>
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </h5>
                <h5>{shippingAddress.address}</h5>
                <h5>
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.postalCode} {shippingAddress.country}
                </h5>
                <span
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="edit-button"
                >
                  EDIT
                </span>
              </div>
              <div className="shipping-days">
                <h4>Shipping </h4>
                <p>Standard Shipping: 2-4 Business Days (£4.95)</p>
              </div>
            </div>
            <form className="payment-form" onSubmit={handleSubmit} id="form1">
              <h3>Select your Bank Account:</h3>
              <ul className="bankAccount-list">
                {bankAccounts.map((bank) => (
                  <li key={bank.id} className="bankAccount-list__item">
                    <label className="label" htmlFor={bank.code}>
                      {bank.name}
                    </label>
                    <input
                      onChange={handleOnChange}
                      type="radio"
                      id={bank.code}
                      className="input"
                      name={bank.code}
                      value={bank.name}
                      checked={selectedOption === bank.name}
                    />
                    <span className="balance">
                      Balance: <strong>£{bank.balance.toFixed(2)}</strong>
                    </span>
                  </li>
                ))}
              </ul>
              {error.value ? (
                <p className="error">
                  You need £{error.amount} more to complete this order.
                </p>
              ) : null}
              <button
                form="form1"
                type="submit"
                value={"submit"}
                className={
                  error.value
                    ? "disabled"
                    : "checkout-btn checkout-btn-on-shipping"
                }
              >
                Complete Order
              </button>
            </form>
          </>
        ) : (
          <>
            <CheckCircleIcon sx={{ color: "#9D5C63", fontSize: "4rem" }} />
            <h3 className="message">Order Succesfully Placed</h3>
            <h4>Redirecting you in dashboard for {seconds} seconds...</h4>
          </>
        )}
      </div>
    </main>
  );
};
export default Payment;
