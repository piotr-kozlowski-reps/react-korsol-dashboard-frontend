import React, { Dispatch, Fragment, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../contexts/theme-context";
import { useConfigGetData } from "../hooks/useConfigGetData";
import { Link, NavLink } from "react-router-dom";
import dummyLogo from "../images/dummy_logo.png";
import { ConfigFetched } from "../utils/types/app.types";
import { AxiosError, AxiosResponse } from "axios";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";
import SVGStringIntoComponentMaker from "../utils/SVGStringIntoComponentMaker";
import { Tooltip } from "@material-tailwind/react";
import { tooltipMain } from "../utils/materialTailwind";
import { AnimatePresence, motion } from "framer-motion";
import {
  containerVariants,
  fromLeftMoveDelayedVariants,
  fromLeftMoveVariants,
} from "../utils/framerMotionAnimationsVariants";

interface Props {
  userId: string;
  activeMenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  screenSize: number | undefined;
}

const Sidebar = ({ userId, activeMenu, setActiveMenu, screenSize }: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();

  ////fetching data
  const { data, isFetching, isLoading, isError, error } = useConfigGetData();

  const dataTyped = data;

  // console.log(dataTyped);

  ////logic
  const handleCloseSideBar = () => {
    if (!screenSize) return;
    if (activeMenu && screenSize <= 900) setActiveMenu(false);
  };

  //links styling
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 cursor-pointer uppercase";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md text-gray-600 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 cursor-pointer uppercase font-medium";

  let content = <div>loading sidebar data...</div>;
  if (dataTyped && !isLoading) {
    content = (
      <motion.div
        className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10"
        variants={fromLeftMoveVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {activeMenu && (
          <Fragment>
            <div className="flex justify-between items-center">
              <Link to="/dashboard" title="dashboard">
                <div
                  onClick={handleCloseSideBar}
                  className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900 cursor-pointer"
                >
                  <img
                    className="w-9 h-9 rounded-full"
                    src={dataTyped.data.sidebar.companyLogo}
                    alt={dataTyped.data.sidebar.companyName}
                  />
                  <span>{dataTyped.data.sidebar.companyName}</span>
                </div>
              </Link>

              <Tooltip
                content={t("common:menu")}
                placement="bottom"
                {...tooltipMain}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu((prevActiveMenu: boolean) => !prevActiveMenu)
                  }
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                >
                  <MdOutlineCancel />
                </button>
              </Tooltip>
            </div>
            <div className="mt-10">
              {dataTyped.data.sidebar.linksGroups.map((item, index) => (
                <motion.div key={index}>
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link, index) => (
                    <motion.div
                      className="ml-6"
                      variants={fromLeftMoveDelayedVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      key={index}
                    >
                      <NavLink
                        to={`/${link.route}`}
                        key={link.name}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                        title={`${link.route}`}
                      >
                        <SVGStringIntoComponentMaker
                          keyToMap={link.reactIcon}
                        />
                        <span className="uppercase">{link.name}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </Fragment>
        )}
      </motion.div>
    );
    if (dataTyped && isLoading) {
      content = (
        <motion.div
          className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 animate-pulse"
          variants={fromLeftMoveVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex justify-between items-center">
            <div className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900 cursor-pointer font-loading">
              <img
                src={dummyLogo}
                alt="dummy logo"
                className="rounded-full w-9 h-9"
              />
              <span>dummy info</span>
            </div>
          </div>

          <div className="mt-10 font-loading">
            {dataTyped.data.sidebar.linksGroups.map((item, index) => (
              <div key={index}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <div key={link.name}>
                    <motion.div
                      className="ml-6"
                      variants={fromLeftMoveDelayedVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <img
                        src={dummyLogo}
                        alt="dummy logo"
                        className="rounded-full w-4 h-4 inline-block opacity-20"
                      />
                      <span className="ml-4">{link.name}</span>
                    </motion.div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (isError) {
      content = (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 text-center">
          Błąd przy pobieraniu danych
        </div>
      );
    }
  }
  ////jsx
  return <AnimatePresence>{content}</AnimatePresence>;
};

export default Sidebar;
