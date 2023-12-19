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
  Box,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { NumericFormat } from "react-number-format";
import { WarningTwoIcon } from "@chakra-ui/icons";
import exchanges from "../exchanges";

function HomepageTable({ arbitragesData }) {
  const data = useMemo(() => arbitragesData, []);

  const columns = [
    {
      header: "exchange",
      accessorKey: "long.exchange",
      cell: (row) => {
        return (
          <Image
            width="28"
            height="10"
            objectFit="contain"
            src={exchanges[row.getValue()].logo}
            alt="Logo"
          />
        );
      },
    },
    {
      header: "symbol",
      accessorKey: "long.base",
      cell: (row) => {
        return (
          <Stack alignItems={"center"} spacing="2" direction={"row"}>
            <Image
              height="24px"
              width="24px"
              objectFit="contain"
              color={"white"}
              src={`https://raw.githubusercontent.com/Pymmdrza/Cryptocurrency_Logos/5f1b6a0588adeca87fb3259df2b65b0047dafc54/SVG/${row
                .getValue()
                .toLowerCase()}.svg`}
              alt="Logo"
            />
            <Text fontWeight="semibold">{row.getValue().toUpperCase()}</Text>
          </Stack>
        );
      },
    },

    {
      header: "portfolio",
      accessorKey: "days_to_maturity",
      cell: (row) => {
        return (
          <Stack spacing="3">
            <Flex alignItems="center">
              <Text
                mr="2"
                fontWeight="bold"
                bg="red.400"
                px="1"
                color="red.800"
                userSelect={"none"}
              >
                S
              </Text>
              <Text fontWeight="semibold">{row.row.original.short.symbol}</Text>
            </Flex>
            <Flex alignItems="center">
              <Text
                mr="2"
                fontWeight="bold"
                bg="green.400"
                px="1"
                color="green.800"
                userSelect={"none"}
              >
                B
              </Text>
              <Text fontWeight="semibold">{row.row.original.long.symbol}</Text>
            </Flex>
          </Stack>
        );
      },
    },
    {
      header: "prices",
      accessorKey: "long.last",
      cell: (row) => {
        return (
          <Stack spacing="3">
            <Stack alignItems="center" direction="flex" spacing="2">
              <Text fontWeight="semibold">
                {row.row.original.short.bid || row.row.original.short.last}
              </Text>
              {!row.row.original.short.bid && (
                <WarningTwoIcon w={4} h={4} color="red.500" />
              )}
            </Stack>
            <Flex alignItems="center">
              <Text fontWeight="semibold">{row.row.original.long.ask}</Text>
            </Flex>
          </Stack>
        );
      },
    },
    {
      header: "spread",
      accessorKey: "spread",
      cell: (row) => {
        return (
          <Text fontWeight="semibold">
            <NumericFormat
              displayType={"text"}
              value={row.getValue() * 100}
              suffix="%"
              decimalScale={2}
            />
          </Text>
        );
      },
    },
    {
      header: "apr",
      accessorKey: "apr",
      cell: (row) => {
        return (
          <Text fontWeight="semibold">
            <NumericFormat
              displayType={"text"}
              value={row.getValue() * 100}
              suffix="%"
              decimalScale={2}
            />
          </Text>
        );
      },
    },
    {
      header: "real apr",
      accessorKey: "real_apr",
      cell: (row) => {
        return (
          <Text fontWeight="semibold">
            <NumericFormat
              displayType={"text"}
              value={row.getValue() * 100}
              suffix="%"
              decimalScale={2}
            />
          </Text>
        );
      },
    },
    {
      header: "days remaining",
      accessorKey: "days_to_maturity",
      cell: (row) => {
        return <Text fontWeight="semibold">{row.getValue()}</Text>;
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
