import React, { useRef, useState } from "react";
import styles from "./RegistrationForm.module.css";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      setIsPasswordMatched(false);
      return;
    }

    setIsPasswordMatched(true);
    setIsLoading(true);
    setStatusMessage("");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2ZduoBV5f-a776LSQyGSSqMEgHISUZnw",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);

      if (!res.ok) {
        const data = await res.json();
        let errorMsg = "Registration Failed";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      setStatusMessage("Registration Successful!");
      console.log(data);
    } catch (error) {
      setIsLoading(false);
      setStatusMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Registration Form</h2>
      <div className={styles.form_body}>
        <div>
          <label className={styles.form__label}>Email </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className={styles.form__label}>Password </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label className={styles.form__label}>Confirm Password </label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
            required
          />
          {!isPasswordMatched && (
            <p className={styles.error}>Passwords do not match!</p>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <button type="submit" className={styles.btn} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        {isLoading && <p>Loading....</p>}
      </div>
      {statusMessage && <p>{statusMessage}</p>}
      <p className={styles.reg_login}>
        Have an account?{" "}
        <Link to="/login" className={styles.login_link}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
