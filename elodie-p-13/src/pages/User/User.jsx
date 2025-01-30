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

  const handleDelete = () => {
    setLocalFirstName(firstName);
    setLocalLastName(lastName);
  };
  const setUserProfile = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        setUserProfileThunk({
          firstName: localFirstName,
          lastName: localLastName,
          token,
        })
      );
      setEdition(!edition);
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
            <button
              className="edit-button"
              onClick={() => setEdition(!edition)}
            >
              Edit Name
            </button>
          )}
          {edition ? (
            <form className="form" onSubmit={setUserProfile}>
              <div>
                <input
                  className="editInput"
                  value={localFirstName}
                  placeholder="firstName"
                  onChange={(e) => setLocalFirstName(e.target.value)}
                />
                <button className="edit-button">Save</button>
              </div>

              <div>
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
