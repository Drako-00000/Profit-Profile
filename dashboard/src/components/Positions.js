import { React, useEffect, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/allpositions").then((response) => {
      setPositions(response.data);
    });
  }, []);
  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positions.map((stock, index) => {
            const currentValue = stock.qty * stock.price;
            const profitLoss = currentValue - stock.qty * stock.avgCost >= 0.0;
            const profitClass = profitLoss ? "profit" : "loss";
            const dayChangeClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profitClass}>
                  {(currentValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayChangeClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
