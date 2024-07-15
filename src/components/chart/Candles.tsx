"use client";
import { ColorType, createChart } from 'lightweight-charts';
import {useEffect, useRef} from 'react'



function Candles({data}:any) {
    const chartContainer = useRef<HTMLDivElement | null>(null);
    const coinData = data
    useEffect(() => {
        const fetchDataAndSetChart = () => {
            const chart = createChart(chartContainer.current as HTMLElement, {
                layout: {
                    background: {type: ColorType.Solid, color: "white"}
                },
                width: 700,
                height: 400,
            });

            const newSeries = chart.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });

            newSeries.setData(coinData);

            return () => {
                chart.remove();
            };
        };

        fetchDataAndSetChart();
    }, []);

  return (
    <div ref={chartContainer}></div>
  )
}

export default Candles;