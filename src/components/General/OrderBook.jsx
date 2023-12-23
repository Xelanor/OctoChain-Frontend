import React from "react";

import { Box, Flex, Text, Stack, Heading } from "@chakra-ui/react";

function OrderBook(data) {
  const calculateSpread = () => {
    try {
      let ask = parseFloat(data.board.asks[0][0]);
      let bid = parseFloat(data.board.bids[0][0]);
      let spread = (ask / bid - 1) * 100;
      return spread;
    } catch (e) {
      return 0;
    }
  };

  return (
    <Box>
      <Heading mb="2" textAlign={"center"} as="h2" size="lg">
        {data.exchange.toUpperCase()}
      </Heading>
      <Heading mb="2" textAlign={"center"} as="h3" size="sm">
        {data.board.symbol.toUpperCase()}
      </Heading>
      <Flex justifyContent={"space-between"} text="gray.400">
        <Text textAlign="left" fontWeight="medium" fontSize="sm">
          Fiyat
        </Text>
        <Text textAlign="right" fontWeight="medium" fontSize="sm">
          Adet
        </Text>
        <Text textAlign="right" fontWeight="medium" fontSize="sm">
          Toplam
        </Text>
      </Flex>
      <Box>
        <Flex direction="column">
          {data.board.asks
            .slice(0, data.depthItemCount)
            .reverse()
            .map((ask, index) => (
              <Stack
                key={index}
                justifyContent={"space-between"}
                my="0.5"
                spacing="8"
                direction="row"
              >
                <Text
                  textAlign="left"
                  color="red.600"
                  fontWeight="medium"
                  fontSize="sm"
                  w="70px"
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {parseFloat(ask[0])}
                </Text>
                <Text
                  w="60px"
                  textAlign="center"
                  fontWeight="medium"
                  fontSize="sm"
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {parseFloat(ask[1])}
                </Text>
                <Text
                  w="60px"
                  textAlign="right"
                  fontWeight="medium"
                  fontSize="sm"
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {(parseFloat(ask[0]) * parseFloat(ask[1])).toFixed(2)}
                </Text>
              </Stack>
            ))}
        </Flex>
        <Flex
          justify="end"
          py="0.5"
          align="center"
          borderTop="1px"
          borderBottom="1px"
        >
          <Flex align="center">
            <Text fontWeight="semibold" mr="2">
              Spread:
            </Text>
            <Text fontWeight="semibold">{calculateSpread().toFixed(2)}%</Text>
          </Flex>
        </Flex>
        <Flex direction="column">
          {data.board.bids.slice(0, data.depthItemCount).map((bid, index) => (
            <Stack
              key={index}
              justifyContent={"space-between"}
              my="0.5"
              spacing="8"
              direction="row"
            >
              <Text
                w="70px"
                textAlign="left"
                color="green.600"
                fontWeight="medium"
                fontSize="sm"
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {parseFloat(bid[0])}
              </Text>
              <Text
                w="60px"
                textAlign="center"
                fontWeight="medium"
                fontSize="sm"
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {parseFloat(bid[1])}
              </Text>
              <Text
                w="60px"
                textAlign="right"
                fontWeight="medium"
                fontSize="sm"
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {(parseFloat(bid[0]) * parseFloat(bid[1])).toFixed(2)}
              </Text>
            </Stack>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export default OrderBook;
