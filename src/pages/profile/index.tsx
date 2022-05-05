import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Profile = () => {
  const navigate = useNavigate();
  return (
    <main className="default-main profile-main">
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fill: "#ffff", fontSize: "2rem" }} />
      </button>
      <div className="default-container profile-container">
        <ul className="profile-list-choice">
          <li className="profile-list-choice__item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="profile-list-choice__item">
            <Link to="/my-transactions">My Transactions</Link>
          </li>
          <li className="profile-list-choice__item">
            <Link to="/bank-accounts">My Bank Accounts</Link>
          </li>
          <li className="profile-list-choice__item">
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </main>
  );
};
export default Profile;
