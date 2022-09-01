import React, { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../../contexts/theme-context";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TbArrowBarDown, TbArrowBarToUp } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";
import { tooltipMain } from "../../utils/materialTailwind";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { AnimatePresence } from "framer-motion";
import { Company } from "../../utils/types/app.types";

import CompaniesForm from "../formik-forms/CompaniesForm";
import GlobalFilter from "./GlobalFilter";
import Button from "../Button";

interface Props {
  tableData: any[];
  deleteItem: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
  postItem: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Company,
    unknown
  >;
  putItem: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Company,
    unknown
  >;
}

const CompaniesTable = ({
  tableData,
  deleteItem,
  postItem,
  putItem,
}: Props) => {
  ////vars
  const { t } = useTranslation();
  const [isShowPostModal, setIsShowPostModal] = useState(false);
  const [isShowPutModal, setIsShowPutModal] = useState(false);
  const [putData, setPutData] = useState<Company>({ id: "", name: "" });
  const { currentColor } = useThemeProvider();
  const [isGoToPageFocused, setIsGoToPageFocused] = useState(false);

  ////memoization
  const [columns, data] = useMemo(() => {
    const columns: any = [
      {
        Header: t("common:companies"),
        accessor: "name",
      },
    ];
    return [columns, tableData];
  }, [tableData, t]);

  ////table
  // function compareStrings(rowA: string[], rowB: string[], id: Number, desc: boolean): Number {
  //   let a = rowA.values[id!]
  // }
  //TODO: sortowanie
  //https://stackoverflow.com/questions/63927644/how-does-one-supply-a-custom-sort-function-for-react-table-7
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable<Company>(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  ////logic
  function showAlert(message: string) {
    alert(message);
  }

  ////jsx
  return (
    <Fragment>
      <AnimatePresence>
        {isShowPostModal && (
          <CompaniesForm
            onCancel={setIsShowPostModal}
            postItem={postItem}
            isPutOrPost="POST"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isShowPutModal && (
          <CompaniesForm
            onCancel={setIsShowPutModal}
            isPutOrPost="PUT"
            putItem={putItem}
            companyData={putData}
          />
        )}
      </AnimatePresence>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        {...getTableProps()}
        className="m-2 rounded-3xl w-full dark:bg-main-dark-bg"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-3 dark:bg-gray-700 bg-gray-400 text-white rounded-xl"
                >
                  <div className="flex justify-center items-center">
                    <div className="flex-grow">
                      <div className="flex justify-center items-center">
                        <div>{column.render("Header")}</div>
                        <div className="ml-2">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <TbArrowBarToUp />
                            ) : (
                              <TbArrowBarDown />
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => setIsShowPostModal(true)}
                      className="text-white dark:text-gray-200 dark:hover:text-black hover:text-black hover:bg-white hover:shadow-lg rounded-lg cursor-pointer p-2 mr-4"
                    >
                      <Tooltip
                        content={t("common:add")}
                        placement="bottom"
                        {...tooltipMain}
                      >
                        <span className="">
                          <IoMdAdd />
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-center">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="group dark:hover:text-black dark:hover:bg-light-gray hover:bg-gray-200 duration-150 hover:scale-101 text-gray-800 dark:text-gray-200"
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="py-3 rounded-xl">
                      <div className="flex justify-center items-center">
                        <div className="flex-grow">{cell.render("Cell")}</div>
                        <div className="flex justify-center items-center">
                          <Tooltip
                            content={t("common:edit")}
                            placement="bottom"
                            {...tooltipMain}
                          >
                            <span
                              className="p-2 text-gray-600 dark:text-gray-200 dark:hover:text-black group-hover:text-black hover:bg-white hover:shadow-lg rounded-lg cursor-pointer"
                              onClick={() => {
                                setPutData(cell.row.original);
                                setIsShowPutModal(true);
                              }}
                            >
                              <AiOutlineEdit />
                            </span>
                          </Tooltip>
                          <Tooltip
                            content={t("common:delete")}
                            placement="bottom"
                            {...tooltipMain}
                          >
                            <span
                              className="p-2 text-gray-600 dark:text-gray-200 dark:hover:text-black group-hover:text-black hover:bg-white hover:shadow-lg rounded-lg cursor-pointer"
                              onClick={() => {
                                deleteItem(cell.row.original.id);
                              }}
                            >
                              <AiOutlineDelete />
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
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
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
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
    </Fragment>
  );
};

export default CompaniesTable;
