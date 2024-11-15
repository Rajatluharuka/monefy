import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout/Layout";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ExpensePage from "./pages/ExpensePage";
import { useSelector } from "react-redux";
import styles from "./App.module.css";

const App = () => {
  const isDarkTheme = useSelector((state) => state.theme.isDark);
  const isLogin = useSelector((state) => state.auth.isLoggedin);
  return (
    <div className={isDarkTheme ? styles.darkTheme : styles.lightTheme}>
      <Layout>
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
      </Layout>
    </div>
  );
};

export default App;
