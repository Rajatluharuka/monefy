import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

  const emailHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC2ZduoBV5f-a776LSQyGSSqMEgHISUZnw",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMsg = "Authentication Failed";

        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }

        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log(data);
      alert("Email verification sent successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className={styles.head}>
        <h3 className={styles.expense}>Welcome to ExpenseTracker</h3>
        <h3 className={styles.profile}>
          Your profile is incomplete <Link to="Profile">Complete now</Link>
        </h3>
      </header>
      <div className={styles.verify}>
        <h2>Verify your email</h2>
        <button
          className={styles.bt}
          onClick={emailHandler}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Verify E-mail"}
        </button>
      </div>
    </>
  );
};

export default Home;
