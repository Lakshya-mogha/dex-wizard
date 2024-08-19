"use client";
import React, { useState, useEffect } from "react";
import { DataTable, column } from "./DataTable";
import { io } from "socket.io-client";
import axios from "axios";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
}

// interface Props {
//   data: Coin[];
// }

const CoinTable = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  async function getData(): Promise<Coin[]> {
    try {
      const options = {
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&per_page=100",
        headers: {
          accept: "localhost:3000",
          "x-cg-api-key": process.env.COINGECKO_API_KEY,
          "Access-control-allow-origin": "localhost:3000",
        },
      };

      const response = await axios.request(options);
      const data = response.data;

      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
      return data;
    }
  }

  setInterval(() => {
    if (typeof window !== 'undefined') {
      getData().then((data) => {
        setData(data);
        localStorage.setItem("CoinTable", JSON.stringify(data));
      });
    }
  }, 60 * 1000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedData = localStorage.getItem("CoinTable");

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        getData().then((data) => {
          setData(data);
          setLoading(false);
          localStorage.setItem("CoinTable", JSON.stringify(data));
        });
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] w-[100vw] flex items-center justify-center text-center">
        Loading...
      </div>
    );
  }

  return <DataTable columns={column} data={data} />;
};

export default CoinTable;
