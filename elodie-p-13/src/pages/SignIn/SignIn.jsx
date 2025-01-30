import "./signIn.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinThunk } from "../../thunk";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const token = useSelector((state) => state.user.token);
  const status = useSelector((state) => state.user.state);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      if (remember) {
        localStorage.token = token;
      }
      navigate("/user");
    }
  }, [token, remember, navigate]);

  const login = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinThunk({ email, password }));    
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={login}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                value={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>


          {(status === 'rejected') ? <p>
              Connexion impossible. Veuillez vérifier la connexion au serveur
            </p> : ''}            

            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </div>
    </>
  );
};
export default SignIn;
