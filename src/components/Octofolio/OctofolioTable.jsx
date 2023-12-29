import React, { useMemo, useState } from "react";
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
  Stack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";
import { TriangleDownIcon, TriangleUpIcon, AddIcon } from "@chakra-ui/icons";
import OctofolioNewTransaction from "./OctofolioNewTransaction";

function OctofolioTable({ assetsData }) {
  const data = useMemo(() => assetsData, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = [
    {
      header: "exchange",
      accessorKey: "name",
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
            <div className="font-semibold text-gray-300">
              {row.row.original.symbol}
            </div>
          </Stack>
        );
      },
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            decimalScale={2}
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Holdings",
      accessorKey: "asset_value",
      cell: (row) => {
        return (
          <div className="flex flex-col">
            <NumericFormat
              className="font-semibold"
              displayType={"text"}
              value={row.getValue()}
              prefix="$"
              decimalScale={2}
              thousandSeparator={true}
            />
            <div className="flex space-x-1 text-sm font-semibold">
              <div className="text-gray-300">
                {row.row.original.asset_quantity}
              </div>
              <div className="text-gray-300">{row.row.original.symbol}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Avg. Buy Price",
      accessorKey: "average_cost",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
            decimalScale={2}
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Profit/Loss",
      accessorKey: "asset_profit",
      cell: (row) => {
        return (
          <div className="flex flex-col">
            <NumericFormat
              className="font-semibold"
              displayType={"text"}
              value={row.getValue()}
              prefix="$"
              decimalScale={2}
              thousandSeparator={true}
            />
            <NumericFormat
              displayType={"text"}
              value={row.row.original.asset_profit_percentage * 100}
              suffix="%"
              decimalScale={2}
            />
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "buy",
      cell: (row) => {
        return (
          <div onClick={onOpen} className="text-gray-500 cursor-pointer p-2">
            <AddIcon boxSize={4} />
          </div>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState([
    {
      id: "real_apr",
      desc: true,
    },
  ]);

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
      <OctofolioNewTransaction isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default OctofolioTable;
