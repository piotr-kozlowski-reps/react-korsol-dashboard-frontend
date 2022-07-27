import { useState } from "react";

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    Date | undefined
  >(undefined);

  return {
    isLoggedIn,
  };
};
