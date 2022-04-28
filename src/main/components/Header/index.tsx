import { useDispatch, useSelector } from "react-redux";
import useGetUser from "../../hooks/useGetUser";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import onLogout from "../../store/stores/user/login.store.on-logout";
import "./style.css";
import logo from "../../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/redux/rootState";
const Header = () => {
  const currentUser = useGetUser();

  const cart = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useGetUser();
  const handleClick = () => {
    dispatch(onLogout());
  };

  const handleCartButton = () => {
    navigate("/cart", { replace: true });
  };

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    user && (
      <header>
        <div className="left-side">
          <img
            onClick={handleLogoClick}
            src={logo}
            alt="official-logo"
            className="official-logo"
          />
        </div>
        <div className="right-side">
          <ul className="right-side__list">
            <li>
              <h3>Welcome, {currentUser.firstName}!</h3>
            </li>
            <li>
              <button onClick={handleClick} className="log-out-btn">
                Log out
              </button>
            </li>
            <li onClick={handleCartButton} className="cart-btn-container">
              <span onClick={handleCartButton} className="products-on-card">
                {cart.products.length}
              </span>
              <button className="cart-btn">
                <ShoppingCartIcon style={{ fill: "#d6e3f8" }} />
              </button>
            </li>
          </ul>
        </div>
      </header>
    )
  );
};
export default Header;
