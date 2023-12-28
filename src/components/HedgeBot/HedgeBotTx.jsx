import { Container } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import HedgeBotTxTable from "./HedgeBotTxTable";

function HedgeBotTx() {
  const { state } = useLocation();
  console.log(state);

  return (
    <main className="px-2">
      <div className="text-xl font-bold pb-5">Hedge Bots</div>
      <HedgeBotTxTable txData={state.transactions} />
    </main>
  );
}

export default HedgeBotTx;
