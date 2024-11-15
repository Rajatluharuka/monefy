import React, { useRef, useState } from "react";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (enteredEmail.trim() === "" || enteredPassword.trim() === "") {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2ZduoBV5f-a776LSQyGSSqMEgHISUZnw",
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

      if (res.ok) {
        const data = await res.json();
        if (data.idToken) {
          localStorage.setItem("token", data.idToken);
          dispatch(authAction.login(data.idToken));
          localStorage.setItem("email", data.email.replace(/[@.]/g, ""));
        }
      } else {
        const data = await res.json();
        let errorMsg = "Authentication Failed";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.login}>
      <h2>Login Form</h2>
      <div className={styles.body}>
        <div>
          <label className={styles.label}>Email </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className={styles.label}>Password </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.btns}>
        <button type="submit" className={styles.btn} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isLoading && <p>Loading....</p>}
      </div>
      <p>
        Don't Have an account?{" "}
        <Link to="/register" className={styles.register_link}>
          Register
        </Link>
      </p>
      <Link to="/forget" className={styles.forget_link}>
        Forget password
      </Link>
    </form>
  );
};

export default LoginForm;
