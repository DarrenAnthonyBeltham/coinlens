"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartProps = {
  data: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  coinName: string;
};

export default function CoinChart({ data, coinName }: ChartProps) {
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");

  const series = [
    {
      name: "Price",
      data: data.map((d) =>
        chartType === "line"
          ? { x: d.time * 1000, y: d.close } 
          : { x: d.time * 1000, y: [d.open, d.high, d.low, d.close] } 
      ),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: chartType,
      height: 400,
      background: "#131722",
      foreColor: "#D9D9D9",
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: "dark",
    },
    grid: {
      borderColor: "#2A2E39",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `$${value.toFixed(2)}`;
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy, HH:mm",
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#26a69a",
          downward: "#ef5350",
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#2962FF"],
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
  };

  const buttonStyle = (type: string) =>
    `px-4 py-2 text-sm rounded-md transition-colors ${
      chartType === type
        ? "bg-blue-600 text-white"
        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
    }`;

  return (
    <div className="bg-[#131722] p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{coinName} Chart</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType("line")}
            className={buttonStyle("line")}
          >
            Line
          </button>
          <button
            onClick={() => setChartType("candlestick")}
            className={buttonStyle("candlestick")}
          >
            Candlestick
          </button>
        </div>
      </div>
      <div>
        <Chart
          options={options}
          series={series}
          type={chartType}
          height={400}
          width="100%"
        />
      </div>
    </div>
  );
}