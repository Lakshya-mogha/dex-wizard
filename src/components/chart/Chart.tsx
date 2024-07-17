"use server";
import React from "react";
import Candles from "./Candles";
import axios from "axios";

async function Chart({ id }: any) {
  const Data = await getData(id);
  
  return (
    <div>
      <Candles data={Data} />
    </div>
  );
}

async function getData(id: any) {
  const options = {
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=365&precision=full`,
    headers: {
      accept: "localhost:3000",
      "x-cg-api-key": process.env.COINGECKO_API_KEY,
    },
  };

  return await axios
    .request(options)
    .then(function (response: any) {
      
      return response.data;
    })
    .catch(function (error: any) {
      console.error(error);
    });
}

export default Chart;
