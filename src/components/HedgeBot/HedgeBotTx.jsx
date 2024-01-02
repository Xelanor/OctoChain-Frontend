import { Container } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import HedgeBotTxTable from "./HedgeBotTxTable";

function HedgeBotTx() {
  const { state } = useLocation();
  console.log(state);

  return (
    <main className="px-4">
      <div className="text-xl font-bold pb-5">Hedge Bot Transactions</div>
      <div className="text-xl font-bold pb-5 text-gray-400">{state.tick}</div>
      <HedgeBotTxTable txData={state.transactions} />
    </main>
  );
}

export default HedgeBotTx;
