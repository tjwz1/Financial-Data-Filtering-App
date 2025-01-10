import React from "react";
import FinancialData from "./FinancialData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-4">
        Financial Filtering App
      </h1>
      <FinancialData />
    </div>
  );
}

export default App;