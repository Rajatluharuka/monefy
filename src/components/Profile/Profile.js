import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const nameRef = useRef();
  const urlRef = useRef();
  const token = useSelector((state) => state.auth.token);

  const [getName, setGetName] = useState("");
  const [getPhoto, setGetPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC2ZduoBV5f-a776LSQyGSSqMEgHISUZnw",
          {
            method: "POST",
            body: JSON.stringify({ idToken: token }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error?.message || "Authentication Failed");
        }

        const data = await response.json();
        setGetName(data.users[0].displayName);
        setGetPhoto(data.users[0].photoUrl);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchProfile();
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const url = urlRef.current.value;

    setLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC2ZduoBV5f-a776LSQyGSSqMEgHISUZnw",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: url,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Profile update failed");
      }

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <h3>
          <i>Winners persist, quitters resist success</i>
          <i className={styles.compNow}>
            Your profile is 65% complete{" "}
            <Link to="#" className={styles.comp}>
              Complete now 100%
            </Link>
          </i>
        </h3>
      </header>
      <div className={styles.detail}>
        <form onSubmit={submitHandler} className={styles.pro}>
          <h2>Contact Details</h2>
          <label>Full Name:</label>
          <input type="text" ref={nameRef} defaultValue={getName} />
          <label>Photo URL:</label>
          <input type="url" ref={urlRef} defaultValue={getPhoto} />
          <button className={styles.btn} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
