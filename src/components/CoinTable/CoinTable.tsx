"use server"
import React from "react";
import { DataTable, column } from "./DataTable";
import {coinsType } from "@/sampleData";
import axios from 'axios';

async function getData(): Promise<coinsType[]>{

const options = {
  method: 'GET',
  url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&per_page=100',
  headers: {accept: 'localhost:3000', 'x-cg-api-key': process.env.COINGECKO_API_KEY}
};

return await axios
  .request(options)
  .then(function (response:any) {
    return response.data
  })
  .catch(function (error:any) {
    console.error(error);
  });


}
async function CoinTable() {
  const data = await getData();
  return <DataTable columns={column} data={data} />;
}

export default CoinTable;
