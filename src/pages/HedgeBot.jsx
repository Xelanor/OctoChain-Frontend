import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@chakra-ui/react";

import HedgeBotTable from "../components/HedgeBot/HedgeBotTable";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function HedgeBot() {
  const [hedgeBots, setHedgeBots] = useState();

  const fetchData = () => {
    axios.get(`${baseUrl}/api/hedge_bot`).then((res) => {
      setHedgeBots(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxW="container.xl">
      {hedgeBots && (
        <main className="px-2">
          <div className="text-xl font-bold pb-5">Hedge Bots</div>
          <HedgeBotTable botsData={hedgeBots} />
        </main>
      )}
    </Container>
  );
}

export default HedgeBot;
