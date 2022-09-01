import { Routes, Route, Navigate } from "react-router-dom";
import { Fragment, useCallback, useEffect, useState } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import { useThemeProvider } from "./contexts/theme-context";
import { getDataFromLocalStorage } from "./utils/localStorageUtils";
import { themeColors } from "./data/theme-colors";
import { AnimatePresence } from "framer-motion";

import UserProfile from "./components/UserProfile";

import {
  ColorsAvailable,
  NavbarMenuIsClicked,
  WhichMenuItemClicked,
} from "./utils/types/app.types";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Login } from "./components/Login";

import "./i18n";
import Notifications from "./components/Notifications";
import ThemeSettings from "./components/ThemeSettings";
import Dashboard from "./pages/Dashboard";
import PlantVarieties from "./pages/PlantVarieties";
import Fields from "./pages/Fields";
import Owners from "./pages/Owners";
import Planters from "./pages/Planters";
import { Tooltip } from "@material-tailwind/react";
import { tooltipMain } from "./utils/materialTailwind";
import Companies from "./pages/Companies";

let logoutTimer: any;

export const queryClient = new QueryClient();

////interfaces
interface TokenInternalData {
  userId: string;
  expirationDate: string;
  iat: number;
}

function App() {
  ////vars
  const { t } = useTranslation();
  const { currentColor, setCurrentColor } = useThemeProvider();

  ////state
  ////temporary authentication not in custom hook - start
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    Date | undefined
  >(undefined);
  const [userId, setUserId] = useState("");

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
  const logoutAndClearLocalStorageAndAllStateElements = () => {
    //localStorage
    localStorage.removeItem("userData");
    //state
    handleClickOff("userProfile");
    setTokenExpirationDate(undefined);
    setToken(undefined);
    setUserId("");
    setIsLoggedIn(false);
  };
  ////temporary authentication not in custom hook - end

  ////temporary theme not in custom hook - start
  const initialState: NavbarMenuIsClicked = {
    userProfile: false,
    notification: false,
  };

  const [isClicked, setIsClicked] = useState(initialState);
  const [activeMenu, setActiveMenu] = useState(true);
  const [themeSettings, setThemeSettings] = useState(false);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [currentMode, setCurrentMode] = useState<"Light" | "Dark">("Light");

  const handleClickOn = (clicked: WhichMenuItemClicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  const handleClickOff = (clicked: WhichMenuItemClicked) => {
    setIsClicked({ ...initialState, [clicked]: false });
  };
  const setMode = (e: any) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };
  ////temporary theme not in custom hook - end

  ////logic
  //check if logged in via LocalStorage "userData" data (checking also if data haven't expired)
  useEffect(() => {
    const dataFromLocalStorageAsObject = getDataFromLocalStorage();

    if (!dataFromLocalStorageAsObject) return;

    const isLoggedInInLocalStorage = dataFromLocalStorageAsObject.isLoggedIn;
    const isDataExpiredInLocalStorage = checkIfDataExpired(
      new Date(),
      new Date(dataFromLocalStorageAsObject.expirationDate as string)
    );

    if (isLoggedInInLocalStorage && isDataExpiredInLocalStorage) {
      setIsLoggedIn(true);
      setTokenExpirationDate(
        new Date(dataFromLocalStorageAsObject.expirationDate as string)
      );
      setToken(dataFromLocalStorageAsObject.token);
      setUserId(dataFromLocalStorageAsObject.userId);
    }
  }, []);

  //logout when time expires
  const logoutPostponed = useCallback(() => {
    logoutAndClearLocalStorageAndAllStateElements();
  }, []);
  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime =
  //       new Date(tokenExpirationDate).getTime() - new Date().getTime();

  //     console.log({ remainingTime });

  //     logoutTimer = setTimeout(logoutPostponed, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, tokenExpirationDate, logoutPostponed]);
  //TODO: go back here and check the logout logic

  //screenSize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!screenSize) return;
    if (screenSize <= 900) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize]);

  //initial theme
  useEffect(() => {
    const currentThemeColorGotFromLocalStorage =
      localStorage.getItem("colorMode");
    const currentThemeColor: ColorsAvailable =
      (currentThemeColorGotFromLocalStorage &&
        currentThemeColorGotFromLocalStorage === "#1A97F5") ||
      currentThemeColorGotFromLocalStorage === "#03C9D7" ||
      currentThemeColorGotFromLocalStorage === "#7352FF" ||
      currentThemeColorGotFromLocalStorage === "#FF5C8E" ||
      currentThemeColorGotFromLocalStorage === "#1E4DB7" ||
      currentThemeColorGotFromLocalStorage === "#FB9678"
        ? currentThemeColorGotFromLocalStorage
        : "#03C9D7";

    const themeModeGotFromLocalStorage = localStorage.getItem("themeMode");
    const currentThemeMode: "Light" | "Dark" =
      (themeModeGotFromLocalStorage &&
        themeModeGotFromLocalStorage === "Light") ||
      themeModeGotFromLocalStorage === "Dark"
        ? themeModeGotFromLocalStorage
        : "Light";
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor]);

  ////jsx
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <QueryClientProvider client={queryClient}>
        <Fragment>
          <div id="loading-hook"></div>
          <div id="backdrop-hook"></div>
          <div id="modal-hook"></div>
          {!isLoggedIn && <Login authenticate={authenticate} />}
          {isLoggedIn && (
            <Fragment>
              <div className="flex relative dark:bg-main-dark-bg">
                <div
                  className="fixed right-4 bottom-4"
                  style={{ zIndex: "1000" }}
                >
                  <Tooltip
                    content={t("common:settings")}
                    placement="top-start"
                    {...tooltipMain}
                  >
                    <button
                      type="button"
                      className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                      style={{
                        background: currentColor,
                        borderRadius: "50%",
                      }}
                      onClick={() => setThemeSettings(true)}
                    >
                      <FiSettings />
                    </button>
                  </Tooltip>
                </div>
                <AnimatePresence>
                  {activeMenu ? (
                    <div className="w-80 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                      <Sidebar
                        userId={userId}
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                        screenSize={screenSize}
                      />
                    </div>
                  ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                      <Sidebar
                        userId={userId}
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                        screenSize={screenSize}
                      />
                    </div>
                  )}
                </AnimatePresence>

                <div
                  className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                    activeMenu ? "md:ml-80" : " flex-2"
                  }`}
                >
                  <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                    <Navbar
                      userId={userId}
                      setActiveMenu={setActiveMenu}
                      isClicked={isClicked}
                      handleClickOn={handleClickOn}
                      userProfile={
                        <UserProfile
                          userId={userId}
                          handleClickOff={handleClickOff}
                          logoutHandler={
                            logoutAndClearLocalStorageAndAllStateElements
                          }
                        />
                      }
                      notifications={
                        <Notifications handleClickOff={handleClickOff} />
                      }
                    />
                  </div>
                  <AnimatePresence>
                    {themeSettings && (
                      <ThemeSettings
                        setThemeSettings={setThemeSettings}
                        currentMode={currentMode}
                        setMode={setMode}
                        themeColors={themeColors}
                      />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    <Routes>
                      {/* dashboard  */}
                      <Route
                        path="/"
                        element={<Navigate to={`/dashboard/`} />}
                      />
                      <Route path="/dashboard/" element={<Dashboard />} />

                      {/* monitoring  */}
                      <Route
                        path="/plant_varieties"
                        element={<PlantVarieties />}
                      />
                      <Route path="/companies" element={<Companies />} />
                      <Route path="/fields" element={<Fields />} />
                      <Route path="/owners" element={<Owners />} />
                      <Route path="/planters" element={<Planters />} />

                      {/* apps  */}
                      {/*<Route path="/kanban" element={<Kanban />} />
                     <Route path="/editor" element={<Editor />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/color-picker" element={<ColorPicker />} /> */}

                      {/* charts  */}
                      {/* <Route path="/line" element={<Line />} />
                    <Route path="/area" element={<Area />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/financial" element={<Financial />} />
                    <Route path="/color-mapping" element={<ColorMapping />} />
                    <Route path="/pyramid" element={<Pyramid />} />
                    <Route path="/stacked" element={<Stacked />} /> */}
                    </Routes>
                  </AnimatePresence>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </QueryClientProvider>
    </div>
  );
}

export default App;

//utils
export function checkIfDataExpired(dataNow: Date, dataToBeChecked: Date) {
  return dataNow.getTime() < dataToBeChecked.getTime();
}
