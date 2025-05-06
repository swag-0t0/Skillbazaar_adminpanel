import React from "react";
import "./FeaturedInfo.scss";
import { ArrowDownward, ArrowUpward, MonetizationOn, Person } from "@mui/icons-material";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axiosConfig";

const FeaturedInfo = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.get("/home/stats").then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="featured">
      <div className="featuredItem">
        <Person className="featuredIcon" />
        <span className="featuredTitle">Total Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <CountUp end={stats?.totalUsers || 0} duration={2} separator="," />
          </span>
        </div>
      </div>

      <div className="featuredItem">
        <MonetizationOn className="featuredIcon" />
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <CountUp end={stats?.totalSales || 0} duration={2} separator="," /> Tk
          </span>
          <span className="featuredMoneyRate">
            {stats?.salesRate?.toFixed(1)}
            {stats?.salesRate > 0 ? (
              <ArrowUpward className="featuredIcon" />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <Person className="featuredIcon" />
        <span className="featuredTitle">Total Freelancers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <CountUp end={stats?.totalFreelancers || 0} duration={2} separator="," />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedInfo;
