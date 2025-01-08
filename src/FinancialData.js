import React, { useState, useEffect } from "react";
import "./App.css";
function FinancialData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=NdwazWP4jzyvDUWHOzP1RfFuqshEQzzx"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div class="text-center text-gray-600 text-lg mt-6">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div class="text-center text-red-500 text-lg mt-6">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div class="p-6 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-8">
        Annual Financial Data for Apple
      </h1>
      <div class="overflow-x-auto">
        <table class="table-auto w-full border border-gray-200 shadow-lg">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 border border-gray-700">Data</th>
              <th class="px-4 py-2 border border-gray-700">Revenue</th>
              <th class="px-4 py-2 border border-gray-700">Net Income</th>
              <th class="px-4 py-2 border border-gray-700">Gross Profit</th>
              <th class="px-4 py-2 border border-gray-700">EPS</th>
              <th class="px-4 py-2 border border-gray-700">
                Operating Income
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                class="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td class="px-4 py-2 border border-gray-700">{item.date}</td>
                <td class="px-4 py-2 border border-gray-700">
                  {item.revenue}
                </td>
                <td class="px-4 py-2 border border-gray-700">
                  {item.netIncome}
                </td>
                <td class="px-4 py-2 border border-gray-700">
                  {item.grossProfit}
                </td>
                <td class="px-4 py-2 border border-gray-700">{item.eps}</td>
                <td class="px-4 py-2 border border-gray-700">
                  {item.operatingIncome}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinancialData;
