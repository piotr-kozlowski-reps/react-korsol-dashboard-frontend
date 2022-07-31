import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiNotification3Line } from "react-icons/ri";
import { useThemeProvider } from "../contexts/theme-context";
import { useConfigGetData } from "../hooks/useConfigGetData";
import {
  NavbarMenuIsClicked,
  WhichMenuItemClicked,
} from "../utils/types/app.types";

import dummyProfilImage from "../images/avatar_dummy.jpg";

////navButton
interface NavButtonProps {
  title: string;
  customFunction: any;
  icon: any;
  color: string;
  dotColor?: string;
}
const NavButton = ({
  title,
  customFunction,
  icon,
  color,
  dotColor,
}: NavButtonProps) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunction}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

////navbar
interface Props {
  userId: string;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  isClicked: NavbarMenuIsClicked;
  handleClickOn: (clicked: WhichMenuItemClicked) => void;
  userProfile: JSX.Element;
  notifications: JSX.Element;
}

const Navbar = ({
  userId,
  setActiveMenu,
  isClicked,
  handleClickOn,
  userProfile,
  notifications,
}: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();

  ////fetching data
  const { data, isFetching, isError, error } = useConfigGetData();
  const dataTyped = data;

  let content = <div>NavBar</div>;
  if (dataTyped && isFetching) {
    content = (
      <div className="flex justify-between p-2 md: mx-6 relative animate-pulse">
        <NavButton
          title={t("common:menu")}
          customFunction={() => {}}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <div className="flex">
          <NavButton
            title={t("common:notifications")}
            customFunction={() => {}}
            color={currentColor}
            dotColor="#03C9D7"
            icon={<RiNotification3Line />}
          />
          <TooltipComponent
            content={t("common:profile")}
            position="BottomCenter"
          >
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => {}}
            >
              <img
                src={dummyProfilImage}
                alt="dummy profile"
                className="rounded-full w-8 h-8"
              />
              <p>
                <span className="text-gray-400 text-14">{`${t(
                  "common:hi"
                )}, `}</span>
                <span className="text-gray-400 font-bold ml-1 text-14 font-loading">
                  "Imię"
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>
        </div>
      </div>
    );
  }
  if (dataTyped && !isFetching) {
    content = (
      <div className="flex justify-between p-2 md: mx-6 relative">
        <NavButton
          title={t("common:menu")}
          customFunction={() =>
            setActiveMenu((prevActiveMenuState) => !prevActiveMenuState)
          }
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <div className="flex">
          <NavButton
            title={t("common:notifications")}
            customFunction={() => handleClickOn("notification")}
            color={currentColor}
            dotColor="#03C9D7"
            icon={<RiNotification3Line />}
          />
          <TooltipComponent
            content={t("common:profile")}
            position="BottomCenter"
          >
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClickOn("userProfile")}
            >
              <img
                src={dataTyped.data.userProfile.img}
                alt={dataTyped.data.userProfile.name}
                className="rounded-full w-8 h-8"
              />
              <p>
                <span className="text-gray-400 text-14">{`${t(
                  "common:hi"
                )}, `}</span>
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {dataTyped.data.userProfile.name}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>

          {isClicked.notification && notifications}
          {isClicked.userProfile && userProfile}
        </div>
      </div>
    );
  }
  ////jsx
  return content;
};

export default Navbar;

// import React, {
//   ButtonHTMLAttributes,
//   DetailedHTMLProps,
//   useEffect,
// } from "react";

// import type { WhichMenuItemClicked } from "../types/typings";

// const Navbar: NextComponentType = () => {
//
//
//   const {
//     isClicked,
//     setIsClicked,
//     handleClickOn,

//   } = useStateContext();

//   //fetching data
//   const { data: configFetched } = useSWR<ConfigFetched>("/api/config/1234");

//   ////jsx
//   return
// };

// export default Navbar;
