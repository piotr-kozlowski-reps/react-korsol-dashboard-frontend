import { Tooltip } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { BsCheck } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { useThemeProvider } from "../contexts/theme-context";
import { tooltipMain } from "../utils/materialTailwind";
import { ColorsAvailable, ThemeColor } from "../utils/types/app.types";
import { motion } from "framer-motion";
import {
  containerFromRightVariants,
  containerVariants,
} from "../utils/framerMotionAnimationsVariants";

interface Props {
  setThemeSettings: Dispatch<SetStateAction<boolean>>;
  setMode: (e: any) => void;
  currentMode: "Light" | "Dark";
  themeColors: ThemeColor[];
}

const ThemeSettings = ({
  setThemeSettings,
  setMode,
  currentMode,
  themeColors,
}: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor, setColor } = useThemeProvider();

  ////jsx
  return (
    <motion.div
      className="bg-half-transparent w-screen fixed nav-item top-0 right-0"
      variants={containerFromRightVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-main-dark-bg w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">{t("common:settings")}</p>
          <Tooltip
            content={t("common:close")}
            placement="bottom"
            {...tooltipMain}
          >
            <button
              type="button"
              onClick={() => setThemeSettings(false)}
              style={{ color: "rgb(153,171,180)", borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
          </Tooltip>
        </div>

        <div className="flex-col border-t-1 border-color p-4 ml-4 dark:border-gray-700">
          <p className="font-semibold text-lg">{t("common:theme-settings")}</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              {t("common:light")}
            </label>
          </div>

          <div className="mt-4">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              {t("common:dark")}
            </label>
          </div>
        </div>

        <div className="flex-col border-t-1 border-color p-4 ml-4 dark:border-gray-700">
          <p className="font-semibold text-lg">{t("common:theme-colors")}</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <Tooltip
                content={item.name}
                placement="top"
                {...tooltipMain}
                key={index}
              >
                <div className="relative mt-2 cursor-pointer flex gap-5 items-center">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => {
                      setColor(item.color as ColorsAvailable);
                      setThemeSettings(false);
                    }}
                  >
                    <BsCheck
                      className={`ml-2 text-2xl text-white ${
                        item.color === currentColor ? "block" : "hidden"
                      }`}
                    />
                  </button>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThemeSettings;
