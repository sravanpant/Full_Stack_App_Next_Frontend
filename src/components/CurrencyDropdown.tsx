import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactCountryFlag from "react-country-flag";

import Currencies from "@/data/currencies.json";

const CurrencyDropdown = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  return (
    <div >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button >{selectedCurrency}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-0">
          <ScrollArea className="h-72 rounded-md border">
            {Currencies.map((currency) => (
              <DropdownMenuItem
                key={currency.symbol}
                onClick={() => setSelectedCurrency(currency.code)}
              >
                <div>
                  <ReactCountryFlag
                    countryCode={currency.code}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      marginLeft: "0.5em",
                    }}
                  />{" "}
                  {currency.code}
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CurrencyDropdown;
