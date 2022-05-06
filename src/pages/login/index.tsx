import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";
import onLogin from "../../main/store/stores/user/login.store.on-login";
const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userName = e.target.username.value;
    const password = e.target.password.value;
    const data = {
      userName,
      password,
    };
    try {
      dispatch(onLogin(data));
    } catch (err) {
      alert(err);
    }
  };

  const handleClick = () => {
    navigate("/register", { replace: true });
  };

  return (
    <main className="main-wrapper">
      <div className="main-container">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit} className="form login-form">
          <label>
            Username:
            <input type="text" name="username" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <input type="submit" value="Login" className="submit-btn" />
        </form>
        <p onClick={handleClick} className="form-info">
          Don't have an account? Register Now!
        </p>
      </div>
    </main>
  );
};

export default Login;
