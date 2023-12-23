import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { NumericFormat } from "react-number-format";
import { WarningTwoIcon } from "@chakra-ui/icons";
import exchanges from "../exchanges";
import SpotArbitrageDetails from "./SpotArbitrageDetails";

function SpotArbitrageTable({ arbitragesData }) {
  const data = useMemo(() => arbitragesData, []);

  const [details, setDetails] = useState();

  const columns = [
    {
      header: "symbol",
      accessorKey: "from.base",
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
              fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
            />
            <Text fontWeight="semibold">{row.getValue().toUpperCase()}</Text>
          </Stack>
        );
      },
    },
    {
      header: "buy",
      accessorKey: "from.exchange",
      cell: (row) => {
        return (
          <Link
            to={`https://www.gate.io/tr/trade/${row.row.original.from.base}_${row.row.original.from.quote}`}
            target="_blank"
          >
            <Image
              width="32"
              height="10"
              objectFit="contain"
              src={exchanges[row.getValue()].logo}
              alt="Logo"
            />
          </Link>
        );
      },
    },
    {
      header: "sell",
      accessorKey: "to.exchange",
      cell: (row) => {
        return (
          <Image
            width="32"
            height="10"
            objectFit="contain"
            src={exchanges[row.getValue()].logo}
            alt="Logo"
          />
        );
      },
    },

    // {
    //   header: "portfolio",
    //   accessorKey: "days_to_maturity",
    //   cell: (row) => {
    //     return (
    //       <Stack spacing="3">
    //         <Flex alignItems="center">
    //           <Text
    //             mr="2"
    //             fontWeight="bold"
    //             bg="red.400"
    //             px="1"
    //             color="red.800"
    //             userSelect={"none"}
    //           >
    //             S
    //           </Text>
    //           <Text fontWeight="semibold">{row.row.original.short.symbol}</Text>
    //         </Flex>
    //         <Flex alignItems="center">
    //           <Text
    //             mr="2"
    //             fontWeight="bold"
    //             bg="green.400"
    //             px="1"
    //             color="green.800"
    //             userSelect={"none"}
    //           >
    //             B
    //           </Text>
    //           <Text fontWeight="semibold">{row.row.original.long.symbol}</Text>
    //         </Flex>
    //       </Stack>
    //     );
    //   },
    // },
    {
      header: "500",
      accessorKey: "budget_levels",
      cell: (row) => {
        return (
          <Stack spacing="3">
            {row.row.original.budget_levels[0].profit !== 0 && (
              <>
                <NumericFormat
                  displayType={"text"}
                  value={row.row.original.budget_levels[0].profit_rate * 100}
                  suffix="%"
                  decimalScale={2}
                />
                <NumericFormat
                  displayType={"text"}
                  value={row.row.original.budget_levels[0].profit}
                  prefix="$"
                  decimalScale={0}
                />
              </>
            )}
          </Stack>
        );
      },
    },
    {
      header: "1000",
      accessorKey: "budget_levels",
      cell: (row) => {
        return (
          <Stack spacing="3">
            {row.row.original.budget_levels[1].profit !== 0 && (
              <>
                <NumericFormat
                  displayType={"text"}
                  value={row.row.original.budget_levels[1].profit_rate * 100}
                  suffix="%"
                  decimalScale={2}
                />
                <NumericFormat
                  displayType={"text"}
                  value={row.row.original.budget_levels[1].profit}
                  prefix="$"
                  decimalScale={0}
                />
              </>
            )}
          </Stack>
        );
      },
    },
    {
      header: "2000",
      accessorKey: "budget_levels",
      cell: (row) => {
        return (
          <Stack spacing="3">
            {row.row.original.budget_levels[2].profit !== 0 && (
              <>
                <NumericFormat
                  displayType={"text"}
                  value={row.row.original.budget_levels[2].profit_rate * 100}
                  suffix="%"
                  decimalScale={2}
                />
                <NumericFormat
                  displayType={"text"}
                  value={row.row.original.budget_levels[2].profit}
                  prefix="$"
                  decimalScale={0}
                />
              </>
            )}
          </Stack>
        );
      },
    },
    {
      header: "",
      id: "details",
      cell: (row) => {
        return details === row.row.id ? (
          <ChevronUpIcon
            onClick={() => {
              setDetails();
            }}
            w={6}
            h={6}
          />
        ) : (
          <ChevronDownIcon
            onClick={() => {
              setDetails(row.row.id);
            }}
            w={6}
            h={6}
          />
        );
      },
    },
  ];

  const [sorting, setSorting] = useState([
    {
      id: "profit_rate",
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
            <>
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <td colSpan={20}>
                  {details === row.id && (
                    <SpotArbitrageDetails arbitrage={data[details]} />
                  )}
                </td>
              </Tr>
            </>
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

export default SpotArbitrageTable;
