import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./ForgetPasswordForm.module.css";

const ForgetPasswordForm = () => {
  const emailRef = useRef();

  const sendLink = async (e) => {
    e.preventDefault();

    const registeredMail = emailRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC2ZduoBV5f-a776LSQyGSSqMEgHISUZnw",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: registeredMail,
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
      alert("Password reset link has been sent to your email.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <form onSubmit={sendLink} className={styles.form}>
        <h2>Forgot Password</h2>
        <i>Enter your registered email to reset your password.</i>
        <div className={styles.form_body}>
          <input
            type="email"
            id="email"
            placeholder="Enter Registered Email"
            ref={emailRef}
            required
          />
        </div>
        <button type="submit" className={styles.btn}>
          Send Link
        </button>
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
