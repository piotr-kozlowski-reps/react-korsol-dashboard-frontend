import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { useAuthentication } from "./hooks/authentication-hook";
import { ThemeContextProvider } from "./contexts/theme-context";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Login } from "./components/Login";

import "./i18n";

function App() {
  ////vars
  const { isLoggedIn } = useAuthentication();

  return (
    <ThemeContextProvider>
      <Fragment>
        {!isLoggedIn && <Login />}
        {isLoggedIn && (
          <Fragment>
            <Navbar />
            <Sidebar />
          </Fragment>
        )}
      </Fragment>
    </ThemeContextProvider>
  );
}

export default App;
