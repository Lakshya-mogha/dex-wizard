"use client";
import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

function APIDataFormate(data: any) {
  return data.map((item: any) => ({
    time: item[0] / 1000,
    open: item[1],
    high: item[2],
    low: item[3],
    close: item[4],
  }));
}

function Candles({ data }: any) {
  const chartContainer = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const coinData = APIDataFormate(data);

  useEffect(() => {
    if (!chartContainer.current) return;

    const chart = createChart(chartContainer.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: chartContainer.current.clientWidth,
      height: chartContainer.current.clientHeight,
      grid: {
        vertLines: {
          color: "#e1e3e6",
        },
        horzLines: {
          color: "#e1e3e6",
        },
      },
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
        secondsVisible: false,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
    });

    newSeries.setData(coinData);

    chart.timeScale().fitContent();

    setLoading(false);

    return () => {
      chart.remove();
    };
  }, [data]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div ref={chartContainer} style={{ width: "100%", height: "100%" }}></div>;
}

export default Candles;
