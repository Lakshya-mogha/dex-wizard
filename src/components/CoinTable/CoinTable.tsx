"use client"

import React,{useState,useEffect} from 'react';
import { DataTable, column } from './DataTable';
import axios from 'axios';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
}

interface Props {
  data: Coin[];
}

const CoinTable: React.FC<Props> = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  async function getData(): Promise<Coin[]> {

    try {

      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&per_page=100',
        headers: {
          accept: 'localhost:3000',
          'x-cg-api-key': process.env.COINGECKO_API_KEY,
        },
      };

      const response = await axios.request(options);
      const data = response.data;

      localStorage.setItem('CoinTable', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    const cachedData = localStorage.getItem('CoinTable');
    console.log(cachedData);
    
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    } else {
    getData().then((data) => {
      setData(data);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <DataTable columns={column} data={data} />;
};

export default CoinTable;