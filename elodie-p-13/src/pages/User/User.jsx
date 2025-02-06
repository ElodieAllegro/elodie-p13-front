import { useEffect, useState } from "react";
import "./user.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk, setUserProfileThunk } from "../../thunk";
import { useNavigate } from "react-router-dom";

const User = () => {
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const token = useSelector((state) => state.user.token);

  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);
  const [errorMessage, setErrorMessage] = useState("");
  const [edition, setEdition] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfileThunk(token));
  }, [dispatch, token]);

  useEffect(() => {
    setLocalFirstName(firstName);
    setLocalLastName(lastName);
  }, [firstName, lastName]);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [navigate, token]);

  const handleDelete = (e) => {
    e.preventDefault();
    setLocalFirstName("");
    setLocalLastName("");
    setEdition(true);
  };

  // Si les champs sont vides, ne pas envoyer les modifications
  const setUserProfile = async (e) => {
    e.preventDefault();
    const regex = /^[A-Za-z]{2,}$/;
    if (localFirstName.trim() === "" && localLastName.trim() === "") {
      return;
    }
    if (!regex.test(localFirstName) || !regex.test(localLastName)) {
      setErrorMessage(
        "Le nom et le prénom doivent contenir au moins 2 lettres , aucun chiffres ni caractères spéciaux."
      );
      return;
    }
    setErrorMessage("");
    try {
      dispatch(
        setUserProfileThunk({
          firstName: localFirstName,
          lastName: localLastName,
          token,
        })
      );
      setEdition(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="bg-dark">
        <div className="header">
          <h1>
            Welcome back <br></br>
            {!edition && ` ${firstName} ${lastName} !`}
          </h1>
          {!edition && (
            <button className="edit-button" onClick={() => setEdition(true)}>
              Edit Name
            </button>
          )}
          {edition ? (
            <form className="form" onSubmit={setUserProfile}>
              <div className="errorMessage">
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
              <div className="inputForm">
                <div className="inputDiv">
                  <input
                    className="editInput"
                    value={localFirstName}
                    placeholder="firstName"
                    onChange={(e) => setLocalFirstName(e.target.value)}
                  />
                  <button className="edit-button">Save</button>
                </div>

                <div className="inputDiv">
                  <input
                    className="editInput"
                    value={localLastName}
                    placeholder="lastName"
                    onChange={(e) => setLocalLastName(e.target.value)}
                  />
                  <button className="edit-button" onClick={handleDelete}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default User;
