import React from "react";
import "./Home.scss";
import FeaturedInfo from "../../components/featuredinfo/FeatureInfo";
import Chart from "../../components/chart/Chart";
import { salesData } from "../../data.js";
import WidgetLg from "../../components/widgetlg/WidgetLg.jsx";
import WidgetSm from "../../components/widgetsm/WidgetSm.jsx";
const Home = () => {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={salesData} dataKey="sales" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
