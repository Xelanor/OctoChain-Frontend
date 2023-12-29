import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@chakra-ui/react";
import classNames from "classnames";

import HedgeBotTable from "../components/HedgeBot/HedgeBotTable";
import HedgeBotFunds from "../components/HedgeBot/HedgeBotFunds";

import { RepeatIcon } from "@chakra-ui/icons";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function HedgeBot() {
  const [loading, setLoading] = useState(false);
  const [hedgeBots, setHedgeBots] = useState();
  const [funds, setFunds] = useState();

  const fetchData = () => {
    setLoading(true);
    axios.get(`${baseUrl}/api/hedge_bot`).then((res) => {
      setHedgeBots(res.data);
    });
    axios.get(`${baseUrl}/api/hedge_bot/funds`).then((res) => {
      setFunds(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxW="container.xl">
      <main className="px-2">
        <div className="flex items-center space-x-6">
          <div className="text-xl font-bold">Hedge Bots</div>
          <RepeatIcon
            onClick={fetchData}
            className={classNames("text-gray-700 cursor-pointer", {
              "animate-spin": loading,
            })}
            w={5}
            h={5}
          />
        </div>
        {funds && <HedgeBotFunds funds={funds} />}
        {hedgeBots && <HedgeBotTable botsData={hedgeBots} />}
      </main>
    </Container>
  );
}

export default HedgeBot;
