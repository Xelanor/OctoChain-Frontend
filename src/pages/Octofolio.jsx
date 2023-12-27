import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumericFormat } from "react-number-format";

import OctofolioTable from "../components/Octofolio/OctofolioTable";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function Octofolio() {
  const [portfolios, setPortfolios] = useState();

  const fetchData = () => {
    axios.get(`${baseUrl}/api/octofolio`).then((res) => {
      setPortfolios(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-6">
      {portfolios && (
        <>
          <aside className="self-start sticky top-0 col-span-1 px-6">
            <div className="flex items-center space-x-3 py-2 px-2 mb-8 cursor-pointer hover:bg-slate-900 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/avatars/01.png" alt="Image" />
                <AvatarFallback className="font-bold text-xl">O</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold">Overview</p>
                <p className="text-sm text-gray-500">
                  <NumericFormat
                    className="font-semibold"
                    displayType={"text"}
                    value={portfolios[0].total_value.toFixed(2)}
                    prefix="$"
                    decimalScale={2}
                    thousandSeparator={true}
                  />
                </p>
              </div>
            </div>

            {portfolios.map((portfolio) => (
              <div className="flex items-center space-x-3 py-2 px-2 cursor-pointer bg-slate-900 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/avatars/01.png" alt="Image" />
                  <AvatarFallback className="font-bold text-xl dark:bg-orange-400">
                    {portfolio.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div key={portfolio.id}>
                  <p className="text-sm font-bold">{portfolio.name}</p>
                  <p className="text-sm text-gray-500">
                    <NumericFormat
                      className="font-semibold"
                      displayType={"text"}
                      value={portfolio.total_value.toFixed(2)}
                      prefix="$"
                      decimalScale={2}
                      thousandSeparator={true}
                    />
                  </p>
                </div>
              </div>
            ))}
          </aside>

          <main className="col-span-5 px-4">
            <div className="flex space-x-2 items-center mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="Image" />
                <AvatarFallback className="font-bold">O</AvatarFallback>
              </Avatar>
              <div className="text-lg font-bold text-gray-500">
                {portfolios[0].name}
              </div>
            </div>

            <div className="text-4xl font-bold">
              <NumericFormat
                className="font-bold"
                displayType={"text"}
                value={portfolios[0].total_value.toFixed(2)}
                prefix="$"
                decimalScale={2}
                thousandSeparator={true}
              />
            </div>
            <p className="text-green-500 font-semibold">
              +20.1% from last month
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 my-4">
              <Card className="dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    All-time Profit
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <NumericFormat
                      className="font-bold"
                      displayType={"text"}
                      value={portfolios[0].total_profit.toFixed(2)}
                      prefix="$"
                      decimalScale={2}
                      thousandSeparator={true}
                    />
                  </div>
                  <p className="font-semibold text-muted-foreground">
                    +
                    <NumericFormat
                      displayType={"text"}
                      value={portfolios[0].total_profit_percentage * 100}
                      suffix="%"
                      decimalScale={2}
                    />
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-xl font-bold pb-5">Assets</div>
            <OctofolioTable assetsData={portfolios[0].assets} />
          </main>
        </>
      )}
    </div>
  );
}

export default Octofolio;
