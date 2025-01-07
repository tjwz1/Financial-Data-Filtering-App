import React, { useState, useEffect } from 'react';

function FinancialData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        const response = await fetch('https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=NdwazWP4jzyvDUWHOzP1RfFuqshEQzzx');
        const result = await response.json();
        setData(result);
      } 
      catch (error) 
      {
        setError(error);
      } 
      finally 
      {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
  {
    return <div className="loading">Loading...</div>;
  }

  if (error) 
  {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="data-container">
      <h1 className="title">Annual Financial Data for Apple</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Revenue</th>
            <th>Net Income</th>
            <th>Gross Profit</th>
            <th>EPS (Earnings Per Share)</th>
            <th>Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.revenue}</td>
                <td>{item.netIncome}</td>
                <td>{item.grossProfit}</td>
                <td>{item.eps}</td>
                <td>{item.operatingIncome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialData;
