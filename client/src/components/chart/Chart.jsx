import React, { useEffect, useState } from "react";
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
import axios from "axios";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="customTooltip">
        <p className="label">{label}</p>
        <p className="value">{`Amount: ${payload[0].value} Tk`}</p>
      </div>
    );
  }
  return null;
};

const Chart = ({ dataKey = "amount", grid }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/home/transactions");
        setAllData(response.data);
        
        // Extract years from MM-YYYY format
        const uniqueYears = [...new Set(response.data.map(item => 
          item.name.split('-')[1] 
        ))].sort((a, b) => b - a); 
        
        setYears(uniqueYears);
        
        // Filter data for the selected year
        filterDataByYear(response.data, selectedYear);
      } catch (err) {
        console.error("Error fetching transaction data:", err);
      }
    };

    fetchData();
  }, []);

  // Filter data when year changes
  const filterDataByYear = (data, year) => {
    const filtered = data.filter(item => item.name.split('-')[1] === year.toString());
    
    // Sort by month
    const sortedData = filtered.sort((a, b) => {
      const monthA = parseInt(a.name.split('-')[0]);
      const monthB = parseInt(b.name.split('-')[0]);
      return monthA - monthB;
    });

    // month numbers-> month names
    const formattedData = sortedData.map(item => ({
      ...item,
      name: getMonthName(parseInt(item.name.split('-')[0])) 
    }));

    setFilteredData(formattedData);
  };

  // Helper function to get month name
  const getMonthName = (monthNumber) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthNumber - 1];
  };

  //year selection
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    filterDataByYear(allData, year);
  };

  return (
    <div className="chart">
      <div className="chartHeader">
        <h3 className="chartTitle">Sales Analytics</h3>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            stroke="#6B7280"
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            stroke="#6B7280"
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ fill: '#8884d8', r: 4 }}
            activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
