import React, { useState } from "react";
import "./WidgetLg.scss";
import { Download } from "@mui/icons-material";
import { transactionsData } from "../../data"; 

const WidgetLg = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const txPerPage = 10;

  const indexOfLast = currentPage * txPerPage;
  const indexOfFirst = indexOfLast - txPerPage;
  const currentTx = transactionsData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(transactionsData.length / txPerPage);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Recent Transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">User</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Time</th>
            <th className="widgetLgTh">Payslip</th>
          </tr>
        </thead>
        <tbody>
          {currentTx.map((tx, i) => (
            <tr className="widgetLgTr" key={i}>
              <td className="widgetLgUser">
                <img src={tx.img} alt="" className="widgetLgImg" />
                <span className="widgetLgName">{tx.name}</span>
              </td>
              <td className="widgetLgAmount">{tx.amount}</td>
              <td className="widgetLgTime">{tx.time}</td>
              <td className="widgetLgPayslip">
                <Download className="widgetLgDownloadIcon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default WidgetLg;
