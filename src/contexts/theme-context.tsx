import React, { createContext, useContext, useState } from "react";
import { ColorsAvailable } from "../utils/types/app.types";

////interfaces
interface ThemeProviderInterface {
  currentColor: ColorsAvailable;
  setColor: (color: ColorsAvailable) => void;
  setCurrentColor: React.Dispatch<React.SetStateAction<ColorsAvailable>>;
}
interface Props {
  children: JSX.Element;
}

////vars -> initial Data
const defaultState: ThemeProviderInterface = {
  currentColor: "#03C9D7",
  setColor: () => {},
  setCurrentColor: () => {},
};

////context
const ThemeContext = createContext<ThemeProviderInterface>(defaultState);

export const ThemeContextProvider = ({ children }: Props) => {
  ////vars
  const [currentColor, setCurrentColor] = useState<ColorsAvailable>("#03C9D7");

  const setColor = (color: ColorsAvailable) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  return (
    <ThemeContext.Provider value={{ currentColor, setColor, setCurrentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(ThemeContext);
