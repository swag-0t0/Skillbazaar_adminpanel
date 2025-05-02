import React from "react";
import "./Analytics.scss";
import Chart from "../../components/chart/Chart";
import { salesData } from "../../data.js";

const Analytics = () => {
  return (
    <div className="analytics">
      <Chart data={salesData} dataKey="sales" />
    </div>
  );
};

export default Analytics;
