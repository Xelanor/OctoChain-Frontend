import { useEffect, useState } from "react";

import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, WarningTwoIcon } from "@chakra-ui/icons";
import OrderBook from "../General/OrderBook";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export default function SpotArbitrageDetails({ arbitrage }) {
  const [fromBoard, setFromBoard] = useState();
  const [toBoard, setToBoard] = useState();
  const [hedgeBoard, setHedgeBoard] = useState();

  const fetchData = () => {
    axios
      .post(`${baseUrl}/api/crypto/spot-arb-details`, {
        symbol: arbitrage.from.symbol,
        from_exc: arbitrage.from.exchange,
        to_exc: arbitrage.to.exchange,
        hedge_symbol: arbitrage.hedge.symbol,
        hedge_exc: arbitrage.hedge.exchange,
      })
      .then((res) => {
        setFromBoard(res.data.details.from_board);
        setToBoard(res.data.details.to_board);
        setHedgeBoard(res.data.details.hedge_board);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const withdrawDepositStatus = (status) => {
    if (status === true) {
      return (
        <Text color="green.400" fontWeight={"semibold"}>
          <CheckIcon w={4} h={4} mr="1" pb="0.5" />
          OK
        </Text>
      );
    } else if (status === null) {
      return (
        <Text color="gray.400" fontWeight={"semibold"}>
          <WarningTwoIcon w={4} h={4} mr="1" pb="0.5" />
          UNKNOWN
        </Text>
      );
    } else {
      return (
        <Text color="red.400" fontWeight={"semibold"}>
          <CloseIcon w={4} h={4} mr="1" pb="0.5" />
          CLOSED
        </Text>
      );
    }
  };

  const NetworkInfo = ({ arbitrage }) => (
    <Box>
      <Stack spacing="2" direction="row" alignItems={"center"}>
        <Text>Withdraw:</Text>
        {withdrawDepositStatus(arbitrage.currencyDetails.withdraw)}
      </Stack>
      <Stack spacing="2" direction="row" alignItems={"center"}>
        <Text>Deposit:</Text>
        {withdrawDepositStatus(arbitrage.currencyDetails.deposit)}
      </Stack>
      <Text>
        Withdraw Fee:{" "}
        {arbitrage.currencyDetails.fee ? arbitrage.currencyDetails.fee : "N/A"}{" "}
        ({(arbitrage.currencyDetails.fee * arbitrage.last).toFixed(2)}
        $)
      </Text>
    </Box>
  );

  return (
    <Box>
      {fromBoard && toBoard && hedgeBoard && (
        <Flex justifyContent={"space-between"}>
          <OrderBook
            exchange={arbitrage.from.exchange}
            board={fromBoard}
            depthItemCount={8}
          />
          <Box py="4" px="2">
            <Heading mb="4" size="lg">
              From: {arbitrage.from.exchange.toUpperCase()}
            </Heading>
            <NetworkInfo arbitrage={arbitrage.from} />

            <Box pl="4">
              <Heading size="md" my="4">
                Supported Networks
              </Heading>
              {arbitrage.from.currencyDetails.networks &&
                Object.keys(arbitrage.from.currencyDetails.networks).map(
                  (network) => (
                    <Stack
                      key={
                        arbitrage.from.currencyDetails.networks[network].network
                      }
                      spacing="2"
                      direction="row"
                      alignItems={"center"}
                    >
                      <Text>
                        {
                          arbitrage.from.currencyDetails.networks[network]
                            .network
                        }
                        :
                      </Text>
                      {withdrawDepositStatus(
                        arbitrage.from.currencyDetails.networks[network]
                          .withdraw
                      )}{" "}
                      /{" "}
                      {withdrawDepositStatus(
                        arbitrage.from.currencyDetails.networks[network].deposit
                      )}
                    </Stack>
                  )
                )}
            </Box>

            <Divider my="4" />

            <Heading mb="4" size="lg">
              To: {arbitrage.to.exchange.toUpperCase()}
            </Heading>
            <NetworkInfo arbitrage={arbitrage.to} />

            <Box pl="4">
              <Heading size="md" my="4">
                Supported Networks
              </Heading>
              {arbitrage.to.currencyDetails.networks &&
                Object.keys(arbitrage.to.currencyDetails.networks).map(
                  (network) => (
                    <Stack
                      key={
                        arbitrage.to.currencyDetails.networks[network].network
                      }
                      spacing="2"
                      direction="row"
                      alignItems={"center"}
                    >
                      <Text>
                        {arbitrage.to.currencyDetails.networks[network].network}
                        :
                      </Text>
                      {withdrawDepositStatus(
                        arbitrage.to.currencyDetails.networks[network]
                          .withdraw ||
                          arbitrage.to.currencyDetails.networks[network]
                            .withdrawEnable
                      )}{" "}
                      /{" "}
                      {withdrawDepositStatus(
                        arbitrage.to.currencyDetails.networks[network]
                          .deposit ||
                          arbitrage.to.currencyDetails.networks[network]
                            .depositEnable
                      )}
                    </Stack>
                  )
                )}
            </Box>
          </Box>
          <OrderBook
            exchange={arbitrage.to.exchange}
            board={toBoard}
            depthItemCount={8}
          />
          <OrderBook
            exchange={arbitrage.hedge.exchange}
            board={hedgeBoard}
            depthItemCount={8}
          />
        </Flex>
      )}
    </Box>
  );
}
