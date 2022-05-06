import "./style.css";
import bagIcon from "../../assets/images/bag.svg";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import IShippingAddress from "../../main/interfaces/IShippingAddress";
import { setShippingAddress } from "../../main/store/stores/shipping-info/shippindAddress.store";
import { RootState } from "../../main/store/redux/rootState";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shippingAddress = useSelector(
    (state: RootState) => state.shippingAddress
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const shippingInfo: IShippingAddress = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      country: e.target.country.value,
      postalCode: e.target.postalCode.value,
      city: e.target.city.value,
      state: e.target.state.value,
    };
    dispatch(setShippingAddress(shippingInfo));
    navigate("/payment");
  };
  return (
    <main className="default-main shipping-wrapper">
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fill: "#ffff", fontSize: "2rem" }} />
      </button>
      <div className="default-container shipping-main">
        <h3>Secure Checkout</h3>
        <h4>Shipping Address</h4>
        {shippingAddress === null ? (
          <form onSubmit={handleSubmit} className="shipping-form">
            <div className="column">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                required
                minLength={2}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                required
                minLength={2}
              />
            </div>
            <div className="column">
              <input type="email" name="email" placeholder="Email*" required />
              <input
                type="text"
                name="phone"
                placeholder="Phone*"
                required
                minLength={7}
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address*"
              required
              minLength={4}
            />
            <input type="text" name="country" placeholder="Country*" required />
            <div className="column">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code*"
                required
                minLength={3}
              />
              <input type="text" name="city" placeholder="City*" required />
              <input
                type="text"
                name="state"
                required
                minLength={3}
                placeholder="State/Province/Territory*"
              />
            </div>
            <button
              className="checkout-btn checkout-btn-on-shipping"
              type="submit"
            >
              <img src={`${bagIcon}`} alt="bag-icon" />
              Continue Checkout
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="shipping-form">
            <div className="column">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                required
                defaultValue={shippingAddress.firstName}
                minLength={2}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                required
                defaultValue={shippingAddress.lastName}
                minLength={2}
              />
            </div>
            <div className="column">
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                defaultValue={shippingAddress.email}
              />
              <input
                type="text"
                name="phone"
                defaultValue={shippingAddress.phone}
                placeholder="Phone*"
                required
                minLength={7}
              />
            </div>
            <input
              type="text"
              defaultValue={shippingAddress.address}
              name="address"
              placeholder="Address*"
              required
              minLength={4}
            />
            <input
              type="text"
              name="country"
              placeholder="Country*"
              required
              defaultValue={shippingAddress.country}
            />
            <div className="column">
              <input
                type="text"
                defaultValue={shippingAddress.postalCode}
                name="postalCode"
                placeholder="Postal Code*"
                required
                minLength={3}
              />
              <input
                type="text"
                name="city"
                placeholder="City*"
                required
                defaultValue={shippingAddress.city}
              />
              <input
                type="text"
                defaultValue={shippingAddress.state}
                name="state"
                required
                minLength={3}
                placeholder="State/Province/Territory*"
              />
            </div>
            <button
              className="checkout-btn checkout-btn-on-shipping"
              type="submit"
            >
              <img src={`${bagIcon}`} alt="bag-icon" />
              Continue Checkout
            </button>
          </form>
        )}
      </div>
    </main>
  );
};
export default Shipping;
