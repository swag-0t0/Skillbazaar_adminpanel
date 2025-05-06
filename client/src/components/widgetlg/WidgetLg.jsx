import React, { useState } from "react";
import "./WidgetLg.scss";
import { Download } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axiosConfig";
import moment from "moment";

const WidgetLg = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Fetch orders with buyer details
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const response = await api.get("/home/recent-orders");
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = orders?.slice(indexOfFirst, indexOfLast) || [];
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Recent Transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">User</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
            <th className="widgetLgTh">Time</th>
            <th className="widgetLgTh">Payslip</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <img
                  src={order.buyer?.image || "https://example.com/default.jpg"}
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{order.buyer?.fullname || "Unknown"}</span>
              </td>
              <td className="widgetLgAmount">{order.price} Tk</td>
              <td
                className={`widgetLgStatus ${
                  order.isCompleted ? "completed" : "pending"
                }`}
              >
                {order.isCompleted ? "Completed" : "Pending"}
              </td>
              <td className="widgetLgTime">
                {moment(order.createdAt).format("MMM D, YYYY")}
              </td>
              <td className="widgetLgPayslip">
                {order.receiptUrl && (
                  <Download
                    className="widgetLgDownloadIcon"
                    onClick={() => window.open(order.receiptUrl, "_blank")}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={currentPage === idx + 1 ? "active" : ""}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WidgetLg;
