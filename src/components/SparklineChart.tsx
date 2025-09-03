"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type SparklineChartProps = {
  data: number[];
  color: string;
};

export default function SparklineChart({ data, color }: SparklineChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 60,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: [color],
    tooltip: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Price",
      data: data,
    },
  ];

  return <Chart options={options} series={series} type="line" height={60} width={150} />;
}