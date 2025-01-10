import React, { useState, useEffect } from "react";
import "./App.css";

function FinancialData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("revenue");
  const [order, setOrder] = useState("asc");

  // Filter states
  const [filterBy, setFilterBy] = useState("");
  const [filterValueMin, setFilterValueMin] = useState("");
  const [filterValueMax, setFilterValueMax] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:5000/api/data?sort_by=${sortBy}&order=${order}`;
        
        if (filterBy) {
          url += `&filter_by=${filterBy}`;
        }

        if (filterValueMin && filterValueMax) {
          url += `&filter_value_min=${filterValueMin}&filter_value_max=${filterValueMax}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }

        const result = await response.json();

        // Ensure result is an array before using it
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, order, filterBy, filterValueMin, filterValueMax]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "filterBy") setFilterBy(value);
    if (name === "filterValueMin") setFilterValueMin(value);
    if (name === "filterValueMax") setFilterValueMax(value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Annual Financial Data for Apple
      </h1>

      <div className="mb-6">
        <label htmlFor="filterBy" className="mr-2">Filter By:</label>
        <select
          id="filterBy"
          name="filterBy"
          className="mr-4"
          value={filterBy}
          onChange={handleFilterChange}
        >
          <option value="">None</option>
          <option value="date">Date Range</option>
          <option value="revenue">Revenue Range</option>
          <option value="netIncome">Net Income Range</option>
        </select>

        <input
          type="number"
          name="filterValueMin"
          className="mr-4"
          placeholder="Min Value"
          value={filterValueMin}
          onChange={handleFilterChange}
        />

        <input
          type="number"
          name="filterValueMax"
          className="mr-4"
          placeholder="Max Value"
          value={filterValueMax}
          onChange={handleFilterChange}
        />
      </div>

      <table className="table-auto w-full border border-gray-200 shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th
              onClick={() => handleSort("date")}
              className="px-4 py-2 border border-gray-700"
            >
              Date
            </th>
            <th
              onClick={() => handleSort("revenue")}
              className="px-4 py-2 border border-gray-700"
            >
              Revenue
            </th>
            <th
              onClick={() => handleSort("netIncome")}
              className="px-4 py-2 border border-gray-700"
            >
              Net Income
            </th>
            <th
              onClick={() => handleSort("grossProfit")}
              className="px-4 py-2 border border-gray-700"
            >
              Gross Profit
            </th>
            <th
              onClick={() => handleSort("eps")}
              className="px-4 py-2 border border-gray-700"
            >
              EPS (Earnings Per Share)
            </th>
            <th
              onClick={() => handleSort("operatingIncome")}
              className="px-4 py-2 border border-gray-700"
            >
              Operating Income
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-700">{item.date}</td>
              <td className="px-4 py-2 border border-gray-700">{item.revenue}</td>
              <td className="px-4 py-2 border border-gray-700">{item.netIncome}</td>
              <td className="px-4 py-2 border border-gray-700">{item.grossProfit}</td>
              <td className="px-4 py-2 border border-gray-700">{item.eps}</td>
              <td className="px-4 py-2 border border-gray-700">{item.operatingIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialData;
