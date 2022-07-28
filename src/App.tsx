import { Routes, Route } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { ThemeContextProvider } from "./contexts/theme-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import jwt_decode from "jwt-decode";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Login } from "./components/Login";

import "./i18n";

const queryClient = new QueryClient();

////interfaces
interface TokenInternalData {
  userId: string;
  expirationDate: string;
  iat: number;
}

function App() {
  ////vars

  ////temporary authentication not in custom hook - start
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    Date | undefined
  >(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const authenticate = (tokenPassed: string) => {
    const decoded: TokenInternalData | undefined = jwt_decode(tokenPassed);
    if (!decoded)
      throw new Error(`Couldn't decode token, it seems to have bad format.`);

    //context - start
    let expirationDateExtractedFromToken: Date = new Date();
    let userIdExtractedFromToken: string | undefined = undefined;
    if (
      typeof decoded === "object" &&
      "expirationDate" in decoded &&
      "userId" in decoded
    ) {
      expirationDateExtractedFromToken = new Date(decoded.expirationDate); //TODO: regex sprawdzający czy ma dobry format
      userIdExtractedFromToken = decoded.userId;
    } else {
      throw new Error(`Couldn't decode token, it seems to have bad format.`);
    }

    if (userIdExtractedFromToken) {
      setUserId(userIdExtractedFromToken);
    }
    setToken(tokenPassed);
    setTokenExpirationDate(expirationDateExtractedFromToken);
    setIsLoggedIn(true);
    //context - end

    //localStorage - start
    localStorage.setItem(
      "userData",
      JSON.stringify({
        isLoggedIn: true,
        expirationDate: expirationDateExtractedFromToken.toISOString(),
        token: tokenPassed,
        userId: userIdExtractedFromToken,
      })
    );
    //localStorage - end
  };

  ////temporary authentication not in custom hook - end

  // const { isLoggedIn } = useAuthentication();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <Fragment>
          {!isLoggedIn && <Login authenticate={authenticate} />}
          {isLoggedIn && (
            <Fragment>
              <Navbar />
              <Sidebar />
            </Fragment>
          )}
        </Fragment>
      </ThemeContextProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
