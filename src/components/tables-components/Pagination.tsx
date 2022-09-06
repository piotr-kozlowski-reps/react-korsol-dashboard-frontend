import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../../contexts/theme-context";

import Button from "../Button";

interface Props {
  pageIndex: number;
  pageOptions: number[];
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  pageCount: number;
}

const Pagination = ({
  pageIndex,
  pageOptions,
  gotoPage,
  pageSize,
  setPageSize,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageCount,
}: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [isGoToPageFocused, setIsGoToPageFocused] = useState(false);

  ////jsx
  return (
    <div className="mt-8 flex justify-end items-center border-t-2 pt-5 dark:border-[#555]">
      <span className="text-sm dark:text-white">
        {`${t("common:page")}: `}
        <strong>{`${pageIndex + 1} `}</strong>
        {`${t("common:of")}`}
        <strong>{` ${pageOptions.length}`}</strong>
      </span>
      <div className="flex items-center">
        <span className="ml-6 text-sm dark:text-white">
          {`${t("common:go-to-page")}: `}
        </span>
        <input
          type="number"
          min={1}
          max={pageOptions.length}
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          onFocus={() => setIsGoToPageFocused(true)}
          onBlur={() => setIsGoToPageFocused(false)}
          className={`focus:border-b-2 transition-all ease-out duration-200 ml-1 p-1 bg-gray-100 dark:bg-main-dark-bg outline-none rounded-sm border-b-2 border-[#fafbfb] dark:border-[#555] dark:text-white`}
          style={{
            borderColor: isGoToPageFocused ? currentColor : "",
            width: "40px",
          }}
        />
      </div>
      <div className="mx-6 text-sm dark:text-white">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className={`focus:border-b-2 transition-all text-base ease-out duration-200 ml-1 p-1 bg-gray-100 dark:bg-main-dark-bg outline-none rounded-sm border-b-2 border-[#fafbfb] dark:border-[#555] dark:text-white`}
        >
          {[10, 25, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              className="hover:outline-none"
            >
              {`${t("common:show")} ${pageSize}`}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="button"
        color="white"
        bgColor={currentColor}
        text={`<<`}
        borderRadius="10px"
        size="xs"
        additionalClass="px-3 ml-1"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      />

      <Button
        type="button"
        color="white"
        bgColor={currentColor}
        text={t("common:previous")}
        borderRadius="10px"
        size="xs"
        additionalClass="px-3 ml-1"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      />

      <Button
        type="button"
        color="white"
        bgColor={currentColor}
        text={t("common:next")}
        borderRadius="10px"
        size="xs"
        additionalClass="px-3 mx-1"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      />

      <Button
        type="button"
        color="white"
        bgColor={currentColor}
        text={`>>`}
        borderRadius="10px"
        size="xs"
        additionalClass="px-3"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      />
    </div>
  );
};

export default Pagination;
