import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@chakra-ui/react";

import HedgeBotTable from "../components/HedgeBot/HedgeBotTable";
import HedgeBotFunds from "../components/HedgeBot/HedgeBotFunds";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function HedgeBot() {
  const [hedgeBots, setHedgeBots] = useState();
  const [funds, setFunds] = useState();

  const fetchData = () => {
    axios.get(`${baseUrl}/api/hedge_bot`).then((res) => {
      setHedgeBots(res.data);
    });
    axios.get(`${baseUrl}/api/hedge_bot/funds`).then((res) => {
      setFunds(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxW="container.xl">
      <main className="px-2">
        <div className="text-xl font-bold">Hedge Bots</div>
        {funds && <HedgeBotFunds funds={funds} />}
        {hedgeBots && <HedgeBotTable botsData={hedgeBots} />}
      </main>
    </Container>
  );
}

export default HedgeBot;
