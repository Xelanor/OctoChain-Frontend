import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

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

const decimalPlaces = (number) => {
  if (-Math.floor(Math.log(number) / Math.log(10) + 1) >= 0) {
    return -Math.floor(Math.log(number) / Math.log(10) + 1) + 5;
  } else {
    return 2;
  }
};

function HedgeBotTxTable({ txData }) {
  const data = useMemo(() => txData, []);
  const navigate = useNavigate();

  const columns = [
    {
      header: "",
      accessorKey: "side",
      cell: (row) => {
        return (
          <div className="font-semibold">
            {row.getValue() === "open" ? <div>🟢</div> : <div>🔴</div>}
          </div>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "created_at",
      cell: (row) => {
        return (
          <div className="font-semibold">
            {format(parseInt(row.getValue()) * 1000, "dd.M.y HH:mm")}
          </div>
        );
      },
    },

    {
      header: "Spot Exc",
      accessorKey: "spot_exchange",
      cell: (row) => {
        return <div className="font-semibold">{row.getValue()}</div>;
      },
    },
    {
      header: "Hedge Exc",
      accessorKey: "hedge_exchange",
      cell: (row) => {
        return <div className="font-semibold">{row.getValue()}</div>;
      },
    },
    {
      header: "Spot Cost",
      accessorKey: "spot_cost_price",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue().toFixed(decimalPlaces(row.getValue()))}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Hedge Cost",
      accessorKey: "hedge_cost_price",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue().toFixed(decimalPlaces(row.getValue()))}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
    {
      header: "Spot Price",
      accessorKey: "spot_price",
      cell: (row) => {
        return (
          <>
            {row.getValue() ? (
              <NumericFormat
                className="font-semibold"
                displayType={"text"}
                value={row.getValue().toFixed(decimalPlaces(row.getValue()))}
                prefix="$"
                thousandSeparator={true}
              />
            ) : (
              <div></div>
            )}
          </>
        );
      },
    },
    {
      header: "Hedge Price",
      accessorKey: "hedge_price",
      cell: (row) => {
        return (
          <>
            {row.getValue() ? (
              <NumericFormat
                className="font-semibold"
                displayType={"text"}
                value={row.getValue().toFixed(decimalPlaces(row.getValue()))}
                prefix="$"
                thousandSeparator={true}
              />
            ) : (
              <div></div>
            )}
          </>
        );
      },
    },
    {
      header: "Spot Qty",
      accessorKey: "spot_quantity",
      cell: (row) => {
        return (
          <div className="font-semibold">
            {row.getValue()}/{row.row.original.hedge_quantity}
          </div>
        );
      },
    },
    {
      header: "profit",
      accessorKey: "profit",
      cell: (row) => {
        return (
          <>
            {row.getValue() ? (
              <NumericFormat
                className="font-semibold"
                displayType={"text"}
                value={row.getValue().toFixed(4)}
                prefix="$"
                thousandSeparator={true}
              />
            ) : (
              <div></div>
            )}
          </>
        );
      },
    },
    {
      header: "Profit Rate",
      accessorKey: "profit_rate",
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
      header: "fee",
      accessorKey: "fee",
      cell: (row) => {
        return (
          <NumericFormat
            className="font-semibold"
            displayType={"text"}
            value={row.getValue().toFixed(4)}
            prefix="$"
            thousandSeparator={true}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto">
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
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} className="text-gray-300">
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default HedgeBotTxTable;
