import { useEffect, useState } from "react";
import axios from "axios";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";

import HomepageTable from "../components/Homepage/HomepageTable";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function Homepage() {
  const [spot, setSpot] = useState();
  const [swap, setSwap] = useState();
  const [future, setFuture] = useState();

  const fetchData = () => {
    axios.get(`${baseUrl}/api/crypto/tickers`).then((res) => {
      setSpot(res.data.spot);
      setSwap(res.data.swap);
      setFuture(res.data.future);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Tabs variant="soft-rounded">
        <TabList>
          <Flex bg="#21262d" borderRadius="lg" p="1">
            <Tab
              borderRadius="lg"
              _hover={{
                background: "#171a1c",
              }}
              _selected={{
                background: "black",
                _hover: {
                  background: "black",
                },
              }}
            >
              Spot
            </Tab>
            <Tab
              _hover={{
                background: "#171a1c",
              }}
              _selected={{
                background: "black",
                _hover: {
                  background: "black",
                },
              }}
              borderRadius="lg"
            >
              Swap (Perp)
            </Tab>
            <Tab
              _hover={{
                background: "#171a1c",
              }}
              _selected={{
                background: "black",
                _hover: {
                  background: "black",
                },
              }}
              borderRadius="lg"
            >
              Futures (Delivery)
            </Tab>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>{spot && <HomepageTable tickersData={spot} />} </TabPanel>
          <TabPanel>{swap && <HomepageTable tickersData={swap} />} </TabPanel>
          <TabPanel>
            {future && <HomepageTable tickersData={future} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Homepage;
