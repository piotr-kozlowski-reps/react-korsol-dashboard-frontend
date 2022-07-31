import React, { Dispatch, Fragment, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../contexts/theme-context";
import { useConfigGetData } from "../hooks/useConfigGetData";
import { Link, NavLink } from "react-router-dom";
import dummyLogo from "../images/dummy_logo.png";
import { ConfigFetched } from "../utils/types/app.types";
import { AxiosError, AxiosResponse } from "axios";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";
import SVGStringIntoComponentMaker from "../utils/SVGStringIntoComponentMaker";

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
  const { data, isFetching, isError, error } = useConfigGetData();

  const dataTyped = data;

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

  let content = <div>sidebar...</div>;
  if (dataTyped && isFetching) {
    content = (
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 animate-pulse">
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
                <Fragment key={link.name}>
                  <div className="ml-6">
                    <img
                      src={dummyLogo}
                      alt="dummy logo"
                      className="rounded-full w-4 h-4 inline-block opacity-20"
                    />
                    <span className="ml-4">{link.name}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (dataTyped && !isFetching) {
    content = (
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        {activeMenu && (
          <Fragment>
            <div className="flex justify-between items-center">
              {/* //TODO: link dobry */}
              <Link to="/dashboard">
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
              <TooltipComponent
                content={t("common:menu")}
                position="BottomCenter"
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
              </TooltipComponent>
            </div>
            <div className="mt-10">
              {dataTyped.data.sidebar.linksGroups.map((item, index) => (
                <div key={index}>
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <NavLink
                      to={`/${link.route}`}
                      key={link.name}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      <SVGStringIntoComponentMaker keyToMap={link.reactIcon} />
                      <span className="uppercase">{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    );

    if (isError) {
      content = (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 text-center">
          Błąd przy pobieraniu danych
        </div>
      );
    }
  }
  ////jsx
  return content;
};

export default Sidebar;
