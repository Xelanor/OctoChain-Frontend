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

import FutureArbitrageTable from "../components/FutureArbitrage/FutureArbitrageTable";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function FutureArbitrage() {
  const [arbitrages, setArbitrages] = useState();

  const fetchData = () => {
    axios.get(`${baseUrl}/api/crypto/future-arbitrage`).then((res) => {
      setArbitrages(res.data.arbitrages);
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
              Arbitrages
            </Tab>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            {arbitrages && <FutureArbitrageTable arbitragesData={arbitrages} />}{" "}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default FutureArbitrage;
