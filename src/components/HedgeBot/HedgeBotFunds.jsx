import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

function HedgeBotFunds({ funds }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 my-4">
      {funds.map((fund) => (
        <Card className="dark:bg-gray-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              <Image
                width="28"
                height="10"
                objectFit="contain"
                src={fund.logo}
                alt="Logo"
              />
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
              {fund.spot_fund && (
                <NumericFormat
                  className="font-bold"
                  displayType={"text"}
                  value={fund.spot_fund.total}
                  prefix="$"
                  decimalScale={2}
                  thousandSeparator={true}
                />
              )}
            </div>
            <p className="text-xl font-semibold text-muted-foreground">
              {fund.future_fund && (
                <NumericFormat
                  className="font-bold"
                  displayType={"text"}
                  value={fund.future_fund.total}
                  prefix="$"
                  decimalScale={2}
                  thousandSeparator={true}
                />
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default HedgeBotFunds;
