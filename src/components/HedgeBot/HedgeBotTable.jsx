import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
  Select,
  Flex,
  Text,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";
import { TriangleDownIcon, TriangleUpIcon, ViewIcon } from "@chakra-ui/icons";

function HedgeBotTable({ botsData }) {
  const data = useMemo(() => botsData, [botsData]);
  const navigate = useNavigate();

  const columns = [
    {
      header: "Symbol",
      accessorKey: "tick",
      cell: (row) => {
        return (
          <Stack alignItems={"center"} spacing="2" direction={"row"}>
            <Image
              height="24px"
              width="24px"
              objectFit="contain"
              src={row.row.original.logo}
              alt="Logo"
            />

            <div className="font-semibold">{row.getValue()}</div>
          </Stack>
        );
      },
    },
    {
      header: "Open",
      accessorKey: "open_spot",
      cell: (row) => {
        return (
          <div className="font-semibold">
            {row.getValue()}/{row.row.original.open_hedge}
          </div>
        );
      },
    },
    {
      header: "Profit",
      accessorKey: "total_profit",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue().toFixed(2)}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Tx Size",
      accessorKey: "tx_size",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Control Size",
      accessorKey: "control_size",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Max Size",
      accessorKey: "max_size",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Min Open Profit Rate",
      accessorKey: "min_open_profit",
      cell: (row) => {
        return (
          <NumericFormat
            displayType={"text"}
            value={row.getValue() * 100}
            suffix="%"
            decimalScale={2}
          />
        );
      },
    },
    {
      header: "Min Close Profit Rate",
      accessorKey: "min_close_profit",
      cell: (row) => {
        return (
          <NumericFormat
            displayType={"text"}
            value={row.getValue() * 100}
            suffix="%"
            decimalScale={2}
          />
        );
      },
    },
    {
      header: "",
      accessorKey: "transactions",
      cell: (row) => {
        return (
          <div className="cursor-pointer">
            <ViewIcon
              onClick={() =>
                navigate("/HedgeBot/tx", { state: row.row.original })
              }
              w={5}
              h={5}
            />
          </div>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr bg="#0b0e11" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  color="white"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default HedgeBotTable;
