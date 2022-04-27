import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import onRegister from "../../main/store/stores/user/register.store.on-register";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const birthdate = e.target.birthdate.value;
    const phone = e.target.phone.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const data = {
      firstName,
      lastName,
      email,
      birthdate,
      phone,
      username,
      password,
    };
    dispatch(onRegister(data));
  };

  const handleClick = () => {
    navigate("/login", { replace: true });
  };
  return (
    <main className="main-wrapper">
      <div className="main-container">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit} className="form login-form">
          <label>
            First Name:
            <input type="text" name="firstName" />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Birthday:
            <input className="date" type="date" name="birthdate" />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" />
          </label>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <input type="submit" value="Register" className="submit-btn" />
        </form>
        <p onClick={handleClick} className="form-info">
          Already have an account? Sign in now!
        </p>
      </div>
    </main>
  );
};
export default Register;
