import { useDispatch, useSelector } from "react-redux";
import useGetUser from "../../hooks/useGetUser";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./style.css";
import logo from "../../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/redux/rootState";
import AccountMenu from "../ProfileIcon/index";
import { setSearch } from "../../store/stores/search/search.store";
const Header = () => {
  const currentUser = useGetUser();

  const cart = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useGetUser();

  // const handleClick = () => {
  //   dispatch(onLogout());
  // };

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
        <div className="search">
          <input
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
            type="search"
            name="search"
            placeholder="Search"
          />
          <SearchIcon
            className="search-icon"
            sx={{ fontSize: "1.6rem", height: "100%", color: "#b5b5b5" }}
          />
        </div>
        <div className="right-side">
          <ul className="right-side__list">
            <li>
              <h3>Welcome, {currentUser.firstName}!</h3>
            </li>
            <li>
              <AccountMenu />
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
