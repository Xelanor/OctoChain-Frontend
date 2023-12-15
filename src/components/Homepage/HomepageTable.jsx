import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
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
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { NumericFormat } from "react-number-format";

function HomepageTable({ tickersData }) {
  const data = useMemo(() => tickersData, []);

  const columns = [
    {
      header: "Symbol",
      accessorKey: "symbol",
      cell: (row) => {
        return (
          <Stack alignItems={"center"} spacing="2" direction={"row"}>
            <Image
              height="24px"
              width="24px"
              objectFit="contain"
              color={"white"}
              src={`https://raw.githubusercontent.com/Pymmdrza/Cryptocurrency_Logos/5f1b6a0588adeca87fb3259df2b65b0047dafc54/SVG/${row.row.original.base.toLowerCase()}.svg`}
              alt="Logo"
              fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
            />

            <Text fontWeight="semibold">{row.getValue().toUpperCase()}</Text>
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
            displayType={"text"}
            value={row.getValue()}
            prefix="$"
          />
        );
      },
    },
    {
      header: "Change",
      accessorKey: "percentage",
    },
    {
      header: "Volume",
      accessorKey: "quoteVolume",
      cell: (row) => {
        return (
          <NumericFormat
            displayType={"text"}
            value={row.getValue()}
            thousandSeparator={true}
            prefix="$"
            decimalScale={0}
          />
        );
      },
    },
    {
      header: "Total Volume",
      accessorKey: "totalBaseVolume",
      cell: (row) => {
        return (
          <NumericFormat
            displayType={"text"}
            value={row.getValue()}
            thousandSeparator={true}
            prefix="$"
            decimalScale={0}
          />
        );
      },
    },
  ];

  const [sorting, setSorting] = useState([
    {
      id: "totalQuoteVolume",
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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
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
      <Flex align="center" justify="space-between" my="5">
        <Button onClick={() => table.setPageIndex(0)}>First Page</Button>
        <Button
          isDisabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous Page
        </Button>
        <Text>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </Text>
        <Button
          isDisabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </Button>
        <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last Page
        </Button>
        <Select
          w="300px"
          color="white"
          bg="black"
          sx={{
            "> option": {
              background: "black",
              color: "white",
            },
          }}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
    </>
  );
}

export default HomepageTable;
