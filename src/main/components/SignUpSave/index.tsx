import useGetUser from "../../hooks/useGetUser";
import "./style.css";
const SignUpSave = () => {
  const user = useGetUser();
  return (
    user && <h4 className="title-sign-up">SIGN UP FOR EMAILS AND SAVE 10%</h4>
  );
};
export default SignUpSave;
