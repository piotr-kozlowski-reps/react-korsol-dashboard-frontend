import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTable } from "react-table";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";
import { tooltipMain } from "../../utils/materialTailwind";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Props {
  tableData: any[];
  deleteItem: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
}

const CompaniesTable = ({ tableData, deleteItem }: Props) => {
  ////vars
  const { t } = useTranslation();

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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }); //TODO: typ tutaj dograć

  ////logic
  function showAlert(message: string) {
    alert(message);
  }

  ////jsx
  return (
    <table
      {...getTableProps()}
      className="m-2 rounded-3xl w-full dark:bg-main-dark-bg "
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="py-3 dark:bg-white bg-gray-400 text-white rounded-xl"
              >
                <div className="flex justify-center items-center">
                  <div className="flex-grow">{column.render("Header")}</div>
                  <div className="text-white dark:text-gray-200 dark:hover:text-black hover:text-black hover:bg-white hover:shadow-lg rounded-lg cursor-pointer p-2 mr-4">
                    <Tooltip
                      content={t("common:add")}
                      placement="bottom"
                      {...tooltipMain}
                    >
                      <span
                        className=""
                        onClick={() => showAlert(`not implemented - add`)}
                      >
                        <IoMdAdd />
                      </span>
                    </Tooltip>
                  </div>
                </div>
                {/* <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? " desc..."
                      : " asc..."
                    : ""}
                </span> */}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="text-center">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="cursor-pointer duration-200 hover:bg-gray-50 duration-150 hover:scale-101"
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
                            className="p-2 text-gray-600 dark:text-gray-200 dark:hover:text-black hover:text-black hover:bg-white hover:shadow-lg rounded-lg"
                            onClick={() =>
                              showAlert(
                                `not implemented - edit - id: ${cell.row.original.id}`
                              )
                            }
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
                            className="p-2 text-gray-600 dark:text-gray-200 dark:hover:text-black hover:text-black hover:bg-white hover:shadow-lg rounded-lg"
                            onClick={() => deleteItem(cell.row.original.id)}
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
  );
};

export default CompaniesTable;
