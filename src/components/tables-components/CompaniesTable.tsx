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
import Pagination from "./Pagination";

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

  ////memoization
  const [columns, data] = useMemo(() => {
    const columns: any = [
      {
        Header: t("common:companies"),
        accessor: "name",
      },
      {
        id: "utility_column",
        Header: () => (
          <div
            onClick={() => setIsShowPostModal(true)}
            className="text-white dark:text-gray-200 dark:hover:text-black hover:text-black hover:bg-white hover:shadow-lg rounded-lg cursor-pointer p-2"
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
        ),
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

  console.log(pageOptions.length);

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
                  className={`py-3 dark:bg-gray-700 bg-gray-400 text-white rounded-xl text-center ${
                    column.id === "utility_column" ? "w-4" : "w-full"
                  }`}
                >
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <div>{column.render("Header")}</div>
                      <div className="">
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
                        {cell.column.id !== "utility_column" && (
                          <div className="flex-grow">{cell.render("Cell")}</div>
                        )}

                        {cell.column.id === "utility_column" && (
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
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pageOptions.length > 1 && (
        <Pagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </Fragment>
  );
};

export default CompaniesTable;
