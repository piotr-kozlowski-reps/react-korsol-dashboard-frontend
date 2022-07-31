import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useThemeProvider } from "../contexts/theme-context";
import { WhichMenuItemClicked } from "../utils/types/app.types";
import dummyProfilePhoto from "../images/avatar_dummy.jpg";
import Button from "./Button";
import { useGetConfigDataWithoutFetching } from "../hooks/useGetConfigDataWithoutFetching";

interface Props {
  userId: string;
  handleClickOff: (clicked: WhichMenuItemClicked) => void;
  logoutHandler: () => void;
}

const UserProfile = ({ userId, handleClickOff, logoutHandler }: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const {
    userProfileImage,
    userProfileName,
    userProfileSurname,
    userProfileEmail,
  } = useGetConfigDataWithoutFetching();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-2xl">
      <div className="flex justify-between items-center ">
        <p className="font-semibold text-lg dark:text-gray-200">
          {t("common:userProfile")}
        </p>
        <button
          type="button"
          onClick={() => {
            handleClickOff("userProfile");
          }}
          className="text-xl rounded-full p-3 hover:bg-light-gray  block hover:shadow-lg"
        >
          <MdOutlineCancel />
        </button>
      </div>

      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          src={userProfileImage ? userProfileImage : dummyProfilePhoto}
          alt="User Profile"
          className="rounded-full h-24 w-24"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-400">
            {userProfileName
              ? `${userProfileName} ${userProfileSurname}`
              : t("common:unknown")}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {userProfileEmail ? userProfileEmail : t("common:unknown")}
          </p>
        </div>
      </div>

      <div
        className="flex items-center gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
        onClick={() => alert("not implemented")}
      >
        <button
          type="button"
          className="text-xl rounded-lg p-3 hover:bg-light-gray"
        >
          <AiOutlineUser />
        </button>
        <div>
          <p className="font-semibold dark:text-gray-200">
            {t("common:yourProfile")}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Button
          type="button"
          color="white"
          bgColor={currentColor}
          text={t("common:logout")}
          borderRadius="10px"
          width="full"
          onClick={logoutHandler}
        />
      </div>
    </div>
  );
};

export default UserProfile;
