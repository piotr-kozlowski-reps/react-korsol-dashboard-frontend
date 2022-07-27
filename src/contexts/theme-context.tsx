// import React, { createContext, useContext, useState, useMemo } from "react";

// ////interfaces
// interface ThemeProviderInterface {
//   currentColor: string;
// }
// interface Props {
//   children: JSX.Element;
// }

// ////vars -> initial Data
// const defaultState = {
//   currentColor: "#03C9D7",
// };

// const ThemeContext = createContext<ThemeProviderInterface>(defaultState);

// function useThemeProvider() {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error(`useCount must be used within a CountProvider`);
//   }
//   return context;
// }

// const ThemeContextProvider = ({ children }: Props) => {
//   ////vars
//   const [currentColor, setCurrentColor] = useState("03C9D7");
//   const value = useMemo(() => [currentColor, setCurrentColor], [currentColor]);
//   return <ThemeContext.Provider value={value} />
// };

// // function CountProvider(props) {
// //   const [count, setCount] = React.useState(0);
// //   const value = React.useMemo(() => [count, setCount], [count]);
// //   return <CountContext.Provider value={value} {...props} />;
// // }

// // export { CountProvider, useCount };

// ////////
// ////////
// ////////
// ////////
// ////////

import React, { createContext, useContext, useState } from "react";

////interfaces
interface ThemeProviderInterface {
  currentColor: string;
}
interface Props {
  children: JSX.Element;
}

////vars -> initial Data
const defaultState = {
  currentColor: "#03C9D7",
};

////context
const ThemeContext = createContext<ThemeProviderInterface>(defaultState);

export const ThemeContextProvider = ({ children }: Props) => {
  ////vars
  const [currentColor, setCurrentColor] = useState("#03C9D7");

  return (
    <ThemeContext.Provider value={{ currentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(ThemeContext);
