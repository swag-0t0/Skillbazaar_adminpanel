import React from "react";
import "./FeaturedInfo.scss";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import CountUp from "react-countup";
import { MonetizationOn,Person } from "@mui/icons-material";
const FeaturedInfo = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
      <Person className="featuredIcon" />
        <span className="featuredTitle">Total Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <CountUp end={2415} duration={2} separator="," />
          </span>
        </div>
      </div>

      <div className="featuredItem">
       < MonetizationOn className="featuredIcon" />
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <CountUp end={4415} duration={2} separator="," /> Tk
          </span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <Person className="featuredIcon" />
        <span className="featuredTitle">Total Freelancers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <CountUp end={2225} duration={2} separator="," />
          </span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
