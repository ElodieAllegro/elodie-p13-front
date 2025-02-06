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
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const errorMessage = useSelector((state) => state.user.errorMessage);
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

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const login = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorEmail("Veuillez entrer une adresse e-mail valide.");
      return;
    } else {
      setErrorEmail("");
    }

    if (!validatePassword(password)) {
      setErrorPassword(
        "Le mot de passe doit contenir au moins 8 caractères, incluant des lettres et des chiffres."
      );
      return;
    } else {
      setErrorPassword("");
    }

    dispatch(signinThunk({ email, password }));
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
              {errorEmail && <p className="error-message">{errorEmail}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorPassword && (
                <p className="error-message">{errorPassword}</p>
              )}
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

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </div>
    </>
  );
};
export default SignIn;
