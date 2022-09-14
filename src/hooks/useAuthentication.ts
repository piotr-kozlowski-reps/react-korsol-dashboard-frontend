import { Dispatch, SetStateAction, useState } from "react";
import jwt_decode from "jwt-decode";
import { TokenInternalData } from "../utils/types/app.types";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";

// import { AuthResponse } from "../utils/types/app.types";

interface AuthenticationReturnInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  tokenExpirationDate: Date | undefined;
  setTokenExpirationDate: Dispatch<SetStateAction<Date | undefined>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  authenticate: (tokenPassed: string) => void;
}

/** Hook for managing global state of Authentication */
export const useAuthentication = (): AuthenticationReturnInterface => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    Date | undefined
  >(undefined);
  const [userId, setUserId] = useState("");

  //logic
  const authenticate = (tokenPassed: string) => {
    const decoded: TokenInternalData | undefined = jwt_decode(tokenPassed);
    if (!decoded)
      throw new Error(`Couldn't decode token, it seems to have bad format.`);

    console.log({ decoded });

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

    // console.log(
    //   "expirationDateExtractedFromToken.toISOString()",
    //   expirationDateExtractedFromToken.toISOString()
    // );
    // console.log({ tokenPassed });
    // console.log({ userIdExtractedFromToken });

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

    //context - start
    if (userIdExtractedFromToken && getDataFromLocalStorage()) {
      setUserId(userIdExtractedFromToken);
      setToken(tokenPassed);
      setTokenExpirationDate(expirationDateExtractedFromToken);
      setIsLoggedIn(true);
    }
    //context - end
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    tokenExpirationDate,
    setTokenExpirationDate,
    userId,
    setUserId,
    authenticate,
  };
};
