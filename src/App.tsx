import { Routes, Route, Navigate } from "react-router-dom";
import { Fragment, useCallback, useEffect, useState } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import { useThemeProvider } from "./contexts/theme-context";
import { useThemeGlobal } from "./hooks/useThemeGlobal";
import { getDataFromLocalStorage } from "./utils/localStorageUtils";
import { themeColors } from "./data/theme-colors";
import { AnimatePresence } from "framer-motion";
import { useAuthentication } from "./hooks/useAuthentication";

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
import { Tooltip } from "@material-tailwind/react";
import { tooltipMain } from "./utils/materialTailwind";
import Companies from "./pages/Companies";
import Greenhouses from "./pages/Greenhouses";
import Products from "./pages/Products";
import Varieties from "./pages/Varieties";
import CompaniesForGlobalTable from "./pages/CompaniesForGlobalTable";

let logoutTimer: any;

export const queryClient = new QueryClient();

function App() {
  ////vars
  const { t } = useTranslation();
  const { currentColor, setCurrentColor } = useThemeProvider();

  ////state
  ////authentication global data
  const {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    tokenExpirationDate,
    setTokenExpirationDate,
    userId,
    setUserId,
    authenticate,
  } = useAuthentication();

  ////theme global data
  const {
    isClicked,
    setIsClicked,
    handleClickOn,
    handleClickOff,
    currentMode,
    setCurrentMode,
    activeMenu,
    setActiveMenu,
    themeSettings,
    setThemeSettings,
    setMode,
  } = useThemeGlobal();

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

  //screenSize
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
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

                      {/* dictionaries  */}
                      {/* <Route path="/companies" element={<Companies />} /> */}
                      <Route
                        path="/companies"
                        element={<CompaniesForGlobalTable />}
                      />
                      <Route path="/greenhouses" element={<Greenhouses />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/varieties" element={<Varieties />} />

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
