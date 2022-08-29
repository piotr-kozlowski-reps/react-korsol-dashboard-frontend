import { useState } from "react";
import { AuthResponse } from "../utils/types/app.types";
import jwt_decode from "jwt-decode";

interface AuthenticationReturnInterface {
  isLoggedIn: boolean;
  authenticate: (tokenPassed: string) => void;
}

/**
 *
 * to stare authenticate
 * nie używane już
 * potem wywalić
 */

export const useAuthentication = (): AuthenticationReturnInterface => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    Date | undefined
  >(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  interface TokenInternalData {
    userId: string;
    expirationDate: string;
    iat: number;
  }

  const authenticate = (tokenPassed: string) => {
    debugger;
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
    if (userIdExtractedFromToken) {
      setUserId(userIdExtractedFromToken);
    }
    setToken(tokenPassed);
    setTokenExpirationDate(expirationDateExtractedFromToken);
    setIsLoggedIn(true);
    //context - end
  };
  return {
    isLoggedIn,
    authenticate,
  };
};
