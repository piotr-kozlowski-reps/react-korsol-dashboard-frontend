import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineCancel } from "react-icons/md";
import { useThemeProvider } from "../contexts/theme-context";
import { useGetConfigDataWithoutFetching } from "../hooks/useGetConfigDataWithoutFetching";
import { WhichMenuItemClicked } from "../utils/types/app.types";

interface Props {
  handleClickOff: (clicked: WhichMenuItemClicked) => void;
}

const Notifications = ({ handleClickOff }: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const { notifications } = useGetConfigDataWithoutFetching();

  let notificationsContent = (
    <div className="mt-5">{t("common:notificationLackInfo")}</div>
  );
  if (notifications) {
    notificationsContent = (
      <div className="mt-5">
        {notifications.map((item) => {
          return (
            <div
              className={`flex items-center group leading-4 gap-5 border-b-1 border-color p-3 hover:bg-light-gray cursor-pointer w-full py-5 rounded-lg `}
              key={item.notificationId}
              onClick={() => alert("not implemented")}
            >
              <div className={`${item.alreadyRead ? "pl-7" : ""}`}>
                <p
                  className={`text-gray-500 text-xs leading-none dark:text-gray-200 dark:group-hover:text-black`}
                >
                  {new Date(item.creationTime).toLocaleString()}
                </p>
                <p
                  className={`${
                    item.alreadyRead
                      ? "font-normal text-lg text-gray-400"
                      : "font-semibold text-lg"
                  }`}
                  style={!item.alreadyRead ? { color: currentColor } : {}}
                >
                  {item.message}
                </p>
                <p className="font-light dark:text-white  dark:group-hover:text-black">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  ////jsx
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-2xl">
      <div className="flex justify-between items-center">
        <p className="dark:text-white">{t("common:notifications")}</p>
        <button
          type="button"
          onClick={() => {
            handleClickOff("notification");
          }}
          className="text-xl rounded-full p-3 hover:bg-light-gray  block hover:shadow-lg dark:text-white dark:hover:text-black"
        >
          <MdOutlineCancel />
        </button>
      </div>
      {notificationsContent}
    </div>
  );
};

export default Notifications;
