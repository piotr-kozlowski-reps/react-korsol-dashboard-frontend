import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../../contexts/theme-context";
import { useAsyncDebounce } from "react-table";

interface Props {
  filter: any;
  setFilter: (filterValue: any) => void;
}

const GlobalFilter = ({ filter, setFilter }: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(filter);

  ////logic
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);

  ////jsx
  return (
    <div className="flex justify-end items-center">
      <div className="dark:text-white">{`${t("common:search")} : `}</div>
      <div>
        <input
          placeholder={t("common:looking-for")}
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`focus:border-b-2 transition-all ease-out duration-200 min-w-full ml-2 p-2 bg-gray-100 dark:bg-main-dark-bg outline-none rounded-sm border-b-2 border-[#fafbfb] dark:border-[#555] dark:text-white`}
          style={{ borderColor: isFocused ? currentColor : "" }}
        />
      </div>
    </div>
  );
};

export default GlobalFilter;
