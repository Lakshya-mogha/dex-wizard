"use client";
import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

function APIDataFormate(data: any) {
  const candleFormattedData: any = [];

  for (let i = 0; i < data.length ; i++) {
    const formatDate = data[i][0] / 1000;
    const formattedData = {
      time: formatDate,
      open: data[i][1],
      high: data[i][2],
      low: data[i][3],
      close: data[i][4],
    };

    candleFormattedData.push(formattedData);
  }
  return candleFormattedData;
}

function Candles({ data }: any) {
  const chartContainer = useRef<HTMLDivElement | null>(null);
  const coinData = APIDataFormate(data);

  useEffect(() => {
    const fetchDataAndSetChart = () => {
      const chart = createChart(chartContainer.current as HTMLElement, {
        layout: {
          background: { type: ColorType.Solid, color: "white" },
        },
        width: 700,
        height: 400,
      });

      const newSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      chart.applyOptions({
        timeScale: {
          visible: true,
          timeVisible: true,
        },
      });

      newSeries.setData(coinData);
      return () => {
        chart.remove();
      };
    };

    fetchDataAndSetChart();
  }, []);

  return <div ref={chartContainer}></div>;
}

export default Candles;
