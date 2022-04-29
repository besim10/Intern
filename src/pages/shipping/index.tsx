import "./style.css";
import bagIcon from "../../assets/images/bag.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import IShippingAddress from "../../main/interfaces/IShippingAddress";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const shippingInfo: IShippingAddress = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      address: e.target.address.value,
      country: e.target.country.value,
      postalCode: e.target.postalCode.value,
      city: e.target.city.value,
      state: e.target.state.value,
    };
  };
  return (
    <main className="main-wrapper shipping-wrapper">
      <div className="main-container shipping-main">
        <h3>Secure Checkout</h3>
        <h4>Shipping Address</h4>
        <form onSubmit={handleSubmit} className="shipping-form">
          <div className="column">
            <input type="text" name="firstName" placeholder="First Name*" />
            <input type="text" name="lastName" placeholder="Last Name*" />
          </div>
          <div className="column">
            <input type="email" name="email" placeholder="Email*" />
            <input type="phone" name="phone" placeholder="Phone*" />
          </div>
          <input type="text" name="address" placeholder="Address*" />
          <input type="text" name="country" placeholder="Country*" />
          <div className="column">
            <input type="text" name="postalCode" placeholder="Postal Code*" />
            <input type="text" name="city" placeholder="City*" />
            <input
              type="text"
              name="state"
              placeholder="State/Province/Territory*"
            />
          </div>
          <button
            className="checkout-btn checkout-btn-on-shipping"
            type="button"
            onClick={() => {
              navigate("/payment", { replace: true });
            }}
          >
            <img src={`${bagIcon}`} alt="bag-icon" />
            Continue Checkout
          </button>
        </form>
      </div>
    </main>
  );
};
export default Shipping;
