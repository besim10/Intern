import { useDispatch, useSelector } from "react-redux";
import useGetUser from "../../hooks/useGetUser";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import onLogout from "../../store/stores/user/login.store.on-logout";
import "./style.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const currentUser = useGetUser();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(onLogout());
  };

  const handleCartButton = () => {
    navigate("/cart");
  };
  return (
    <header>
      <div className="left-side">
        <h3>Welcome, {currentUser.firstName}!</h3>
      </div>
      <div className="right-side">
        <ul className="right-side__list">
          <li>
            <button onClick={handleClick} className="log-out-btn">
              Log out
            </button>
          </li>
          <li>
            <button onClick={handleCartButton} className="cart-btn">
              <ShoppingCartIcon style={{ fill: "#d6e3f8" }} />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
