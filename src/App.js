import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import styles from "./App.module.css";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegistrationPage = React.lazy(() => import("./pages/RegistrationPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ForgetPasswordPage = React.lazy(() =>
  import("./pages/ForgetPasswordPage")
);
const ExpensePage = React.lazy(() => import("./pages/ExpensePage"));

const App = () => {
  const isDarkTheme = useSelector((state) => state.theme.isDark);
  const isLogin = useSelector((state) => state.auth.isLoggedin);

  return (
    <div className={isDarkTheme ? styles.darkTheme : styles.lightTheme}>
      <Layout>
        <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
          <Switch>
            <Route path="/" exact>
              {isLogin ? <Redirect to="/home" /> : <Redirect to="/login" />}
            </Route>

            <Route path="/login">
              {isLogin ? <Redirect to="/home" /> : <LoginPage />}
            </Route>

            <Route path="/register">
              {isLogin ? <Redirect to="/home" /> : <RegistrationPage />}
            </Route>

            <Route path="/forget">
              {isLogin ? <Redirect to="/home" /> : <ForgetPasswordPage />}
            </Route>

            <Route path="/home">
              {isLogin ? <HomePage /> : <Redirect to="/login" />}
            </Route>

            <Route path="/profile">
              {isLogin ? <ProfilePage /> : <Redirect to="/login" />}
            </Route>

            <Route path="/expense">
              {isLogin ? <ExpensePage /> : <Redirect to="/login" />}
            </Route>

            <Route path="*">
              {isLogin ? <Redirect to="/home" /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
};

export default App;
