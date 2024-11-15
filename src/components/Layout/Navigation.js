import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth";
import { themeAction } from "../../store/themeSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const isDarkTheme = useSelector((state) => state.theme.isDark);

  const logoutHandler = () => {
    dispatch(authAction.logout());
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  const toggleThemeHandler = () => {
    dispatch(themeAction.toggleTheme());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Monefy</div>
      <nav>
        <ul>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login" className={styles.links}>
                  Login
                </Link>
              </li>
              <li>
                <button onClick={toggleThemeHandler}>
                  {isDarkTheme ? "Light Mode" : "Dark Mode"}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/Home" className={styles.links}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className={styles.links}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/expense" className={styles.links}>
                  Expenses
                </Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
              <li>
                <button onClick={toggleThemeHandler}>
                  {isDarkTheme ? "Light Mode" : "Dark Mode"}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
