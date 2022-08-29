import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Company } from "../../utils/types/app.types";

interface Props {
  tableData: any[];
}

////dummy
const dummyCompaniesTableData: Company[] = [
  {
    id: "f1efe069-d5a3-497b-89f9-3b63cfd414fe",
    name: "Eimbee",
  },
  {
    id: "612a1237-d8fe-4784-af8e-99311a65a7ed",
    name: "Tavu",
  },
  {
    id: "3836f0af-98ca-42a6-aabb-96cffd64bd71",
    name: "Trudeo",
  },
  {
    id: "db2fef34-9e86-4e7c-b331-acc20326ca80",
    name: "Fivechat",
  },
  {
    id: "2c83f2e5-faa3-4313-92e4-8ad2fcba4c5e",
    name: "Twitternation",
  },
  {
    id: "1a60fe1a-aeef-49f4-8cc1-1f466abdcc07",
    name: "Skinte",
  },
];

////table
const columnHelper = createColumnHelper<Company>();
const columns: ColumnDef<Company>[] = [
  columnHelper.accessor("name", {
    header: () => <span>Firmy</span>,
    cell: (info) => info.getValue(),
  }),
];

const CompaniesTable = ({ tableData }: Props) => {
  ////vars
  const { t } = useTranslation();

  ////table

  const table = useReactTable({
    dummyCompaniesTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  ////jsx
  return (
    <p>companies table </p>

    // <table
    //   {...getTableProps()}
    //   className="m-2 rounded-3xl w-full dark:bg-main-dark-bg "
    // >
    //   <thead>
    //     {headerGroups.map((headerGroup, index) => (
    //       <tr {...headerGroup.getHeaderGroupProps()}>
    //         {headerGroup.headers.map((column) => (
    //           <th
    //             {...column.getHeaderProps(column.getSortByToggleProps())}
    //             className="gap-3 py-3 dark:bg-white bg-gray-400 text-white rounded-xl"
    //           >
    //             {column.render("Header")}
    //             <span>
    //               {column.isSorted
    //                 ? column.isSortedDesc
    //                   ? " desc..."
    //                   : " asc..."
    //                 : ""}
    //             </span>
    //           </th>
    //         ))}
    //       </tr>
    //     ))}
    //   </thead>
    //   <tbody {...getTableBodyProps()} className="text-center">
    //     {rows.map((row) => {
    //       prepareRow(row);
    //       return (
    //         <tr
    //           {...row.getRowProps()}
    //           className="cursor-pointer duration-200 hover:bg-blue-gray-50 "
    //         >
    //           {row.cells.map((cell) => (
    //             <td
    //               {...cell.getCellProps()}
    //               className="py-3 rounded-xl duration-150 hover:scale-110"
    //             >
    //               {cell.render("Cell")}
    //             </td>
    //           ))}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>
  );
};

export default CompaniesTable;
