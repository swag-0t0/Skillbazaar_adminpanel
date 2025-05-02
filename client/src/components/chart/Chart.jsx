import React from 'react';
import "./Chart.scss";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="customTooltip">
        <p className="label">{label}</p>
        <p className="value">{`${payload[0].name || ''}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Chart = ({ data, dataKey, grid }) => {
  return (
    <div className="chart">
      <h3 className="chartTitle">Sales Analytics</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            strokeWidth={2.5}
            dot={{ fill: '#8884d8', r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
